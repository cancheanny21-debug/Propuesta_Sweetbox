import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo contra entrega');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  // Costo de envío: Gratis si la compra es de $30 o más, de lo contrario $5.00
  const shippingCost = cartTotal >= 30 ? 0 : 5.0;
  const finalTotal = cartTotal + shippingCost;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      return setError('Por favor, ingresa una dirección de envío válida.');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('sweetbox_token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación. Inicia sesión de nuevo.');
      }

      // Preparar ítems para la API del backend
      const formattedItems = cart.map(item => ({
        product_id: item.id,
        cantidad: item.quantity || 1,
        precio_unitario: parseFloat(item.precio)
      }));

      const response = await axios.post(
        'http://localhost:3000/api/orders',
        {
          total: finalTotal,
          metodo_pago: paymentMethod,
          direccion: address,
          items: formattedItems
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Guardar información del pedido exitoso
      setSuccessOrder(response.data.orderId);
      clearCart(); // Limpiar el carrito global
    } catch (err) {
      console.error('Error al crear pedido:', err);
      setError(err.response?.data?.error || 'Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de éxito tras confirmar pedido
  if (successOrder) {
    return (
      <div className="cart-container success-screen">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">¡Pedido Confirmado!</h1>
          <p className="success-subtitle">Tu dulce antojo está en camino.</p>
          
          <div className="order-details-box">
            <p><strong>ID del Pedido:</strong> #{successOrder}</p>
            <p><strong>Método de Pago:</strong> {paymentMethod}</p>
            <p><strong>Estado:</strong> Confirmado 🍰</p>
          </div>

          <button 
            className="btn-success-home"
            onClick={() => navigate('/catalog')}
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de carrito vacío
  if (cart.length === 0) {
    return (
      <div className="cart-container empty-screen">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="empty-card">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Tu carrito está vacío</h2>
          <p className="empty-subtitle">Explora nuestro catálogo y agrega tus postres favoritos.</p>
          <button 
            className="btn-empty-shop"
            onClick={() => navigate('/catalog')}
          >
            Ir al Catálogo 🍰
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Decoraciones de fondo */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <div className="cart-card">
        <h1 className="cart-page-title">Mi Carrito 🛒</h1>
        <p className="cart-page-subtitle">Revisa tus postres antes de confirmar</p>

        {error && (
          <div className="cart-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Lista de ítems */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image-wrapper">
                <img src={item.url_imagen} alt={item.nombre} className="cart-item-image" />
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.nombre}</h3>
                <p className="cart-item-price">${parseFloat(item.precio).toFixed(2)} c/u</p>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      type="button" 
                      className="btn-quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity || 1}</span>
                    <button 
                      type="button" 
                      className="btn-quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    type="button" 
                    className="btn-remove-item"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario de Checkout */}
        <form className="checkout-form" onSubmit={handleConfirmOrder}>
          <div className="form-group">
            <label htmlFor="direccion">Dirección de Entrega</label>
            <textarea
              id="direccion"
              rows="3"
              placeholder="Ingresa tu dirección exacta y referencias de entrega..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Método de Pago</label>
            <div className="payment-options">
              <label className={`payment-option-card ${paymentMethod === 'Efectivo contra entrega' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Efectivo contra entrega"
                  checked={paymentMethod === 'Efectivo contra entrega'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-option-info">
                  <span className="payment-icon">💵</span>
                  <div>
                    <span className="payment-title">Efectivo</span>
                    <span className="payment-desc">Paga al recibir</span>
                  </div>
                </div>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'Tarjeta' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Tarjeta"
                  checked={paymentMethod === 'Tarjeta'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-option-info">
                  <span className="payment-icon">💳</span>
                  <div>
                    <span className="payment-title">Tarjeta</span>
                    <span className="payment-desc">Débito o Crédito</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Desglose de Precios */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Envío:</span>
              <span>{shippingCost === 0 ? <strong className="free-shipping">Gratis</strong> : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            {shippingCost > 0 && (
              <p className="shipping-hint">💡 ¡Agrega ${ (30 - cartTotal).toFixed(2) } más para envío GRATIS!</p>
            )}
            <div className="price-row total-row">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-confirm-order"
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Confirmar Pedido 🍰'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
