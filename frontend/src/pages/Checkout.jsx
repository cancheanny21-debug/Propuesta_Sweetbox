import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const PAYMENT_METHODS = [
  { id: 'efectivo', label: 'Efectivo', desc: 'Paga al recibir', icon: '💵' },
  { id: 'tarjeta',  label: 'Tarjeta',  desc: 'Débito o Crédito', icon: '💳' },
  { id: 'stripe',   label: 'Stripe',   desc: 'Pago en línea seguro', icon: '⚡' },
  { id: 'paypal',   label: 'PayPal',   desc: 'Tu cuenta PayPal', icon: '🅿️' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, cartTotal } = useCart();

  const shippingCost = cartTotal >= 30 ? 0 : 5.0;
  const finalTotal = cartTotal + shippingCost;

  const [step, setStep] = useState(1); // 1: info, 2: payment, 3: processing
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Simulación de pago con Stripe/PayPal ────────────────────────────────
  const simulatePaymentGateway = (method) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, transactionId: `TXN-${Date.now()}` }), 1800);
    });

  // ── Confirmar pedido en backend ──────────────────────────────────────────
  const handleConfirmOrder = async () => {
    setError('');
    setLoading(true);
    setStep(3);

    try {
      const token = localStorage.getItem('sweetbox_token');
      if (!token) throw new Error('No se encontró el token. Inicia sesión de nuevo.');

      // Si el método es Stripe o PayPal, simulamos la pasarela primero
      if (paymentMethod === 'stripe' || paymentMethod === 'paypal') {
        const gwResult = await simulatePaymentGateway(paymentMethod);
        if (!gwResult.success) throw new Error('El pago fue rechazado. Intenta con otro método.');
      }

      const formattedItems = cart.map(item => ({
        product_id: item.id,
        cantidad: item.quantity || 1,
        precio_unitario: parseFloat(item.precio),
      }));

      const metodoPagoLabel = PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label || paymentMethod;

      const response = await axios.post(
        'http://localhost:3000/api/orders',
        { total: finalTotal, metodo_pago: metodoPagoLabel, direccion: address, items: formattedItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      clearCart();
      navigate('/tracking', { state: { orderId: response.data.orderId, metodoPago: metodoPagoLabel, total: finalTotal, direccion: address } });

    } catch (err) {
      console.error('Error al procesar pago:', err);
      setError(err.response?.data?.error || err.message || 'Error al procesar el pedido.');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // ── Guard: carrito vacío ─────────────────────────────────────────────────
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="checkout-container empty-screen">
        <div className="co-bg-shape s1" /><div className="co-bg-shape s2" />
        <div className="co-empty-card">
          <div className="co-empty-icon">🛒</div>
          <h2>Carrito vacío</h2>
          <p>Agrega productos antes de continuar al pago.</p>
          <button className="co-btn-primary" onClick={() => navigate('/catalog')}>Ir al Catálogo 🍰</button>
        </div>
      </div>
    );
  }

  // ── Pantalla de procesando pago ─────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="checkout-container processing-screen">
        <div className="co-bg-shape s1" /><div className="co-bg-shape s2" />
        <div className="co-processing-card">
          <div className="co-processing-spinner" />
          <h2 className="co-processing-title">Procesando tu pago…</h2>
          <p className="co-processing-sub">Estamos confirmando tu pedido con {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}. Por favor espera.</p>
          {error && (
            <div className="co-error" style={{ marginTop: '1.2rem' }}>⚠️ {error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="co-bg-shape s1" /><div className="co-bg-shape s2" />

      <div className="co-card">
        {/* ── Header y Steps ─────────────────────────────────── */}
        <div className="co-header">
          <button className="co-back-btn" onClick={() => step === 1 ? navigate('/cart') : setStep(1)}>
            ← {step === 1 ? 'Carrito' : 'Atrás'}
          </button>
          <h1 className="co-title">Pago Seguro 🔒</h1>
        </div>

        <div className="co-steps">
          <div className={`co-step ${step >= 1 ? 'active' : ''}`}>
            <div className="co-step-dot">{step > 1 ? '✓' : '1'}</div>
            <span>Entrega</span>
          </div>
          <div className="co-step-line" />
          <div className={`co-step ${step >= 2 ? 'active' : ''}`}>
            <div className="co-step-dot">{step > 2 ? '✓' : '2'}</div>
            <span>Pago</span>
          </div>
        </div>

        {/* ─── STEP 1: Información de Entrega ────────────────── */}
        {step === 1 && (
          <div className="co-step-content">
            <h2 className="co-section-title">📍 Dirección de Entrega</h2>

            <div className="co-form-group">
              <label htmlFor="checkout-address">Dirección completa</label>
              <textarea
                id="checkout-address"
                rows="3"
                placeholder="Ej: Calle Rosal #45, Colonia Centro, Ciudad de México — referencia: frente al parque"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            {/* Resumen del pedido */}
            <div className="co-order-summary">
              <h3 className="co-summary-title">Resumen del Pedido</h3>
              {cart.map(item => (
                <div key={item.id} className="co-summary-item">
                  <div className="co-summary-img-wrap">
                    <img src={item.url_imagen} alt={item.nombre} className="co-summary-img" />
                  </div>
                  <div className="co-summary-info">
                    <span className="co-summary-name">{item.nombre}</span>
                    <span className="co-summary-qty">x{item.quantity || 1}</span>
                  </div>
                  <span className="co-summary-price">${(parseFloat(item.precio) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="co-price-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="co-price-row">
                <span>Envío</span>
                <span>{shippingCost === 0 ? <strong className="co-free">Gratis 🎁</strong> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="co-price-row co-total-row"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
            </div>

            {error && <div className="co-error">⚠️ {error}</div>}

            <button
              id="checkout-next-step"
              className="co-btn-primary"
              onClick={() => {
                if (!address.trim()) return setError('Por favor, ingresa una dirección de entrega.');
                setError('');
                setStep(2);
              }}
            >
              Continuar al Pago →
            </button>
          </div>
        )}

        {/* ─── STEP 2: Selección de Método de Pago ───────────── */}
        {step === 2 && (
          <div className="co-step-content">
            <h2 className="co-section-title">💳 Método de Pago</h2>

            <div className="co-payment-grid">
              {PAYMENT_METHODS.map(m => (
                <label
                  key={m.id}
                  className={`co-payment-card ${paymentMethod === m.id ? 'active' : ''}`}
                  htmlFor={`pm-${m.id}`}
                >
                  <input
                    id={`pm-${m.id}`}
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                  />
                  <span className="co-pm-icon">{m.icon}</span>
                  <div>
                    <span className="co-pm-label">{m.label}</span>
                    <span className="co-pm-desc">{m.desc}</span>
                  </div>
                  {paymentMethod === m.id && <span className="co-pm-check">✓</span>}
                </label>
              ))}
            </div>

            {/* Formulario de tarjeta solo si el método es tarjeta */}
            {paymentMethod === 'tarjeta' && (
              <div className="co-card-form">
                <div className="co-card-visual">
                  <div className="co-card-chip">▣</div>
                  <div className="co-card-number-display">
                    {cardData.number.replace(/(.{4})/g, '$1 ').trim() || '•••• •••• •••• ••••'}
                  </div>
                  <div className="co-card-bottom">
                    <span className="co-card-holder">{cardData.name || 'NOMBRE TITULAR'}</span>
                    <span className="co-card-expiry">{cardData.expiry || 'MM/AA'}</span>
                  </div>
                </div>
                <div className="co-form-group">
                  <label htmlFor="card-number">Número de tarjeta</label>
                  <input
                    id="card-number"
                    type="text"
                    maxLength="16"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={e => setCardData(p => ({ ...p, number: e.target.value.replace(/\D/g,'') }))}
                  />
                </div>
                <div className="co-form-group">
                  <label htmlFor="card-name">Nombre en la tarjeta</label>
                  <input
                    id="card-name"
                    type="text"
                    placeholder="Como aparece en la tarjeta"
                    value={cardData.name}
                    onChange={e => setCardData(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                  />
                </div>
                <div className="co-form-row">
                  <div className="co-form-group">
                    <label htmlFor="card-expiry">Vencimiento</label>
                    <input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/AA"
                      maxLength="5"
                      value={cardData.expiry}
                      onChange={e => setCardData(p => ({ ...p, expiry: e.target.value }))}
                    />
                  </div>
                  <div className="co-form-group">
                    <label htmlFor="card-cvv">CVV</label>
                    <input
                      id="card-cvv"
                      type="password"
                      placeholder="•••"
                      maxLength="4"
                      value={cardData.cvv}
                      onChange={e => setCardData(p => ({ ...p, cvv: e.target.value.replace(/\D/,'') }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Banner Stripe/PayPal simulado */}
            {(paymentMethod === 'stripe' || paymentMethod === 'paypal') && (
              <div className="co-gateway-banner">
                <span>{paymentMethod === 'stripe' ? '⚡' : '🅿️'}</span>
                <div>
                  <strong>Serás redirigido a {paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}</strong>
                  <p>Pago 100% seguro y cifrado. (Demo — sin cobro real)</p>
                </div>
              </div>
            )}

            <div className="co-total-confirm">
              <span>Total a pagar:</span>
              <span className="co-total-amount">${finalTotal.toFixed(2)}</span>
            </div>

            {error && <div className="co-error">⚠️ {error}</div>}

            <button
              id="checkout-confirm-payment"
              className="co-btn-primary"
              onClick={handleConfirmOrder}
              disabled={loading}
            >
              {loading ? <span className="co-spinner" /> : `Pagar $${finalTotal.toFixed(2)} 🍰`}
            </button>

            <p className="co-secure-note">🔒 Tus datos están protegidos con cifrado SSL</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
