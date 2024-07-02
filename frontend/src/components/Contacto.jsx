import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    motivoConsulta: '',
    mensaje: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulación de envío de formulario a través de una API
      console.log('Formulario de contacto enviado:', formData);
      setMessage({ type: 'success', text: 'Mensaje enviado exitosamente.' });
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        motivoConsulta: '',
        mensaje: ''
      }); // Limpiar el formulario después del envío
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessage({ type: 'danger', text: 'Error al enviar mensaje. Inténtalo de nuevo más tarde.' });
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Contacto</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="motivoConsulta">
            <Form.Label>Motivo de Consulta</Form.Label>
            <Form.Control
              as="select"
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Consulta General">Consulta General</option>
              <option value="Especialidad Médica">Especialidad Médica</option>
              <option value="Seguimiento">Seguimiento</option>
              <option value="Otro">Otro</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Enviar Mensaje
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;
