import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CrearMedico = ({ isAuthenticated }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/especialidades');
        setEspecialidades(response.data);
      } catch (error) {
        console.error('Error al cargar las especialidades:', error);
        setMessage({ type: 'danger', text: 'Error al cargar las especialidades.' });
      }
    };

    fetchEspecialidades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

      const response = await axios.post('http://localhost:5001/api/medicos', {
        nombre,
        telefono,
        especialidad: especialidadSeleccionada
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        }
      });

      console.log('Médico creado:', response.data);
      setMessage({ type: 'success', text: 'Médico creado exitosamente.' });
      setNombre('');
      setTelefono('');
      setEspecialidadSeleccionada('');
    } catch (error) {
      console.error('Error al crear médico:', error);
      setMessage({ type: 'danger', text: 'Error al crear médico.' });
    }
  };

  // Verificar si el usuario está autenticado antes de permitir la creación del médico
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Opcional: mostrar un mensaje de no autenticado o redirigir a login
  }

  return (
    <Container>
      <h2>Crear Nuevo Médico</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre del Médico</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono del Médico</Form.Label>
          <Form.Control
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="especialidad">
          <Form.Label>Especialidad del Médico</Form.Label>
          <Form.Control
            as="select"
            value={especialidadSeleccionada}
            onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
            required
          >
            <option value="">Seleccionar Especialidad</option>
            {especialidades.map(especialidad => (
              <option key={especialidad._id} value={especialidad._id}>
                {especialidad.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </Container>
  );
};

export default CrearMedico;