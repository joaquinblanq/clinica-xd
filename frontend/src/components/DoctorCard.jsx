import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaUserMd, FaStar } from 'react-icons/fa';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onFeedbackClick }) => {
  const { nombre, especialidad } = doctor;

  return (
    <Card className="doctor-card">
      <Card.Body>
        <div className="doctor-header">
          <FaUserMd className="doctor-icon" />
          <div>
            <Card.Title>{nombre}</Card.Title>
            <Card.Subtitle className="text-muted">{especialidad}</Card.Subtitle>
          </div>
        </div>
        <Button variant="primary" className="feedback-button" onClick={() => onFeedbackClick(doctor)}>
          <FaStar className="feedback-icon" /> Dar Feedback
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
