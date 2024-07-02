import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs'; // Icono para el botón de Crear

const CrearEspecialidad = () => {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/especialidades', { nombre });
      console.log('Especialidad creada:', response.data);
      setMessage({ type: 'success', text: 'Especialidad creada exitosamente.' });
      setNombre(''); // Resetear el input después de enviar
    } catch (error) {
      console.error('Error creating especialidad:', error);
      setMessage({ type: 'danger', text: 'Error al crear especialidad.' });
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Crear Nueva Especialidad</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre" className="mb-3">
          <Form.Label>Nombre de la Especialidad</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          <BsFillPlusCircleFill className="me-2" /> Crear Especialidad
        </Button>
        <br /><br /><br /><br /><br /><br />
      </Form>
    </Container>
  );
};

export default CrearEspecialidad;
