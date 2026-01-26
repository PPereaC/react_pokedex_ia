import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/home";
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Row, Col } from 'react-bootstrap';

function App() {

  return (
    <>
      <Navbar expand="lg" className="bg-navbar-orange">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto full-width pr-15">

              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Buscar por nombre, tipo, etc"
                    />
                  </Col>
                </Row>
              </Form>

              <Nav.Link className='ml-auto' as={Link} to="/">Inicio</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='body-content'>
        <Row>
          <Col lg={2} md={12}>
            hola
          </Col>
          <Col className='filter-bar' lg={10} md={12}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Col>
        </Row>
      </Container>



    </>
  )
}

export default App
