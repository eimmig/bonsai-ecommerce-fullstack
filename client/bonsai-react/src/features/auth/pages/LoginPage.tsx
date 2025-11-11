import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm, RegisterForm } from '@/features/auth';
import { ROUTES } from '@/constants/routes';
import registerImage from '@/assets/images/register.svg';
import loginImage from '@/assets/images/login.svg';
import './LoginPage.css';

export const LoginPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`auth-container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="auth-forms-container">
        <div className="auth-form-wrapper">
          {/* Login Form */}
          <div className="auth-signin-form">
            <h2 className="auth-title">Entrar</h2>
            <LoginForm />
            <div className="auth-links">
              <a href="/reset" className="auth-password-reset">
                Esqueci minha senha
              </a>
            </div>
          </div>

          {/* Register Form */}
          <div className="auth-signup-form">
            <h2 className="auth-title">Cadastre-se</h2>
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="auth-panels-container">
        <div className="auth-panel auth-left-panel">
          <div className="auth-content">
            <h3>Novo Aqui ?</h3>
            <p>Cadastre-se já e tenha acesso a produtos incríveis!</p>
            <button
              className="auth-btn auth-transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Cadastre-se
            </button>
            <button className="lang-btn" onClick={() => navigate(ROUTES.HOME)}>
              <span>Voltar</span>
            </button>
          </div>
          <img src={registerImage} className="auth-image" alt="Ilustração de pessoa no campo" />
        </div>
        <div className="auth-panel auth-right-panel">
          <div className="auth-content">
            <h3>Já é um de nós?</h3>
            <p>Entre com seus dados e aproveite nossas ofertas!</p>
            <button
              className="auth-btn auth-transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Entrar
            </button>
            <button className="lang-btn" onClick={() => navigate(ROUTES.HOME)}>
              <span>Voltar</span>
            </button>
          </div>
          <img
            src={loginImage}
            className="auth-image"
            alt="Ilustração de pessoa em uma ilha com arvores"
          />
        </div>
      </div>
    </div>
  );
};
