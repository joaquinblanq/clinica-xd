import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PacienteForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBirthdayCake,
  faVenusMars,
  faPhone,
  faMapMarkerAlt,
  faStethoscope,
  faUserMd,
  faMicrophone,
  faCheck,
  faClock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/es';

const PacienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: 'Masculino',
    telefono: '',
    direccion: '',
    email: '',
    modoVoz: false,
    especialidad: '',
    medico: '',
    horario: null // Inicializado como null para la fecha y hora seleccionada
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/especialidades');
        setEspecialidades(response.data);
      } catch (error) {
        console.error('Error al obtener especialidades:', error);
      }
    };

    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/medicos');
        setMedicos(response.data);
      } catch (error) {
        console.error('Error al obtener médicos:', error);
      }
    };

    fetchEspecialidades();
    fetchMedicos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar si el campo es 'edad' y el valor es negativo
    if (name === 'edad' && parseInt(value) < 0) {
      alert('La edad no puede ser negativa');
      return; // No actualizamos el estado si la edad es negativa
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      audioFile: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosPaciente = {
        nombre: formData.nombre,
        edad: formData.edad,
        genero: formData.genero,
        telefono: formData.telefono,
        direccion: formData.direccion,
        email: formData.email,
        modoVoz: formData.modoVoz,
        especialidad: formData.especialidad,
        medico: formData.medico,
        horario: formData.horario
      };

      await axios.post('http://localhost:5001/api/pacientes', datosPaciente);

      setFormData({
        nombre: '',
        edad: '',
        genero: 'Masculino',
        telefono: '',
        direccion: '',
        email: '',
        modoVoz: false,
        especialidad: '',
        medico: '',
        horario: null // Reiniciamos horario a null después del envío exitoso
      });

      alert('Paciente registrado exitosamente y solicitud de turno realizada.');
    } catch (error) {
      console.error('Error al registrar paciente y solicitar turno:', error);
    }
  };

  const toggleModoVoz = () => {
    setFormData({
      ...formData,
      modoVoz: !formData.modoVoz
    });
  };

  return (
    <div className="paciente-form">
      <h2><FontAwesomeIcon icon={faUser} /> Registrar Paciente y Solicitar Turno</h2>
      <div className="modo-voz">
        <label>
          <input type="checkbox" checked={formData.modoVoz} onChange={toggleModoVoz} />
          Usar modo voz
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        {!formData.modoVoz ? (
          <div className="form-fields">
            <div className="form-section">
              <label htmlFor="nombre"><FontAwesomeIcon icon={faUser} /> Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="edad"><FontAwesomeIcon icon={faBirthdayCake} /> Edad:</label>
              <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="genero"><FontAwesomeIcon icon={faVenusMars} /> Género:</label>
              <select id="genero" name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-section">
              <label htmlFor="telefono"><FontAwesomeIcon icon={faPhone} /> Teléfono:</label>
              <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="direccion"><FontAwesomeIcon icon={faMapMarkerAlt} /> Dirección:</label>
              <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="especialidad"><FontAwesomeIcon icon={faStethoscope} /> Especialidad:</label>
              <select id="especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} required>
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad._id} value={especialidad.nombre}>{especialidad.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-section">
              <label htmlFor="medico"><FontAwesomeIcon icon={faUserMd} /> Médico:</label>
              <select id="medico" name="medico" value={formData.medico} onChange={handleChange} required>
                <option value="">Seleccione un médico</option>
                {medicos.map((medico) => (
                  <option key={medico._id} value={medico.nombre}>{medico.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-section">
              <label htmlFor="horario"><FontAwesomeIcon icon={faClock} /> Seleccione fecha y hora:</label>
              <div className="datetime-picker">
                <DatePicker
                  selected={formData.horario}
                  onChange={(date) => setFormData({ ...formData, horario: date })}
                  showTimeSelect
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  locale="es"
                  placeholderText="Seleccione fecha y hora"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="form-section">
            <label htmlFor="audioFile"><FontAwesomeIcon icon={faMicrophone} /> Grabación de Audio:</label>
            <input type="file" id="audioFile" name="audioFile" accept="audio/*" onChange={handleFileChange} required />
          </div>
        )}
        <div className="button-section">
          <button type="submit"><FontAwesomeIcon icon={faCheck} /> Registrar Paciente y Solicitar Turno</button>
        </div>
      </form>
    </div>
  );
};

export default PacienteForm;
