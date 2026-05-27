import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="luxury-back-wrapper">
      <button className="luxury-back-btn" onClick={goBack} aria-label="Go back">
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
    </div>
  );
}