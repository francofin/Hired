import {fireBaseAuth} from '../../utils/firebase';
import userMenu from "../../data/user-menu.json";
import React, {useState, useContext} from "react";
import { getAuth, signOut  } from "firebase/auth";
import { ActiveLink, Avatar} from '../../components';
import { AuthContext } from "../../utils/authContext";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Link, useHistory} from 'react-router-dom';

function UserMenu({ onLinkClick }) {

  const logout = async () => {
    const auth = fireBaseAuth;
    await signOut(auth);

    dispatch({
      type:'LOGGED_IN_USER', 
      payload: null
    })

    history.push('/login')

  }
  const {state, dispatch} = useContext(AuthContext);
  let history = useHistory();
  const {user} = state;
  return (
    <Dropdown
      as={NavItem}
      className={userMenu.type === "avatar" ? "ms-lg-3" : ""}
    >
      <Dropdown.Toggle
        as={NavLink}
        style={userMenu.type === "avatar" && { padding: 0 }}
        className="dropdown-avatar"
      >
        {userMenu.type === "avatar" ? (
          <Avatar
            image={`/content${userMenu.img}`}
            alt={userMenu.title}
            className="me-2 avatar-border-white"
            size="sm"
            cover
          />
        ) : (
          userMenu.title
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        {userMenu.dropdown &&
          userMenu.dropdown.map((dropdownItem, index) =>
            !dropdownItem.divider && !dropdownItem.signout ? (
                <Dropdown.Item onClick={() => onLinkClick(userMenu.title)} href={dropdownItem.link} key={index}>
                  {dropdownItem.title}
                </Dropdown.Item>
            ) : (
              <>
              {dropdownItem.signout &&
              <Dropdown.Item onClick = {logout} key={index}>
                <FontAwesomeIcon
                icon={faSignOutAlt}
                className="me-2 text-muted"
              />
                {dropdownItem.title}
            </Dropdown.Item>}
              <Dropdown.Divider />
              
            </> 
            )
          )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserMenu;
