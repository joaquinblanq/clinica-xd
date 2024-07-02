import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri'; // Importamos los iconos de React
import { FaRegUserCircle } from 'react-icons/fa'; // Opcional: un icono para el título

const Login = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar si se está registrando o iniciando sesión
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegistering) {
        response = await axios.post('http://localhost:5001/api/register', formData);
        setMessage({ type: 'success', text: 'Usuario registrado correctamente' });
      } else {
        response = await axios.post('http://localhost:5001/api/login', formData);
        setMessage({ type: 'success', text: 'Inicio de sesión exitoso' });
        localStorage.setItem('token', response.data.token);
        setAuthenticated(true); // Establecer el estado de autenticación como verdadero
        navigate('/crear-medico'); // Redirigir a la página deseada después del inicio de sesión
      }
      setFormData({ email: '', password: '' }); // Limpiar los campos de entrada
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setMessage({ type: 'error', text: error.response.data.error });
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering); // Alternar entre registro e inicio de sesión
    setMessage(null); // Limpiar mensajes al cambiar entre registro e inicio de sesión
  };

  return (
    
    <div className="login-container">
      
      <h2><FaRegUserCircle /> {isRegistering ? 'Registro de Usuario' : 'Inicio de Sesión'}</h2>
      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
          
        </p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><RiMailLine /> Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label><RiLockPasswordLine /> Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className={`btn ${isRegistering ? 'btn-primary' : 'btn-success'}`}>
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
        
      </form>
      
      <p onClick={toggleForm} className="toggle-form-link">
        
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí'}
        
      </p>
      
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        .form-group {
          margin-bottom: 10px;
        }

        label {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          color: #333;
          font-weight: bold;
        }

        input[type="email"],
        input[type="password"] {
          width: calc(100% - 30px);
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-left: 10px;
        }

        .btn {
          display: block;
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .btn-primary {
          background-color: #007bff;
          color: #fff;
        }

        .btn-success {
          background-color: #28a745;
          color: #fff;
        }

        .btn:hover {
          opacity: 0.8;
        }

        .toggle-form-link {
          cursor: pointer;
          color: #007bff;
          margin-top: 10px;
          font-size: 14px;
        }

        .toggle-form-link:hover {
          text-decoration: underline;
        }

        .message {
          padding: 10px;
          margin-top: 20px;
          border-radius: 4px;
          font-size: 14px;
        }

        .message.success {
          background-color: #d4edda;
          border-color: #c3e6cb;
          color: #155724;
        }

        .message.error {
          background-color: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }
      `}</style>
      
    </div>
    
        
    
  );
  
};

export default Login;