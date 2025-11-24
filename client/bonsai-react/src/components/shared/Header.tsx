import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown, Search } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { useCartStore } from '@/stores/cart-store';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { LanguageSelector } from './LanguageSelector';
import LogoImage from '@/assets/images/logo.svg';
import './Header.css';

const HeaderComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCartStore();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const productsDropdownRef = useRef<HTMLLIElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsUserMenuOpen(false);
  }, [logout]);

  const handleNavClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsProductsOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const getCartLabel = () => {
    if (itemCount === 0) return t('cart.empty');
    const itemText = t(itemCount === 1 ? 'cart.item' : 'cart.item_plural', { count: itemCount });
    return `${t('nav.cart')} ${itemText}`;
  };

  return (
    <header id="header" role="banner">
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Logo */}
          <Link 
            to={ROUTES.HOME} 
            className="navbar-brand" 
            aria-label="Bonsai Brasil - Ir para página inicial"
            onClick={handleNavClick}
          >
            <img src={LogoImage} alt="Bonsai Ecommerce Logo" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                to={ROUTES.HOME} 
                className="nav-link"
                onClick={handleNavClick}
              >
                {t('nav.home')}
              </Link>
            </li>
            <li className="nav-item" ref={productsDropdownRef}>
              <button 
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="dropdown-toggle"
              >
                {t('nav.products')}
                <ChevronDown />
              </button>
              {isProductsOpen && (
                <div className="dropdown-menu">
                  <Link 
                    to={ROUTES.PRODUCTS} 
                    className="dropdown-item"
                    onClick={handleNavClick}
                  >
                    {t('home.categories')}
                  </Link>
                  <Link 
                    to={ROUTES.PRODUCTS} 
                    className="dropdown-item"
                    onClick={handleNavClick}
                  >
                    {t('products.featured')}
                  </Link>
                  <Link 
                    to={ROUTES.PRODUCTS} 
                    className="dropdown-item"
                    onClick={handleNavClick}
                  >
                    {t('products.allCategories')}
                  </Link>
                </div>
              )}
            </li>
            <li className="nav-item">
              <Link 
                to={ROUTES.ABOUT} 
                className="nav-link"
                onClick={handleNavClick}
              >
                {t('footer.about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to={ROUTES.ABOUT} 
                className="nav-link"
                onClick={handleContactClick}
              >
                {t('footer.contact')}
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="search"
              className="search-input"
              placeholder={t('products.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('common.search')}
            />
            <Search className="search-icon" aria-hidden="true" />
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Cart */}
          <Link 
            to={ROUTES.CART} 
            className="cart-link" 
            aria-label={getCartLabel()}
            onClick={handleNavClick}
          >
            <ShoppingCart aria-hidden="true" />
            {itemCount > 0 && (
              <span className="cart-badge">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="user-menu" ref={userMenuRef}>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-button"
                  aria-label={t('nav.profile')}
                >
                  <User />
                  {t('nav.profile')}
                </button>
                {isUserMenuOpen && (
                  <div className="dropdown-menu">
                    <Link 
                      to={ROUTES.PROFILE} 
                      className="dropdown-item"
                      onClick={handleNavClick}
                    >
                      {t('profile.title')}
                    </Link>
                    <Link 
                      to={ROUTES.ORDERS} 
                      className="dropdown-item"
                      onClick={handleNavClick}
                    >
                      {t('nav.orders')}
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to={ROUTES.LOGIN} className="user-button" aria-label={t('nav.login')}>
                <User />
                {t('nav.login')}/ {t('nav.register')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-logo">
              <img src={LogoImage} alt="Bonsai Ecommerce Logo" />
            </div>
            
            <div className="mobile-menu-nav">
              <Link 
                to={ROUTES.ABOUT} 
                className="mobile-menu-link"
                onClick={handleContactClick}
              >
                {t('footer.contact')}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to={ROUTES.PROFILE} 
                    className="mobile-menu-link"
                    onClick={handleNavClick}
                  >
                    {t('profile.title')}
                  </Link>
                  <Link 
                    to={ROUTES.CART} 
                    className="mobile-menu-link"
                    onClick={handleNavClick}
                  >
                    {t('cart.title')}
                  </Link>
                  <button onClick={handleLogout} className="mobile-menu-button">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link 
                  to={ROUTES.LOGIN} 
                  className="mobile-menu-link"
                  onClick={handleNavClick}
                >
                  {t('nav.login')}/ {t('nav.register')}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export const Header = memo(HeaderComponent);
