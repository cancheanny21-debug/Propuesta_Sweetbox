import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.css';

const Catalog = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Opciones de personalización elegidas en el detalle
  const [chosenSabor, setChosenSabor] = useState('');
  const [chosenRelleno, setChosenRelleno] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  
  const categories = ['Todos', 'Cupcakes', 'Pasteles', 'Galletas', 'Brownies'];

  // Cargar productos con filtros
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const data = await productService.getAllProducts(activeCategory, searchQuery);
        setProducts(data);
      } catch (err) {
        console.error("Error cargando postres:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce para la barra de búsqueda

    return () => clearTimeout(delayDebounce);
  }, [activeCategory, searchQuery]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Inicializar personalizaciones por defecto
    const sabores = product.opciones?.filter(o => o.tipo === 'sabor') || [];
    const rellenos = product.opciones?.filter(o => o.tipo === 'relleno') || [];
    setChosenSabor(sabores[0]?.valor || '');
    setChosenRelleno(rellenos[0]?.valor || '');
    setCustomMessage('');
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    // Aquí integraremos el carrito en el Sprint 3
    alert(`¡Agregado al Carrito!\nProducto: ${selectedProduct.nombre}\nSabor: ${chosenSabor || 'N/A'}\nRelleno: ${chosenRelleno || 'N/A'}\nMensaje: ${customMessage || 'Sin mensaje'}`);
    setSelectedProduct(null);
  };

  return (
    <div className="catalog-app-container">
      {/* Encabezado con gradiente y Buscador */}
      <div className="catalog-header-gradient">
        <div className="header-top-row">
          <span className="brand-name-small">SweetBox</span>
          <button className="small-logout-btn" onClick={logout} title="Cerrar Sesión">
            🚪
          </button>
        </div>

        <div className="search-bar-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar tu postre ideal..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-options-btn">⚡</button>
        </div>
      </div>

      {/* Chips de Categorías */}
      <div className="categories-scroll">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'Todos' && '🍪 Todos'}
            {cat === 'Cupcakes' && '🧁 Cupcakes'}
            {cat === 'Pasteles' && '🎂 Pasteles'}
            {cat === 'Galletas' && '🍪 Galletas'}
            {cat === 'Brownies' && '🍫 Brownies'}
          </button>
        ))}
      </div>

      {/* Sub-filtros avanzados */}
      <div className="sub-filters-row">
        <select className="filter-dropdown" defaultValue="filtres">
          <option value="filtres">Filtres</option>
        </select>
        <select className="filter-dropdown" defaultValue="ocasion">
          <option value="ocasion">Ocasión</option>
        </select>
        <select className="filter-dropdown" defaultValue="precio">
          <option value="precio">Precio</option>
        </select>
      </div>

      {/* Grid de Productos */}
      <div className="products-grid-section">
        {loadingProducts ? (
          <div className="loading-spinner">Cargando delicias... 🍰</div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No encontramos postres que coincidan. 🔍</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle y Personalización (Oportunidad de mejora implementada) */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={handleCloseModal}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            
            <div className="modal-scroll-area">
              <img 
                src={selectedProduct.imagen_url} 
                alt={selectedProduct.nombre} 
                className="modal-image"
              />
              
              <div className="modal-info-panel">
                <h3 className="modal-product-name">{selectedProduct.nombre}</h3>
                <p className="modal-product-desc">{selectedProduct.descripcion}</p>
                <div className="modal-product-price">${parseFloat(selectedProduct.precio).toFixed(2)}</div>

                {/* Selección de Sabores */}
                {selectedProduct.opciones?.some(o => o.tipo === 'sabor') && (
                  <div className="custom-section">
                    <h4>Elige el Sabor:</h4>
                    <div className="options-selector-row">
                      {selectedProduct.opciones
                        .filter(o => o.tipo === 'sabor')
                        .map(o => (
                          <button
                            key={o.id}
                            className={`option-choice-btn ${chosenSabor === o.valor ? 'active' : ''}`}
                            onClick={() => setChosenSabor(o.valor)}
                          >
                            {o.valor}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Selección de Relleno */}
                {selectedProduct.opciones?.some(o => o.tipo === 'relleno') && (
                  <div className="custom-section">
                    <h4>Elige el Relleno:</h4>
                    <div className="options-selector-row">
                      {selectedProduct.opciones
                        .filter(o => o.tipo === 'relleno')
                        .map(o => (
                          <button
                            key={o.id}
                            className={`option-choice-btn ${chosenRelleno === o.valor ? 'active' : ''}`}
                            onClick={() => setChosenRelleno(o.valor)}
                          >
                            {o.valor}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Mensaje Personalizado */}
                <div className="custom-section">
                  <h4>Mensaje en el postre (opcional):</h4>
                  <input 
                    type="text" 
                    placeholder="Ej. ¡Feliz Día!" 
                    className="modal-text-input"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary modal-action-btn" onClick={handleAddToCart}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      )}

      {/* Barra de Navegación Inferior Móvil (Mockup) */}
      <div className="bottom-nav-bar">
        <button className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">⭐</span>
          <span className="nav-label">Favoritos</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">🛒</span>
          <span className="nav-label">Carrito</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default Catalog;
