
import React from 'react';

export default function LoginSignup({ onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#0b111d', padding: '40px', borderRadius: '16px',
        boxShadow: '0 0 15px #1c2b3a', color: '#66d9ef', position: 'relative',
        maxWidth: '400px', width: '100%'
      }}>
        <button style={{
          position: 'absolute', top: '10px', right: '15px',
          background: 'transparent', border: 'none', fontSize: '24px',
          color: '#66d9ef', cursor: 'pointer'
        }} onClick={onClose}>×</button>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login / Signup</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required style={inputStyle} />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required style={inputStyle} />
          <button type="submit" style={{
            width: '100%', padding: '12px', marginTop: '15px',
            fontWeight: 'bold', border: '1px solid #66d9ef',
            borderRadius: '10px', backgroundColor: 'transparent',
            color: '#66d9ef', cursor: 'pointer'
          }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 15px', marginBottom: '20px',
  border: '1px solid #1e2d3d', borderRadius: '8px',
  backgroundColor: '#0d1424', color: '#d0e7ff'
};
