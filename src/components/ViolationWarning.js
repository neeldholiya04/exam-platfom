import React from 'react';

const ViolationWarning = ({ onClose }) => {
  return (
    <div className="violation-warning">
      <h2>Violation Warning</h2>
      <p>You have attempted to exit full-screen mode. This is your first warning.</p>
      <p>If you attempt to exit full-screen mode again, your exam will be terminated.</p>
      <button onClick={onClose}>Acknowledge</button>
    </div>
  );
};

export default ViolationWarning;
