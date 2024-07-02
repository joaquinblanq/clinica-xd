import mongoose from 'mongoose';

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  genero: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  especialidad: { type: String, required: true },
  medico: { type: String, required: true },
  horario: { type: Date, required: true }
});

const Paciente = mongoose.model('Paciente', PacienteSchema);

export default Paciente;
