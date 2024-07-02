import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const CustomNavbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleCrearMedicoClick = async () => {
    try {
      // Aquí podrías hacer una verificación adicional si es necesario antes de redirigir al usuario
      if (!isAuthenticated) {
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      } else {
        navigate('/crear-medico'); // Si está autenticado, navega a la página de crear médico
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Navbar expand="lg" className="navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Tu Clínica Médica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/nuevo-paciente">Nuevo Paciente</Nav.Link>
            <Nav.Link as={Link} to="/lista-pacientes">Lista Pacientes</Nav.Link>
            <NavDropdown title="Médicos" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleCrearMedicoClick}>Crear Médico</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ver-medicos">Ver Médicos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/crear-especialidad">Crear Especialidad</NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
