import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>REGÍSTRATE YA!</h2>

            <div className="input-group">
            <input type="text" placeholder="Nombre" />
            <FaUser />
            </div>

            <div className="input-group">
            <input type="email" placeholder="Correo" />
            <FaEnvelope />
            </div>

            <div className="input-group">
            <input type="password" placeholder="Clave" />
            <FaLock />
            </div>

            <button className="register-button">INICIAR</button>

            <p className="register-footer">
            Ya tienes cuenta?
            <a href="/"> Click aquí</a>
            </p>
      </div>
    </div>
  );
};

export default Register;
