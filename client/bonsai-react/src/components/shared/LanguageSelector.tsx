import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import './LanguageSelector.css';

export const LanguageSelector = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className="language-selector">
      <Globe className="language-icon" />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as 'pt' | 'en')}
        className="language-select"
        aria-label="Select language"
      >
        <option value="pt">PT</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};
