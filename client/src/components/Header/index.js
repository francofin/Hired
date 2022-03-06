import UserMenu from "./UserMenu";
import SearchForm from "./SearchForm";
import menu from "../../data/menu.json";
import DropdownMenuItem from "./DropdownMenuItem";
import UseWindowSize from "../../hooks/UseWindowSize";
import { AuthContext } from "../../utils/authContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, useHistory} from 'react-router-dom';



const Header = (props) => {

  const {state, dispatch} = useContext(AuthContext);
  let history = useHistory();
  const [parentName, setParentName] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const {user} = state;
  const size = UseWindowSize();
  const onLinkClick = (parent) => {
    size.width < 991 && setCollapsed(!collapsed)
    setParentName(parent)
  }
  // highlight not only active dropdown item, but also its parent, i.e. dropdown toggle
  const highlightDropdownParent = () => {
    menu.map((item) => {
      item.dropdown &&
        item.dropdown.map((dropdownLink) => {
          dropdownLink.link &&
            dropdownLink.link === Router.route &&
            setParentName(item.title)
          dropdownLink.links &&
            dropdownLink.links.map(
              (link) => link.link === Router.route && setParentName(item.title)
            )
        })
      item.megamenu &&
        item.megamenu.map((megamenuColumn) =>
          megamenuColumn.map((megamenuBlock) =>
            megamenuBlock.links.map((dropdownLink) => {
              if (dropdownLink.link === Router.route) {
                dropdownLink.parent
                  ? setParentName(dropdownLink.parent)
                  : setParentName(item.title)
              }
            })
          )
        )
      item.link === Router.route && setParentName(item.title)
    })
  }

  console.log("Logged State", state);



  useEffect(highlightDropdownParent, [])
  return (
    <header
      className={`header ${props.headerData.headerClasses ? props.headerData.headerClasses : ""}`}
    >
      <Navbar
        variant={props.headerData.nav.light ? "light" : "dark"}
        bg={props.headerData.nav.color ? props.headerData.nav.color : "white"}
        fixed={props.headerData.nav.fixed ? props.headerData.nav.fixed : "top"}
        expand="lg"
        expanded={collapsed}
        className={props.headerData.nav.classes ? props.headerData.nav.classes : ""}
      >
        <Container fluid>
          <div className="d-flex align-items-center">
            {/* NAVBAR BRAND */}
            <Link to="/" className="py-1 navbar-brand">  
                <img
                  src="/content/svg/logo.svg"
                  width={138}
                  height={31}
                  alt="Directory logo"
                />
            </Link>
            {/* END NAVBAR BRAND */}
            {/* SEARCH FORM */}
            <SearchForm
              id="search"
              className="d-none d-sm-flex"
              childClassname="input-expand ms-lg-2 ms-xl-3"
            />
            {/* END SEARCH FORM */}
          </div>

          {/* NAVBAR TOGGLE */}
          <Navbar.Toggle
            aria-controls="navbar-main-menu"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          {/* END NAVBAR TOGGLE */}
          <Navbar.Collapse id="navbar-main-menu">
            {/* MOBILE SEARCH FORM */}
            <SearchForm
              id="searchcollapsed"
              className="mt-4 mb-2 d-sm-none"
              childClassname="w-100"
            />
            {/* END MOBILE SEARCH FORM */}

            {/* MENU */}
            <Nav className="ms-auto align-items-lg-center">
              {menu &&
                menu.map((item) =>
                  item.dropdown || item.megamenu ? (
                    // show entire menu to unlogged user or hide items that have hideToLoggedUser set to true
                    !props.userState.user ||
                    (props.userState.user && !item.hideToLoggedUser) ? (
                      // DROPDOWN ITEM
                      <DropdownMenuItem
                        onLinkClick={onLinkClick}
                        item={item}
                        key={item.title}
                        parentName={parentName}
                      />
                    ) : (
                      ""
                    )
                  ) : (props.userState.user && !item.hideToLoggedUser) ||
                    !props.userState.user ? (
                    // NAV ITEM
                    <Nav.Item
                      key={item.title}
                      className={
                        item.button
                          ? "mt-3 mt-lg-0 ms-lg-3 d-lg-none d-xl-inline-block"
                          : ""
                      }
                    >
                      {item.button ? (
                        item.showToLoggedUser !== false && (
                          <Link className="active" to={item.link}>
                            <Button onClick={() => onLinkClick(item.title)}>
                              {item.title}
                            </Button>
                          </Link>
                        )
                      ) : (
                          <Nav.Link onClick={() => onLinkClick(item.title)} href={item.link} className="active">
                            {item.title}
                          </Nav.Link>
                      )}
                    </Nav.Item>
                  ) : (
                    ""
                  )
                )}
              {/* USER MENU */}
              {props.userState.user && <UserMenu onLinkClick={onLinkClick} />}
              {/* USER MENU */}
            </Nav>
            {/* END MENU */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header