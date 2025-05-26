import React, { useEffect, useRef, useState } from 'react';
import './Pop.css';

const Pop = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (!checkboxChecked) {
      setError('Please agree to the Terms and Conditions.');
    } else if (!hasScrolledToBottom) {
      setError('Please scroll to the bottom of the Terms and Conditions.');
    } else {
      setError('');
      setShowPopup(false);
    }
  };

  const closePopup = () => {
    if (!checkboxChecked) {
        setError('Please agree to the Terms and Conditions.');
        return;
        }
    if (!hasScrolledToBottom) {
        setError('Please scroll to the bottom of the Terms and Conditions.');
        return;
        }
    setError('');

    setShowPopup
    (false);
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <span className="close-btn" onClick={closePopup}>&times;</span>
          <h2>Welcome to Indian Culture</h2>
          <p>Please read the Terms and Conditions below to continue.</p>

          <div
            className="terms-box"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <p>
              <strong>Terms and Conditions</strong><br /><br />
              Welcome to our website. By accessing this site, you agree to the following terms and conditions. Please read them carefully.
              <br /><br />
              1. You must not misuse the website.<br />
              2. You agree not to duplicate, copy, or exploit content for commercial use without permission.<br />
              3. Content provided is for general information only and subject to change.<br />
              4. All trademarks are acknowledged to the respective owners.<br />
              5. We may update these terms without notice.<br />
              <br /><br />
              By scrolling and accepting, you agree to comply with all terms stated above.
            </p>
          </div>

          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />{' '}
              I agree to the Terms and Conditions
            </label>
          </div>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <button onClick={handleAccept}>I Understand</button>
        </div>
      </div>
    )
  );
};

export default Pop;
