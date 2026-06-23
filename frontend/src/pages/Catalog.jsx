import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Catalog.css';

// ─── Configuración visual por categoría ────────────────────────────────────
const CATEGORY_CONFIG = {
  'Magdalenas': { icon: '🧁', bg: 'linear-gradient(135deg,#ff9a9e,#fad0c4)' },
  'Cupcakes':   { icon: '🧁', bg: 'linear-gradient(135deg,#ff9a9e,#fad0c4)' },
  'Pasteles':   { icon: '🎂', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  'Galletas':   { icon: '🍪', bg: 'linear-gradient(135deg,#f6d365,#fda085)' },
  'Donas':      { icon: '🥩', bg: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  'Brownies':   { icon: '🍫', bg: 'linear-gradient(135deg,#c0714b,#7a3b1e)' },
  'Macarons':   { icon: '🌈', bg: 'linear-gradient(135deg,#84fab0,#8fd3f4)' },
};
const DEFAULT_CFG = { icon: '🍬', bg: 'linear-gradient(135deg,#cfd9df,#e2ebf0)' };
const getCatCfg = (nombre) => CATEGORY_CONFIG[nombre] || DEFAULT_CFG;

const Catalog = () => {
  const [allProducts, setAllProducts]       = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // null = Todos
  const [searchQuery, setSearchQuery]       = useState('');
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);
  const [addedMap, setAddedMap]             = useState({});
  const [gridKey, setGridKey]               = useState(0);
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef  = useRef(null);

  const token   = localStorage.getItem('sweetbox_token');
  const headers = { Authorization: `Bearer ${token}` };

  // ── Cargar todos los productos ───────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/api/products', { headers })
      .then(res => {
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos.');
        setLoading(false);
      });
  }, []);

  // ── Derivar categorías únicas directamente de los productos ──────────────
  // Así no dependemos de una segunda llamada a la API
  const categories = React.useMemo(() => {
    const seen = new Map();
    allProducts.forEach(p => {
      if (p.categoria_id && p.categoria_nombre && !seen.has(p.categoria_id)) {
        seen.set(Number(p.categoria_id), {
          id: Number(p.categoria_id),
          nombre: p.categoria_nombre,
        });
      }
    });
    // Ordenar por id para que siempre salgan en el mismo orden
    return Array.from(seen.values()).sort((a, b) => a.id - b.id);
  }, [allProducts]);

  // ── Leer ?categoria= de la URL para pre-seleccionar ─────────────────────
  useEffect(() => {
    if (categories.length === 0) return;
    const params  = new URLSearchParams(location.search);
    const catName = params.get('categoria');
    const catId   = params.get('categoria_id');
    if (catId) {
      const found = categories.find(c => c.id === Number(catId));
      if (found) setActiveCategory(found.id);
    } else if (catName) {
      const found = categories.find(
        c => c.nombre.toLowerCase() === catName.toLowerCase()
      );
      if (found) setActiveCategory(found.id);
    }
    if (location.state?.categoriaId) {
      setActiveCategory(Number(location.state.categoriaId));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [categories, location.search, location.state]);

  // ── Filtrado: categoría + búsqueda ───────────────────────────────────────
  const filteredProducts = allProducts.filter(p => {
    const matchCat    = activeCategory === null || Number(p.categoria_id) === activeCategory;
    const matchSearch = searchQuery === '' ||
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.ingredientes || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── Cambiar categoría (toggle: clic en la activa = deseleccionar) ─────────
  const handleCategoryChange = (catId) => {
    // Si ya está activa, la deselecciona y muestra todos
    const next = activeCategory === catId ? null : catId;
    setActiveCategory(next);
    setSearchQuery('');
    setGridKey(k => k + 1);
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  // ── Añadir al carrito ────────────────────────────────────────────────────
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [product.id]: false })), 1200);
  };

  // ── Render estrellas ─────────────────────────────────────────────────────
  const renderStars = (rating) => {
    const full  = Math.floor(rating);
    const half  = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  // ── Datos de categoría activa ────────────────────────────────────────────
  const activeCat     = categories.find(c => c.id === activeCategory) || null;
  const activeCatName = activeCat?.nombre || null;
  const activeCatCfg  = activeCat ? getCatCfg(activeCat.nombre) : null;

  // Contar productos por categoría
  const countByCat = (catId) =>
    allProducts.filter(p => Number(p.categoria_id) === catId).length;

  return (
    <div className="catalog-container">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="catalog-header">
        <h1 className="catalog-title">
          {activeCatName
            ? <>{activeCatCfg?.icon} {activeCatName}</>
            : <>Nuestro Catálogo ✨</>}
        </h1>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="catalog-search"
            type="text"
            placeholder="Buscar tu postre ideal..."
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >✕</button>
          )}
        </div>
      </header>

      {/* ── Tarjetas de Categoría (sin botón "Todos") ───────────── */}
      {!loading && (
        <nav className="category-cards-row" aria-label="Filtrar por categoría">
          {categories.map(cat => {
            const cfg      = getCatCfg(cat.nombre);
            const isActive = activeCategory === cat.id;
            const count    = countByCat(cat.id);
            return (
              <button
                key={cat.id}
                id={`cat-card-${cat.id}`}
                className={`cat-card ${isActive ? 'cat-card--active' : ''}`}
                style={isActive ? { background: cfg.bg } : {}}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className="cat-card__icon">{cfg.icon}</span>
                <span className="cat-card__label">{cat.nombre}</span>
                <span className="cat-card__count">{count}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* ── Info de filtro activo ────────────────────────────────── */}
      {(activeCategory !== null || searchQuery) && !loading && (
        <div className="catalog-filter-info">
          {searchQuery
            ? `🔎 "${searchQuery}" — ${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''}`
            : `${activeCatCfg?.icon || ''} ${activeCatName} — ${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''}`}
        </div>
      )}

      {/* ── Estado: Cargando ─────────────────────────────────────── */}
      {loading && (
        <div className="catalog-state-screen">
          <div className="catalog-spinner" />
          <p>Cargando deliciosos postres...</p>
        </div>
      )}

      {/* ── Estado: Error ────────────────────────────────────────── */}
      {!loading && error && (
        <div className="catalog-state-screen error">
          <span className="catalog-state-icon">⚠️</span>
          <p>{error}</p>
          <button className="btn-retry" onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      )}

      {/* ── Estado: Sin resultados ───────────────────────────────── */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="catalog-state-screen">
          <span className="catalog-state-icon">🍰</span>
          <p>No hay productos en esta categoría aún.</p>
          <button className="btn-retry" onClick={() => handleCategoryChange(null)}>Ver todos</button>
        </div>
      )}

      {/* ── Grid de productos ────────────────────────────────────── */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div key={gridKey} ref={gridRef} className="product-grid">
          {filteredProducts.map(product => {
            const pCfg = getCatCfg(product.categoria_nombre);
            return (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={product.url_imagen}
                    alt={product.nombre}
                    className="product-image"
                    loading="lazy"
                  />
                  <button className="favorite-button" aria-label="Añadir a favoritos">❤️</button>
                  <div className="product-category-badge">
                    {pCfg.icon} {product.categoria_nombre}
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nombre}</h3>
                  <div className="product-rating">
                    <span className="stars">{renderStars(product.rating)}</span>
                    <span className="rating-val">({product.rating})</span>
                  </div>
                  {product.ingredientes && (
                    <p className="product-ingredients">🌿 {product.ingredientes}</p>
                  )}
                  <div className="product-footer">
                    <p className="product-price">${parseFloat(product.precio).toFixed(2)}</p>
                    <button
                      id={`add-cart-${product.id}`}
                      className={`btn-add-to-cart ${addedMap[product.id] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedMap[product.id] ? '✓ Agregado' : '+ Carrito'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Catalog;