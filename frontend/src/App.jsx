import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Catalog from './pages/Catalog';
import BottomNav from './components/BottomNav';

function App() {
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <Router>
      <div className="app-container" style={{ paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </Router>
  );
}

export default App;
