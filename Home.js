import React, { useState, useEffect } from 'react';
import './Home.css'; // Import your custom CSS file for styling
import qr_image from './assets/qr_image.png';


function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const yPos = window.scrollY;
    setScrollPosition(yPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero section with background image */}
      <section
        className="hero"
        style={{
          width: '100vw',
          backgroundImage: 'url("https://img.freepik.com/free-photo/tasty-homemade-traditional-pizza-italian-recipe_24972-2141.jpg?w=1060&t=st=1691498438~exp=1691499038~hmac=2f5b2613457ad222e13cc9e356665931775168fdf94a9707695415923a955588")',
          transform: `translateY(${scrollPosition / 2}px)`,
          objectFit:'cover',
        }}
        
      ></section>

      {/* QR Code overlay section */}
      <section className="qr-code-overlay-section">
        <div
          className="qr-code-overlay-image"
          style={{
            transform: `translateY(${scrollPosition / 2}px)`,
            width: '100vw',
            position: 'absolute',
            top: '0vh',
            left: 0,
            textAlign: 'center',
            zIndex: 2,
           // transition: 'transform 0.3s ease-out',
          }}
        >
          <img
            src={qr_image}
            alt="QR Code"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
