import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Costo de envío: Gratis si la compra es de $30 o más, de lo contrario $5.00
  const shippingCost = cartTotal >= 30 ? 0 : 5.0;
  const finalTotal = cartTotal + shippingCost;

  // Pantalla de carrito vacío
  if (cart.length === 0) {
    return (
      <div className="cart-container empty-screen">
        <div className="bg-shape shape-1" />
        <div className="bg-shape shape-2" />
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
      <div className="bg-shape shape-1" />
      <div className="bg-shape shape-2" />

      <div className="cart-card">
        <h1 className="cart-page-title">Mi Carrito 🛒</h1>
        <p className="cart-page-subtitle">Revisa tus postres antes de continuar al pago</p>

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

        {/* Desglose de Precios */}
        <div className="price-breakdown">
          <div className="price-row">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Envío:</span>
            <span>{shippingCost === 0 ? <strong className="free-shipping">Gratis 🎁</strong> : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          {shippingCost > 0 && (
            <p className="shipping-hint">💡 ¡Agrega ${ (30 - cartTotal).toFixed(2) } más para envío GRATIS!</p>
          )}
          <div className="price-row total-row">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón ir a Checkout */}
        <button
          id="cart-go-to-checkout"
          className="btn-confirm-order"
          onClick={() => navigate('/checkout')}
        >
          Continuar al Pago 🔒
        </button>
      </div>
    </div>
  );
};

export default Cart;
