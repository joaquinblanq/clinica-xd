import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TurnosList = () => {
  const [medicos, setMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    pacienteNombre: '',
    fechaTurno: '',
    motivo: '',
  });

  const handleShowModal = (medico) => {
    setSelectedMedico(medico);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedico(null);
    setFormData({
      pacienteNombre: '',
      fechaTurno: '',
      motivo: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5001/api/turnos/${selectedMedico._id}`, formData);
      console.log('Turno creado:', response.data);
      alert('Turno creado exitosamente');
      handleCloseModal();
    } catch (error) {
      console.error('Error al crear turno:', error);
      alert('Hubo un error al crear el turno');
    }
  };

  return (
    <Container>
      <h2>Selecciona un Médico para Sacar Turno</h2>
      <Row>
        {medicos.map((medico) => (
          <Col key={medico._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{medico.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{medico.especialidad.nombre}</Card.Subtitle>
                <Card.Text>
                  <strong>Horario de Atención:</strong> {medico.horarioAtencion}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(medico)}>Sacar Turno</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para sacar turno */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sacar Turno con {selectedMedico && selectedMedico.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre del Paciente:</Form.Label>
              <Form.Control
                type="text"
                name="pacienteNombre"
                value={formData.pacienteNombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha del Turno:</Form.Label>
              <Form.Control
                type="date"
                name="fechaTurno"
                value={formData.fechaTurno}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Motivo del Turno:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Confirmar Turno</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TurnosList;
