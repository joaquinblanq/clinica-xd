import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faFax } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Clínica Médica</h5>
            <p>
              Ofrecemos atención médica de calidad para toda la familia. 
              Nuestros servicios incluyen cardiología, dermatología y pediatría.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces Útiles</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/nuevo-paciente" className="text-dark">Nuevo Paciente</a>
              </li>
              <li>
                <a href="/lista-pacientes" className="text-dark">Lista de Pacientes</a>
              </li>
              <li>
                <a href="/crear-medico" className="text-dark">Crear Médico</a>
              </li>
              <li>
                <a href="/crear-especialidad" className="text-dark">Crear Especialidad</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p><FontAwesomeIcon icon={faHome} className="me-3" /> Dirección, Ciudad, País</p>
              </li>
              <li>
                <p><FontAwesomeIcon icon={faEnvelope} className="me-3" /> info@clinicamedica.com</p>
              </li>
              <li>
                <p><FontAwesomeIcon icon={faPhone} className="me-3" /> + 01 234 567 88</p>
              </li>
              <li>
                <p><FontAwesomeIcon icon={faFax} className="me-3" /> + 01 234 567 89</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 footer-bottom">
        © 2023 Clínica Médica
      </div>
    </footer>
  );
}

export default Footer;
