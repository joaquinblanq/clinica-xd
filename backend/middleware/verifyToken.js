// middleware/verifyToken.js

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtén el token del header Authorization
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto'); // Verifica el token usando la clave secreta
    req.user = decoded; // Añade la información del usuario decodificado al objeto de solicitud
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
  }
};

export default verifyToken;
