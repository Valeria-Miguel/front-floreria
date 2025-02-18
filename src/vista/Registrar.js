import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardStyles.css'; // Estilos compartidos

const Registrar = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user',  // Definir un valor por defecto para el rol
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validar el formato de correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validar la contraseña (mínimo 6 caracteres)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del lado del cliente
    if (!formData.email || !formData.username || !formData.password || !formData.role) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setError('');

    try {
      // Enviar los datos al backend para registrar el usuario
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Usuario registrado exitosamente');
        // Redirigir al Dashboard o a otra página después del registro
        navigate('/dashboard');
      } else {
        setError(data.error || 'Hubo un problema con el registro');
      }
    } catch (error) {
      setError('Error en el servidor');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Registro de Usuario</h1>
      </div>

      <div className="dashboard-content">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="submit-button">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
