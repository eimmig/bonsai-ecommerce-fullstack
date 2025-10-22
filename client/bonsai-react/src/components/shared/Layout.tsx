import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { ROUTES } from '@/constants/routes';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.LOGIN;

  return (
    <div className="flex min-h-screen flex-col">
      {!isLoginPage && <Header />}
      <main id="main" className="flex-1">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
};
