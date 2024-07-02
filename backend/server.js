import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from './models/User.js'; // Asegúrate de importar el modelo de usuario adecuadamente
import Paciente from './models/Paciente.js'; // Importa el modelo de Paciente
import pacienteRoutes from './routes/paciente.js'; // Importa las rutas de paciente si están definidas
import medicoRoutes from './routes/medico.js'; // Importa las rutas de médico si están definidas
import especialidadRoutes from './routes/especialidad.js'; // Importa las rutas de especialidad si están definidas
import feedbackRoutes from './routes/feedback.js'; // Importa las rutas de feedback si están definidas

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB Atlas');
}).catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error.message);
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marianobonilla4@gmail.com',
    pass: 'ckxa wcyo uhol ixwb'
  }
});

// Ruta de registro de usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Si el usuario no existe, se procede a hashear la contraseña y guardar el nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar usuario' });
  }
});

// Ruta de inicio de sesión de usuarios
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña ingresada coincide con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar y enviar el token JWT si las credenciales son válidas
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
  }
});

// Ruta para registrar un paciente y enviar un correo electrónico
app.post('/api/pacientes', async (req, res) => {
  try {
    const { nombre, edad, genero, telefono, direccion, email, especialidad, medico, horario } = req.body;
    
    // Crear un nuevo paciente
    const newPaciente = new Paciente({
      nombre,
      edad,
      genero,
      telefono,
      direccion,
      email,
      especialidad,
      medico,
      horario
    });
    
    await newPaciente.save();
    
    // Configuración del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación de registro y solicitud de turno',
      text: `Estimado/a ${nombre},\n\nSu registro y solicitud de turno han sido realizados exitosamente.\n\nDetalles del turno:\nEspecialidad: ${especialidad}\nMédico: ${medico}\nHorario: ${horario}\n\nSaludos,\nEquipo Médico`
    };
    
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.status(201).json({ message: 'Paciente registrado y correo electrónico enviado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al registrar paciente y enviar correo:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar paciente y enviar correo' });
  }
});

// Rutas para pacientes, médicos, especialidades y feedback
app.use('/api', pacienteRoutes); // Rutas para pacientes
app.use('/api', medicoRoutes);    // Rutas para médicos
app.use('/api', especialidadRoutes); // Rutas para especialidades
app.use('/api', feedbackRoutes);   // Rutas para feedback

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
