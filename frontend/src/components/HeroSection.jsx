// HeroSection.jsx

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './HeroSection.css'; // Importa el archivo CSS

const HeroSection = () => {
  return (
    <div className="hero-section text-center">
      <Container>
        <Row>
          <Col>
            <h1>Bienvenidos a Nuestra Clínica Médica</h1>
            <p>Ofrecemos atención médica de calidad para toda la familia.</p>
            <Link to="/contacto">
              <Button variant="outline-light" size="lg" className="btn-contact">
                Contacta con Nosotros
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
