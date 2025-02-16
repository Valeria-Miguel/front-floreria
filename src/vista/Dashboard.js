import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/DashboardStyles.css'; 

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        navigate('/'); 
        return;
      }
  
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
  
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token'); 
          navigate('/');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };
  
    const interval = setInterval(checkTokenExpiration, 30001);
    checkTokenExpiration(); 
  
    return () => clearInterval(interval); 
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Barra superior */}
      <div className="dashboard-header">
        <h1>Bienvenido</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Accesos rápidos */}
        <div className="quick-access">
          <h2>Accesos Rápidos</h2>
          <div className="quick-access-buttons">
            <button className="access-button" onClick={() => navigate('/gestionar-pedidos')}>
              Gestionar Pedidos
            </button>
            <button className="access-button" onClick={() => navigate('/ver-inventario')}>
              Ver Inventario
            </button>
            <button className="access-button" onClick={() => navigate('/clientes')}>
              Gestionar Clientes
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="notifications">
          <h2>Notificaciones</h2>
          <ul className="notification-list">
            <li>Nuevo pedido recibido: #12345</li>
            <li>Inventario bajo: Rosas rojas</li>
            <li>Recordatorio: Reunión de equipo a las 3:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;