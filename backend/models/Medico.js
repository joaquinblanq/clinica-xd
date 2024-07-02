import mongoose from 'mongoose';

const medicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  especialidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad', required: true },
  // otros campos...
});

const Medico = mongoose.model('Medico', medicoSchema);
export default Medico;