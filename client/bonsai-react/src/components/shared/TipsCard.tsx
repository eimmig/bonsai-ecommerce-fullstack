import type { ReactNode } from 'react';
import './TipsCard.css';

interface TipsCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const TipsCard = ({ icon, title, description }: TipsCardProps) => {
  return (
    <div className="tip-card">
      <div className="tip-icon">
        {icon}
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};
