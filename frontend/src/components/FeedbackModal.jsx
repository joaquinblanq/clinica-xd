import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FeedbackModal = ({ show, handleClose, handleSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedbackSubmit = () => {
    handleSubmit(feedbackText);
    setFeedbackText(''); // Limpiar el estado después de enviar el feedback
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dar Feedback</Modal.Title>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleFeedbackSubmit}>
          Enviar Feedback
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;
