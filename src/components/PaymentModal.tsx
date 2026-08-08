import { useState } from 'react';
import { X, CreditCard, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../hooks/usePayment';
import { formatPrice } from '../lib/payment';
import type { Formation, PaymentMethod } from '../lib/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  formation: Formation;
}

const PaymentModal = ({ isOpen, onClose, formation }: PaymentModalProps) => {
  const { user } = useAuth();
  const { initiatePayment, processing, lastResult } = usePayment();
  const [method, setMethod] = useState<PaymentMethod>('mobile_money');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'form' | 'processing' | 'result'>('form');

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setStep('processing');
    const result = await initiatePayment({
      amount: formation.price,
      currency: 'XAF',
      method,
      studentId: user.id,
      formationTitle: formation.title,
      phoneNumber: phone,
    });

    setStep('result');
    if (result.success) {
      setTimeout(() => {
        onClose();
        setStep('form');
      }, 3000);
    }
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-modal-close" onClick={onClose}><X size={20} /></button>

        {step === 'form' && (
          <>
            <div className="payment-modal-header">
              <CreditCard size={28} />
              <h2>Paiement de la formation</h2>
            </div>

            <div className="payment-summary">
              <h3>{formation.title}</h3>
              <p className="payment-amount">{formatPrice(formation.price)}</p>
            </div>

            {!user ? (
              <div className="payment-login-notice">
                <AlertCircle size={20} />
                <p>Vous devez être connecté pour effectuer un paiement. <a href="/connexion">Se connecter</a></p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="payment-form">
                <div className="payment-methods">
                  <label className={`payment-method-option ${method === 'mobile_money' ? 'selected' : ''}`}>
                    <input type="radio" name="method" value="mobile_money" checked={method === 'mobile_money'} onChange={() => setMethod('mobile_money')} />
                    <Phone size={20} />
                    <span>Mobile Money</span>
                  </label>
                  <label className={`payment-method-option ${method === 'card' ? 'selected' : ''}`}>
                    <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
                    <CreditCard size={20} />
                    <span>Carte bancaire</span>
                  </label>
                </div>

                {method === 'mobile_money' && (
                  <div className="payment-field">
                    <label>Numéro de téléphone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="6XX XXX XXX"
                      required
                    />
                  </div>
                )}

                <button type="submit" className="payment-submit-btn" disabled={processing}>
                  Payer {formatPrice(formation.price)}
                </button>
              </form>
            )}
          </>
        )}

        {step === 'processing' && (
          <div className="payment-processing">
            <Loader2 size={48} className="spin" />
            <h3>Traitement en cours...</h3>
            <p>Veuillez patienter pendant que nous traitons votre paiement.</p>
          </div>
        )}

        {step === 'result' && lastResult && (
          <div className={`payment-result ${lastResult.success ? 'success' : 'error'}`}>
            {lastResult.success ? (
              <>
                <CheckCircle size={48} />
                <h3>Paiement initié !</h3>
                <p>Votre paiement a été enregistré. Vous recevrez une confirmation une fois le paiement validé.</p>
                {lastResult.transactionId && (
                  <p className="payment-ref">Réf : {lastResult.transactionId.substring(0, 12)}...</p>
                )}
              </>
            ) : (
              <>
                <AlertCircle size={48} />
                <h3>Erreur de paiement</h3>
                <p>{lastResult.error || 'Une erreur est survenue. Veuillez réessayer.'}</p>
                <button onClick={() => setStep('form')} className="payment-retry-btn">Réessayer</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
