import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CrearMedico from './components/CrearMedico';
import Login from './components/Login';
import Home from './components/Home';
import PacienteForm from './components/PacienteForm';
import PacienteList from './components/PacienteList';
import CrearEspecialidad from './components/CrearEspecialidad';
import DoctorList from './components/DoctorList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './components/Auth';
import Register from './components/Register';
import Footer from './components/Footer';
import Contacto from './components/Contacto';
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Navbar isAuthenticated={authenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route
            path="/crear-medico"
            element={<CrearMedico isAuthenticated={authenticated} />}
          />
          <Route path="/nuevo-paciente" element={<PacienteForm />} />
          <Route path="/lista-pacientes" element={<PacienteList />} />
          <Route path="/crear-especialidad" element={<CrearEspecialidad />} />
          <Route path="/ver-medicos" element={<DoctorList />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/contacto" element={<Contacto />} />

        </Routes>
        <br /><br /><br /> <br /><br /><br /> <br /><br /><br /><br /><br /><br />
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
