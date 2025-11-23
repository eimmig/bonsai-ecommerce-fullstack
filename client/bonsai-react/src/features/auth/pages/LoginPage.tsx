import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm, RegisterForm } from '@/features/auth';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import registerImage from '@/assets/images/register.svg';
import loginImage from '@/assets/images/login.svg';
import './LoginPage.css';

export const LoginPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={`auth-container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="auth-forms-container">
        <div className="auth-form-wrapper">
          {/* Login Form */}
          <div className="auth-signin-form">
            <h2 className="auth-title">{t('auth.login.title')}</h2>
            <LoginForm />
            <div className="auth-links">
              <a href="/reset" className="auth-password-reset">
                {t('auth.login.forgotPassword')}
              </a>
            </div>
          </div>

          {/* Register Form */}
          <div className="auth-signup-form">
            <h2 className="auth-title">{t('auth.register.title')}</h2>
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="auth-panels-container">
        <div className="auth-panel auth-left-panel">
          <div className="auth-content">
            <h3>{t('auth.login.noAccount')}</h3>
            <p>{t('auth.register.description')}</p>
            <button
              className="auth-btn auth-transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              {t('auth.login.createAccount')}
            </button>
            <button className="lang-btn" onClick={() => navigate(ROUTES.HOME)}>
              <span>{t('auth.login.backToHome')}</span>
            </button>
          </div>
          <img src={registerImage} className="auth-image" alt={t('auth.register.title')} />
        </div>
        <div className="auth-panel auth-right-panel">
          <div className="auth-content">
            <h3>{t('auth.register.hasAccount')}</h3>
            <p>{t('auth.login.description')}</p>
            <button
              className="auth-btn auth-transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              {t('auth.register.goToLogin')}
            </button>
            <button className="lang-btn" onClick={() => navigate(ROUTES.HOME)}>
              <span>{t('auth.login.backToHome')}</span>
            </button>
          </div>
          <img
            src={loginImage}
            className="auth-image"
            alt={t('auth.login.title')}
          />
        </div>
      </div>
    </div>
  );
};
