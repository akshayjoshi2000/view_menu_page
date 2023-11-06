import React, { useState, useEffect } from 'react';
import './Home.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleScroll = () => {
    const yPos = window.scrollY;
    setScrollPosition(yPos);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768; // Adjust the breakpoint as needed

  return (
    <div className="home-page">

      {/* Header */}
      <header className={`header ${isMobile ? 'mobile' : ''}`}>
        <div className="logo">
          <img src={require('./assets/logo.png')} alt="Logo" />
        </div>

        {/* Full navigation */}
        {!isMobile && (
          <nav className="navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/demo">View Demo</a></li>
              <li><a href="http://blog.scanformenu.online/">Blogs</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="http://upload.scanformenu.online/">Login</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobile && (
        <Menu right width={'100%'} customBurgerIcon={<img src={require('./assets/menu_icon.svg')} alt="Menu" />}>
          <a href="/">Home</a>
          <a href="/demo">View Demo</a>
          <li><a href="http://blog.scanformenu.online/">Blogs</a></li>
          <a href="contact">Contact Us</a>
          <a href="/about">About Us</a>
          <li><a href="http://upload.scanformenu.online/">Login</a></li>
        </Menu>
      )}

      {/* Banner */}
      <div className="banner-container">
        <img
          src={require('./assets/banner.jpg')}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <h1 className="banner-heading">Elevate Your Dining Experience</h1>
        <div className="contact-button">
          <Link to="/contact">
            <button className="contact-button-inner">Book A Demo</button>
          </Link>
        </div>

      </div>


      {/* Introduction */}
      <div className="introduction">
        <p className="introduction-text">
          Transform your dining experience with our modern menu solutions. Enjoy the convenience of digital menus while savoring the finest quality dishes. Welcome to the future of dining.
        </p>
      </div>

      <section className="about-us-container">
        <div className="about-us-section">
          <h2 className="about-us-heading">Who We Are</h2>
          <p className="about-us-text">
            ScanForMenu is a revolutionary digital dining platform that makes it easy to access, navigate, and personalize restaurant menus.
            Simply scan the QR code on a restaurant menu with your smartphone to instantly view the menu on your device.
            You can then easily browse the menu.ScanForMenu saves you time by avoiding long lines at the register.
            Join the future of dining today and sign up for ScanForMenu! With ScanForMenu, you can enjoy the convenience and flexibility of digital menus.
          </p>
        </div>

        <div className="image-collage">
          {/* Add your collage images here */}
          <img src="https://img.freepik.com/free-vector/qr-code-scanning-concept-with-characters_23-2148632362.jpg" alt="Image 1" />
          {/* Add more images as needed */}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-image-content">
          <img src="https://img.freepik.com/free-vector/characters-using-mobile-payment-system-with-scan-qr-code-online-shopping-concept_90220-479.jpg" alt="Empowering Restaurants" className="benefits-image" />
        </div>
        <div className="benefits-text-container">
          <h2 className="benefits-heading">Empowering Restaurants</h2>
          <p className="benefits-text">
            Strengthening Restaurant Operations and Growth
            Restaurants stand to gain numerous advantages through ScanForMenu's innovative approach.
            Streamlined Efficiency: Simplify ordering, reduce wait times, and enhance table turnover, leading to increased operational efficiency.
            Cost-Effective Solutions: Bid farewell to printing and maintaining physical menus. Save on paper, printing, and labor expenses.
            Hygienic Environment: Minimize physical contact between staff and patrons, creating a safer, more sanitary dining setting.
            Tailored Dining Experience: Offer personalized recommendations, elevating the dining experience and fostering loyalty.
            Experience the Future: ScanForMenu empowers restaurants with technology that drives growth, cost savings, and safety.
          </p>
        </div>
      </section>


      <section className="why-us-section">
        <div className="why-us-text-container">
          <h2 className="why-us-heading">Why ScanForMenu?</h2>
          <p className="why-us-text">
            Enhancing Dining Through Safety and Convenience
            In a world shaped by technology, we're redefining dining experiences. ScanForMenu is on a mission to make menus safer and more convenient.
            Safety First: In the wake of the pandemic, hygiene matters more than ever. Our solution eliminates physical menus, reducing contact and ensuring a safer dining environment.
            Modern Convenience: Say goodbye to waiting for menus. With ScanForMenu, a simple QR code scan on your smartphone gives you instant access to the menu, right at your fingertips.
            Personalized Choices: Navigate through dishes, prices, and dietary preferences seamlessly. Find options tailored to your taste and preferences effortlessly.
            Embracing Change: Join us in ushering in a new era of dining where technology ensures safety, convenience, and an exceptional culinary journey.
            Elevate Your Experience: From hygiene to convenience, ScanForMenu is here to transform the way you dine, making it safer, faster, and tailored to you.
          </p>
        </div>
        <div className="why-us-image-content">
          <img src="https://img.freepik.com/free-vector/qr-code-scanning-illustration-with-characters_23-2148617088.jpg" alt="Why ScanForMenu" className="why-us-image" />
        </div>
      </section>

      <section className="nearest-restaurants-section">
        <div className="nearest-restaurants-image-content">
          <img src="https://img.freepik.com/free-vector/qr-code-concept-illustration_114360-5583.jpg" alt="Nearest Restaurants" className="nearest-restaurants-image" />
        </div>
        <div className="nearest-restaurants-text-container">
          <h2 className="nearest-restaurants-heading">Scan at Your Nearest Restaurants</h2>
          <p className="nearest-restaurants-text">
            Experience the convenience of scanning QR codes at your favorite local restaurants. Whether you're dining in or taking out, our digital menu system makes it easy to explore menu items, place orders, and enjoy a seamless dining experience.
          </p>
        </div>
      </section>






      {/* ... other sections ... */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div>&copy; ScanForMenu.online. All Rights Reserved.</div>
            <div className="footer-text">
              Built with <span className="heart-emoji">❤️</span>.{' '}
              <Link to="/privacy" className="privacy-link">Privacy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <a href="https://www.instagram.com/scanformenu.online/" target="_blank" rel="noopener noreferrer">
              <img src={require('./assets/Instagram_Glyph_Gradient1.png')} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
