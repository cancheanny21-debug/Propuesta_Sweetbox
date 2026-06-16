import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
            <h2 style={{ color: '#333', marginBottom: '15px' }}>Editar Perfil</h2>
            <p style={{ color: '#666', fontSize: '1.1em' }}>Esta es la página para editar el perfil del usuario.</p>
            <p style={{ color: '#888', fontSize: '0.9em', marginTop: '10px' }}>Funcionalidad en desarrollo (Sprint 6).</p>
            <button onClick={() => navigate('/profile')} style={{ marginTop: '30px', padding: '12px 25px', backgroundColor: '#00C896', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1em', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                Volver al Perfil
            </button>
        </div>
    );
};

export default ProfileEdit;