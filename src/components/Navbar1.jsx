import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar1.css';
import { Link } from 'react-router-dom';
function Navbar1() {
  return (
    <div>

<Navbar collapseOnSelect expand="lg" className="Navbar">
      <Container className='con-nav'>
        <Navbar.Brand href="/">
        <NavDropdown title="United States" id="nav-dropdown">
            
              <NavDropdown.Item href="/southkorea" id='d-item'>South Korea</NavDropdown.Item>
              <NavDropdown.Item href="/australia" id='d-item'>
                Australia
              </NavDropdown.Item>
              <NavDropdown.Item href="/romania" id='d-item'>Romania</NavDropdown.Item>
              <NavDropdown.Item href="/canada" id='d-item'>Canada</NavDropdown.Item>
              <NavDropdown.Item href="/mexico" id='d-item'>Mexico</NavDropdown.Item>
              <NavDropdown.Item href="/qatar" id='d-item'>Qatar</NavDropdown.Item>
              <NavDropdown.Item href="/international" id='d-item'>View All</NavDropdown.Item>
          
            </NavDropdown>
            <img src='logo-tag.png' width='130px'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"  id='main-nav'>
            <Nav.Link href="/about" id='nav'>ABOUT</Nav.Link>
            <NavDropdown title="SERVICES" id="nav">
              <NavDropdown.Item href="/investors" className='drop-menu'>FOR INVESTORS</NavDropdown.Item>
              <NavDropdown.Item href="/occupiers" className='drop-menu' >
                FOR OCCUPIERS
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/culture" id='nav'>CULTURE</Nav.Link>

            <NavDropdown title="JOIN SVN" id="nav">
              <NavDropdown.Item href="/careers" className='drop-menu'>CAREERS</NavDropdown.Item>
              <NavDropdown.Item href="/office" className='drop-menu'>
                AFFILIATE YOUR OFFICE
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/insights" id='nav'>INSIGHTS</Nav.Link>
           
          </Nav>
          
          <Nav id='main-nav-2'>
        
            <Nav.Link href="/properties" id='nav1' >Properties</Nav.Link> <span>-</span>
            <Nav.Link href="/offices" id='nav1'>
              Offices
            </Nav.Link><span>-</span>
            <Nav.Link href="/peoples2" id='nav1'>
              People
            </Nav.Link><span>-</span>
            {/* <Nav.Link href="/svnlive" id='nav1'> */}
              <Nav.Link href="/svn-live" id='nav1'>
              SVN | Live
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navbar1