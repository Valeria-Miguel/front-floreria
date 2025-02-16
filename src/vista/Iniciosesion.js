import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IniciosesionStyles.css'; // Importa los estilos CSS

const Iniciosesion = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {

      const datosLogin = {
        email: correo,
        password: contrasena,
      };
  
      const respuesta = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosLogin),
      });
  
      if (respuesta.ok) {
        const datosRespuesta = await respuesta.json();
        console.log('Respuesta del servidor:', datosRespuesta);
  
        // Guardar el token en el localStorage
        localStorage.setItem('token', datosRespuesta.intDataMessage[0].credentials);
  
   
        navigate('/dashboard');
      } else {
        // Manejar errores de autenticación
        const error = await respuesta.json();
        console.error('Error al iniciar sesión:', error);
        alert(error.intDataMessage[0].error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
  
      if (error.response) {
        const errorData = await error.response.json();
        console.error('Error del servidor:', errorData);
        alert(errorData.intDataMessage[0].error || 'Error al conectar con el servidor');
      } else {

        alert('No se pudo conectar con el servidor. Verifica tu conexión a internet o si el servidor está en funcionamiento.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <div className="input-container">
          <i className="icon fas fa-envelope"></i>
          <input
            className="input"
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="input-container">
          <i className="icon fas fa-lock"></i>
          <input
            className="input"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className="eye-icon" onClick={togglePasswordVisibility}>
            <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>

        <div className="login-links">
          {/*<button className="link-button" onClick={() => navigate('/registro')}>
            ¿Deseas registrarte como empresa?
          </button>
        */}
        </div>
      </div>
    </div>
  );
};

export default Iniciosesion;