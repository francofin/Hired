import React, { useState } from "react";
import {Icon, Image, ActiveLink} from '../../components';
import { Link} from 'react-router-dom';
import { NavItem, NavLink, Dropdown, Row, Col, Badge } from "react-bootstrap";

export default function DropdownMenuItem({ onLinkClick, item, parentName }) {
  const [open, setOpen] = useState(false)
  const [toggleClick, setToggleClick] = useState(false)
  return (
    <Dropdown
      as={NavItem}
      className={item.position ? `position-${item.position}` : ``}
      id={`dropdown-${item.title}`}
      onToggle={(e) => setOpen(e)}
      onClick={(e) =>
        setToggleClick(e.target.id === `dropdown-${item.title}-toggle`)
      }
    >
      <Dropdown.Toggle
        as={NavLink}
        className={parentName === item.title ? "active" : ""}
        id={`dropdown-${item.title}-toggle`}
      >
        {item.title}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`${toggleClick && !open ? "hide" : ""} ${
          item.megamenu ? "megamenu py-lg-0" : ""
        }`}
      >
        {item.dropdown &&
          item.dropdown.map((dropdownItem) =>
            dropdownItem.links ? (
              <React.Fragment key={dropdownItem.title}>
                <Dropdown.Header as="h6" className="text-uppercase fw-normal">
                  {dropdownItem.title}
                </Dropdown.Header>
                {dropdownItem.links.map((link) => (
                  <ActiveLink
                    key={link.title}
                    className="active"
                    to={link.link}
                  >
                    <Link onClick={() => onLinkClick(item.title)}>
                      {link.title}
                      {link.new && (
                        <Badge
                          bg="info-light"
                          text="info"
                          className="ms-1 mt-n1"
                        >
                          New
                        </Badge>
                      )}
                    </Link>
                  </ActiveLink>
                ))}
              </React.Fragment>
            ) : (
             
                <Dropdown.Item onClick={() => onLinkClick(item.title)}  key={dropdownItem.title} className="active" href={dropdownItem.link}>
                  {dropdownItem.title}
                  {dropdownItem.new && (
                    <Badge text="info" bg="info-light" className="ms-1 mt-n1">
                      New
                    </Badge>
                  )}
                </Dropdown.Item>
            )
          )}
        {item.megamenu && (
          <Row>
            <Col lg="9">
              <Row className="p-3 pe-lg-0 ps-lg-5 pt-lg-5">
                {item.megamenu.map((megamenuItem, index) => (
                  <Col key={index} lg="3">
                    {megamenuItem.map((block, index) => (
                      <React.Fragment key={index}>
                        <h6 className="text-uppercase">{block.title}</h6>
                        <ul className="megamenu-list list-unstyled">
                          {block.links.map((link) => (
                            <li key={link.title} className="megamenu-list-item">
                              <ActiveLink
                                className="active"
                              >
                                <Dropdown.Item
                                  className="megamenu-list-link"
                                  href={link.link}
                                  onClick={() =>
                                    link.parent
                                      ? onLinkClick(link.parent)
                                      : onLinkClick(item.title)
                                  }
                                >
                                  {link.title}
                                  {link.new && (
                                    <Badge
                                      text="info"
                                      bg="info-light"
                                      className="ms-1 mt-n1"
                                    >
                                      New
                                    </Badge>
                                  )}
                                </Dropdown.Item>
                              </ActiveLink>
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    ))}
                  </Col>
                ))}
              </Row>
              {item.services && (
                <Row className="megamenu-services d-none d-lg-flex ps-lg-5">
                  {item.services.map((service) => (
                    <Col key={service.title} xl="3" lg="6" className="d-flex">
                      <div className="megamenu-services-item">
                        <Icon
                          icon={service.icon}
                          className="megamenu-services-icon"
                        />
                        <div>
                          <h6 className="text-uppercase">{service.title}</h6>
                          <p className="mb-0 text-muted text-sm">
                            {service.content}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
            {item.image && (
              <Col lg="3" className="d-none d-lg-block position-relative">
                <Image
                  src={item.image}
                  alt=""
                  className="bg-image"
                  layout="fill"
                />
              </Col>
            )}
          </Row>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
