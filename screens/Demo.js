import React, { useEffect, useState } from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import { RotateSpinner } from 'react-spinners-kit';
import Ad from '../Ad';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

function Demo() {
  const [isLoading, setIsLoading] = useState(true);
  const [demoImagesUrls, setDemoImagesUrls] = useState([]);

  useEffect(() => {
    const fetchDemoImages = async () => {
      try {
        const demoImagesRef = doc(firestore, 'restaurants', 'Zrqy1xZbA0oJ71ikeTVL');
        const demoImagesSnapshot = await getDoc(demoImagesRef);

        if (demoImagesSnapshot.exists()) {
          const demoImagesData = demoImagesSnapshot.data();
          const demoImagesUrls = demoImagesData.imagesBucketURL || [];
          setDemoImagesUrls(demoImagesUrls);
        } else {
          console.log('No demo images found for this restaurant.');
        }
      } catch (error) {
        console.error('Error fetching demo images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemoImages();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <RotateSpinner size={60} color="#ffffff" loading={true} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'fixed' }}>
      {/* Div 1: Displaying message */}
      <div style={{ height: '4vh', textAlign: 'center', marginTop: '0vh' }}>
        <div style={{ backgroundColor: '#333333', fontWeight: '300', color: '#FFFFFF', padding: '3px 0', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <div className="left-arrow" style={{ marginLeft: '20px' }}>
            <Link to="/">
              <img src={require('../assets/left_arrow.svg')} alt="Back" style={{ width: '20px', height: '20px', fill: '#fff' }} />
            </Link>
          </div>
          <span style={{ flex: 1 }}>This is a Demo Page</span>
        </div>
      </div>

      {/* Div 2: Carousel */}
      <div className="carousel-container" style={{ height: '65vh', position: 'relative', textAlign: 'center', marginTop: '1vh', zIndex: 0 }}>
        <ZoomSlider
          slides={demoImagesUrls.map((imageUrl) => (
            <div key={imageUrl} className="image-container" style={{ ...slideStyle, width: '100%' }}>
              <img
                src={imageUrl}
                alt="Slide"
                style={{
                  maxWidth: '100vw',
                  objectFit: 'cover',
                  maxHeight: '75vh',
                }}
              />
            </div>
          ))}
          initialSlide={0}
          maxScale={3}
          minScale={1}
          slideIndicatorTimeout={5000}
          activeDotColor="#ffffff"
          dotColor="#292d2c"
        />
      </div>

      {/* Div 3: Ads */}
      <div style={adContainerStyle}>
       
      </div>
    </div>
  );
}

const slideStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const adContainerStyle = {
  position: 'fixed',
  top: 'auto',
  bottom: -30,
  left: 0,
  marginTop: '2vh',
  marginBottom: '0vh',
  width: '100%',
  height: '20vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  zIndex: -1,
};

export default Demo;
