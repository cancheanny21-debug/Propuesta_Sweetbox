import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Tracking.css';

// ── Estados del pedido (simulados) ───────────────────────────────────────────
const ORDER_STATES = [
  { id: 'Confirmado',   label: 'Pedido Confirmado',      icon: '✅', desc: 'Tu pedido ha sido recibido y confirmado.' },
  { id: 'Preparando',  label: 'Preparando tu pedido',    icon: '👨‍🍳', desc: 'Nuestros pasteleros están elaborando tus postres.' },
  { id: 'En camino',   label: 'En camino',               icon: '🛵', desc: 'Tu repartidor ya está en camino.' },
  { id: 'Entregado',   label: '¡Entregado!',             icon: '🎉', desc: 'Tu pedido ha llegado. ¡Buen provecho!' },
];

const Tracking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos del pedido pasados desde Checkout via navigate
  const { orderId, metodoPago, total, direccion } = location.state || {};

  const [currentStateIdx, setCurrentStateIdx] = useState(0);
  const [mapDots, setMapDots] = useState([]);
  const [riderPos, setRiderPos] = useState({ x: 10, y: 80 });
  const [etaSeconds, setEtaSeconds] = useState(45 * 60); // 45 min en segundos
  const intervalRef = useRef(null);
  const etaRef = useRef(null);

  // ── Simulación de progreso del estado ────────────────────────────────────
  useEffect(() => {
    if (!orderId) return;

    // Avanzar estados cada ~8 segundos (demo)
    const delays = [8000, 16000, 30000];
    const timers = delays.map((delay, idx) =>
      setTimeout(() => setCurrentStateIdx(idx + 1), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [orderId]);

  // ── Simulación del repartidor en el mapa ─────────────────────────────────
  useEffect(() => {
    // Generar ruta del repartidor
    const route = [
      { x: 10, y: 80 }, { x: 20, y: 65 }, { x: 35, y: 55 },
      { x: 50, y: 48 }, { x: 62, y: 40 }, { x: 72, y: 35 },
      { x: 82, y: 30 }, { x: 88, y: 22 },
    ];
    setMapDots(route);

    let step = 0;
    intervalRef.current = setInterval(() => {
      if (step < route.length - 1) {
        step++;
        setRiderPos(route[step]);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // ── Cuenta regresiva ETA ──────────────────────────────────────────────────
  useEffect(() => {
    etaRef.current = setInterval(() => {
      setEtaSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(etaRef.current);
  }, []);

  const formatETA = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // ── Sin datos de pedido (acceso directo) ─────────────────────────────────
  if (!orderId) {
    return (
      <div className="tracking-container no-order-screen">
        <div className="tr-bg-shape s1" /><div className="tr-bg-shape s2" />
        <div className="tr-no-order-card">
          <div className="tr-no-order-icon">📦</div>
          <h2>Sin pedido activo</h2>
          <p>Realiza un pedido primero para ver el seguimiento.</p>
          <button className="tr-btn-primary" onClick={() => navigate('/catalog')}>Ir al Catálogo</button>
        </div>
      </div>
    );
  }

  const currentState = ORDER_STATES[currentStateIdx];
  const isDelivered = currentStateIdx === ORDER_STATES.length - 1;

  return (
    <div className="tracking-container">
      <div className="tr-bg-shape s1" /><div className="tr-bg-shape s2" />

      {/* Header */}
      <div className="tr-header">
        <button className="tr-back-btn" onClick={() => navigate('/catalog')}>← Catálogo</button>
        <h1 className="tr-title">Seguimiento 🛵</h1>
        <span className="tr-order-badge">#{orderId}</span>
      </div>

      {/* ── ETA Banner ───────────────────────────────────────── */}
      <div className={`tr-eta-banner ${isDelivered ? 'delivered' : ''}`}>
        <div className="tr-eta-icon">{isDelivered ? '🎉' : '⏱️'}</div>
        <div>
          <div className="tr-eta-label">{isDelivered ? '¡Tu pedido llegó!' : 'Tiempo estimado de llegada'}</div>
          <div className="tr-eta-value">{isDelivered ? '¡Entregado!' : formatETA(etaSeconds)} {!isDelivered && 'min'}</div>
        </div>
      </div>

      {/* ── Mapa animado ─────────────────────────────────────── */}
      <div className="tr-map-container">
        <div className="tr-map-label">Vista del Recorrido</div>
        <svg className="tr-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Calles del fondo */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="#e2e8f0" strokeWidth="3" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#e2e8f0" strokeWidth="3" />
          <line x1="30" y1="0"  x2="30"  y2="100" stroke="#e2e8f0" strokeWidth="3" />
          <line x1="70" y1="0"  x2="70"  y2="100" stroke="#e2e8f0" strokeWidth="3" />
          {/* Edificios de fondo */}
          <rect x="2"  y="35" width="10" height="22" rx="1" fill="#e2e8f0" />
          <rect x="15" y="33" width="12" height="24" rx="1" fill="#e2e8f0" />
          <rect x="38" y="35" width="8"  height="22" rx="1" fill="#e2e8f0" />
          <rect x="50" y="33" width="14" height="24" rx="1" fill="#e2e8f0" />
          <rect x="74" y="35" width="10" height="22" rx="1" fill="#e2e8f0" />
          {/* Ruta del repartidor */}
          <polyline
            points={mapDots.map(d => `${d.x},${d.y}`).join(' ')}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          {/* Destino: bandera */}
          <text x="84" y="18" fontSize="8" textAnchor="middle">🏁</text>
          {/* Repartidor */}
          <text
            x={riderPos.x}
            y={riderPos.y}
            fontSize="8"
            textAnchor="middle"
            className="tr-rider-icon"
          >
            🛵
          </text>
        </svg>
      </div>

      {/* ── Timeline de estados ───────────────────────────────── */}
      <div className="tr-card">
        <h2 className="tr-section-title">Estado del Pedido</h2>
        <div className="tr-timeline">
          {ORDER_STATES.map((state, idx) => (
            <div key={state.id} className={`tr-timeline-item ${idx <= currentStateIdx ? 'done' : ''} ${idx === currentStateIdx ? 'current' : ''}`}>
              <div className="tr-timeline-left">
                <div className="tr-timeline-dot">{idx <= currentStateIdx ? state.icon : '○'}</div>
                {idx < ORDER_STATES.length - 1 && (
                  <div className={`tr-timeline-line ${idx < currentStateIdx ? 'done' : ''}`} />
                )}
              </div>
              <div className="tr-timeline-body">
                <span className="tr-timeline-label">{state.label}</span>
                {idx === currentStateIdx && (
                  <span className="tr-timeline-desc">{state.desc}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detalles del pedido ───────────────────────────────── */}
      <div className="tr-card">
        <h2 className="tr-section-title">Detalles del Pedido</h2>
        <div className="tr-details-grid">
          <div className="tr-detail-item">
            <span className="tr-detail-icon">📋</span>
            <div>
              <span className="tr-detail-label">ID Pedido</span>
              <span className="tr-detail-value">#{orderId}</span>
            </div>
          </div>
          <div className="tr-detail-item">
            <span className="tr-detail-icon">💳</span>
            <div>
              <span className="tr-detail-label">Método de Pago</span>
              <span className="tr-detail-value">{metodoPago}</span>
            </div>
          </div>
          <div className="tr-detail-item">
            <span className="tr-detail-icon">💰</span>
            <div>
              <span className="tr-detail-label">Total Pagado</span>
              <span className="tr-detail-value tr-detail-total">${parseFloat(total || 0).toFixed(2)}</span>
            </div>
          </div>
          <div className="tr-detail-item tr-detail-full">
            <span className="tr-detail-icon">📍</span>
            <div>
              <span className="tr-detail-label">Dirección de Entrega</span>
              <span className="tr-detail-value">{direccion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Botón volver ─────────────────────────────────────── */}
      <button className="tr-btn-primary" onClick={() => navigate('/catalog')}>
        {isDelivered ? '¡Pedir de nuevo! 🍰' : 'Seguir comprando'}
      </button>
    </div>
  );
};

export default Tracking;
