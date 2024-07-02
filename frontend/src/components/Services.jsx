import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Services.css';


const Services = () => {
  const services = [
    {
      title: 'Cardiología',
      description: 'Atención integral para enfermedades del corazón.'
    },
    {
      title: 'Dermatología',
      description: 'Tratamientos especializados para problemas de piel.'
    },
    {
      title: 'Pediatría',
      description: 'El mejor cuidado y atención para los niños.'
    },
    {
      title: 'Neurología',
      description: 'Diagnóstico y tratamiento de trastornos del sistema nervioso.'
    },
    {
      title: 'Ginecología y obstetría',
      description: 'Atención médica para la salud femenina, incluyendo embarazo y parto.'
    },
    {
      title: 'Ortopedia',
      description: 'Tratamiento de lesiones y enfermedades del sistema musculoesquelético.'
    }

  ];

  return (
    <Container className="services">
      <Row>
        {services.map((service, index) => (
          <Col key={index} md={4} className="service-item">
            <Card>
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;

