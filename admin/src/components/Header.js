import React from 'react';

const Header = () => {
    return (
        <div style={{
            backgroundColor: 'black',
            color: 'white',
            height: '65px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '20px',
            paddingRight: '20px',
        }}>
            <span>CINEMAGIC</span>
            <button style={{
                backgroundColor: '#f0f0f0',
                color: 'black',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
            }}>
                Log Out
            </button>
        </div>
    );
};

export default Header;
