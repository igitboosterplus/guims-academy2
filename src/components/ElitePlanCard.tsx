import { motion } from 'motion/react';
import './elite-card-plan.css';

interface ElitePlanCardProps {
  imageUrl: string;
  imagePosition?: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  ctaText?: string;
  onAction?: () => void;
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
}

export const ElitePlanCard = ({
  imageUrl,
  imagePosition,
  title,
  subtitle,
  description,
  highlights = [],
  ctaText = "S'inscrire",
  onAction,
  secondaryAction,
}: ElitePlanCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="elite-plan-card"
    >
      <div className="elite-card-image-wrapper">
        <motion.div
          className="elite-card-image-inner"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="elite-card-img"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        </motion.div>
        <div className="elite-card-gradient" />
      </div>

      <div className="elite-card-content">
        <p className="elite-card-subtitle">{subtitle}</p>
        <h3 className="elite-card-title">{title}</h3>
        <p className="elite-card-description">{description}</p>

        {highlights.length > 0 && (
          <ul className="elite-card-highlights">
            {highlights.map((item, idx) => (
              <li key={idx} className="elite-card-highlight-item">
                <span className="elite-card-highlight-dot" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="elite-card-actions">
          {onAction && (
            <button onClick={onAction} className="elite-card-btn">
              {ctaText}
            </button>
          )}
          {secondaryAction && (
            <button onClick={secondaryAction.onClick} className="elite-card-btn-secondary">
              {secondaryAction.text}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ElitePlanCard;