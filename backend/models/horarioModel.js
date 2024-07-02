import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  inicio: { type: String, required: true },
  fin: { type: String, required: true },
});

const Horario = mongoose.model('Horario', horarioSchema);

export default Horario;
