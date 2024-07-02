import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PacienteList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import moment from 'moment'; // Importa moment para formatear el horario

const PacienteList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [editingPaciente, setEditingPaciente] = useState(null); // Estado para manejar la edición de paciente
  const [validationErrors, setValidationErrors] = useState({}); // Estado para manejar errores de validación

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const handleEditClick = (paciente) => {
    setEditingPaciente(paciente); // Establecer el paciente actual para editar
    setValidationErrors({}); // Reiniciar errores de validación al editar
  };

  const handleCancelEdit = () => {
    setEditingPaciente(null); // Cancelar la edición, resetear el estado
    setValidationErrors({}); // Reiniciar errores de validación al cancelar
  };

  const handleSaveEdit = async (paciente) => {
    if (validateForm(paciente)) {
      try {
        await axios.put(`http://localhost:5001/api/pacientes/${paciente._id}`, paciente);
        fetchPacientes(); // Actualizar la lista de pacientes después de editar
        setEditingPaciente(null); // Finalizar la edición, resetear el estado
        setValidationErrors({}); // Reiniciar errores de validación
      } catch (error) {
        console.error('Error al actualizar paciente:', error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/pacientes/${id}`);
      fetchPacientes(); // Actualizar la lista de pacientes después de eliminar
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
    }
  };

  const handleChange = (e, paciente) => {
    const { name, value } = e.target;
    setEditingPaciente({
      ...paciente,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (!isNaN(value)) {
          error = 'El nombre no puede contener números';
        }
        break;
      case 'edad':
        if (!value.trim()) {
          error = 'La edad es requerida';
        } else if (isNaN(value)) {
          error = 'La edad debe ser un número';
        }
        break;
      case 'telefono':
        if (!value.trim()) {
          error = 'El teléfono es requerido';
        } else if (isNaN(value)) {
          error = 'El teléfono debe ser numérico';
        } else if (value.length !== 10) {
          error = 'El teléfono debe tener 10 dígitos';
        }
        break;
      case 'horario':
        if (!value.trim()) {
          error = 'El horario es requerido';
        } else if (moment(value).isBefore(moment())) {
          error = 'No puedes seleccionar un horario pasado';
        }
        break;
      default:
        break;
    }
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateForm = (paciente) => {
    const errors = {};
    // Implementa la validación del formulario según tus requisitos
    // Verificar si el horario y médico ya están ocupados
    const isDuplicate = pacientes.some(p => {
      return p._id !== paciente._id && moment(p.horario).format('YYYY-MM-DD HH:mm') === moment(paciente.horario).format('YYYY-MM-DD HH:mm') && p.medico === paciente.medico;
    });

    if (isDuplicate) {
      errors.horario = 'Ya hay un paciente registrado con el mismo horario y médico';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Devuelve true si no hay errores
  };

  return (
    <div className="paciente-list-container">
      <h2 className="title">Lista de Pacientes</h2>
      <table className="paciente-table">
        {/* Encabezados de la tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Especialidad</th>
            <th>Médico</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente._id}>
              {/* Columnas de los datos del paciente */}
              <td>
                {editingPaciente && editingPaciente._id === paciente._id ? (
                  <>
                    <input
                      type="text"
                      name="nombre"
                      value={editingPaciente.nombre}
                      onChange={(e) => handleChange(e, editingPaciente)}
                      className={validationErrors.nombre ? 'error' : ''}
                    />
                    {validationErrors.nombre && <span className="error-message">{validationErrors.nombre}</span>}
                  </>
                ) : (
                  paciente.nombre
                )}
              </td>
              <td>
                {editingPaciente && editingPaciente._id === paciente._id ? (
                  <>
                    <input
                      type="text"
                      name="edad"
                      value={editingPaciente.edad}
                      onChange={(e) => handleChange(e, editingPaciente)}
                      className={validationErrors.edad ? 'error' : ''}
                    />
                    {validationErrors.edad && <span className="error-message">{validationErrors.edad}</span>}
                  </>
                ) : (
                  paciente.edad
                )}
              </td>
              <td>{paciente.genero}</td>
              <td>
                {editingPaciente && editingPaciente._id === paciente._id ? (
                  <>
                    <input
                      type="text"
                      name="telefono"
                      value={editingPaciente.telefono}
                      onChange={(e) => handleChange(e, editingPaciente)}
                      className={validationErrors.telefono ? 'error' : ''}
                    />
                    {validationErrors.telefono && <span className="error-message">{validationErrors.telefono}</span>}
                  </>
                ) : (
                  paciente.telefono
                )}
              </td>
              <td>{paciente.direccion}</td>
              <td>{paciente.email}</td>
              <td>{paciente.especialidad}</td>
              <td>{paciente.medico}</td>
              <td>
                {editingPaciente && editingPaciente._id === paciente._id ? (
                  <>
                    <input
                      type="datetime-local"
                      name="horario"
                      value={moment(editingPaciente.horario).format('YYYY-MM-DDTHH:mm')}
                      onChange={(e) => handleChange(e, editingPaciente)}
                      className={validationErrors.horario ? 'error' : ''}
                    />
                    {validationErrors.horario && <span className="error-message">{validationErrors.horario}</span>}
                  </>
                ) : (
                  moment(paciente.horario).format('DD/MM/yyyy HH:mm')
                )}
              </td>
              <td>
                {editingPaciente && editingPaciente._id === paciente._id ? (
                  <>
                    <button onClick={() => handleSaveEdit(editingPaciente)}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(paciente)}><FaEdit /></button>
                    <button onClick={() => handleDeleteClick(paciente._id)}><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;
