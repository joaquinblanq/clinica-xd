import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import RatingStars from './RatingStars';
import './DoctorList.css';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/medicos');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('No se pudo cargar la lista de médicos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchDoctors();
  }, []);

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedDoctor(null);
    setFeedbackText('');
    setRating(0);
  };

  const handleShowFeedbackModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowFeedbackModal(true);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/feedback', {
        medicoId: selectedDoctor._id,
        comentario: feedbackText,
        rating: rating
      });
      console.log('Feedback enviado correctamente');
      handleCloseFeedbackModal();
    } catch (error) {
      console.error('Error al enviar feedback:', error.response);
      setError('Error al enviar feedback. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Container>
      {error && <p className="text-danger">{error}</p>}

      <Row>
        {doctors.map(doctor => (
          <Col key={doctor._id} md={4} className="mb-4">
            <div className="doctor-card" onClick={() => handleShowFeedbackModal(doctor)}>
              <h5>{doctor.nombre}</h5>
              <p className="text-muted">{doctor.especialidad.nombre}</p>
              <RatingStars initialRating={doctor.rating} readOnly />
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal}>
        <Modal.Header closeButton>
          <Modal.Title>Dar Feedback a {selectedDoctor && selectedDoctor.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedbackText">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </Form.Group>
          <RatingStars initialRating={rating} onRatingChange={handleRatingChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedbackModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleFeedbackSubmit}>Enviar Feedback</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorsList;
