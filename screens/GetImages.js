import React, { useEffect, useState } from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import database from '../firebase/config';
import { ref, get } from 'firebase/database';

function GetImages() {
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const parameter_documentId = window.location.search;
        const url_params = new URLSearchParams(parameter_documentId);
        const documentId = url_params.get('id');
        const imagesUrlRef = ref(database, 'restaurants/' + 'undefined/' + documentId + '/imagesBucketURL');
        const imagesUrlsSnapshot = await get(imagesUrlRef);
        const imagesUrls = imagesUrlsSnapshot.val();
        setImagesUrls(imagesUrls || []);
      } catch (error) {
        console.error("Error fetching images URLs:", error);
        setImagesUrls([]);
      }
    };

    fetchImages();
  }, []);

  const slides = imagesUrls.map((imageUrl, index) => (
    <div key={index} style={{ ...slideStyle, width: `calc(100% / ${imagesUrls.length})` }}>
      <img src={imageUrl} alt={`Image ${index + 1}`} style={imageStyle} />
    </div>
  ));

  return (
    <>
      <style>
        {`
          body, html {
            height: 100%;
            overflow: hidden;
          }

          header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #fff; /* Replace with your header background color */
            z-index: 100; /* Set a higher z-index to ensure it's above other elements */
          }

          .content-container {
            height: 100vh;
            overflow: hidden;
          }
        `}
      </style>
   
  <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor:'#cacecd' }}>
  {/* Div 1: Displaying message */}
  <div style={{ height: '8vh%', backgroundColor: '#cacecd', textAlign: 'center' , marginTop: '2vh'}}>
    <p style={{ lineHeight: '100%', margin: '0', paddingTop: '1%', fontSize: '14px' , backgroundColor: '#00A67D', fontWeight: 'bold' }}>
      Prices may vary. Not handled by restaurant 10%
    </p>
  </div>

  {/* Div 2: Carousel */}
  <div style={{ height: '65%', position: 'relative', backgroundColor: '#cacecd', textAlign: 'center', marginTop: '4vh'}}>
    <ZoomSlider
      slides={imagesUrls.map((imageUrl) => (
        <div key={imageUrl}>
          <img
            src={imageUrl}
            alt="Slide"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
      initialSlide={0}
      maxScale={3}
      minScale={1}
      //slideOverlay={null}
      slideIndicatorTimeout={5000}
      activeDotColor="#292d2c"
      dotColor="#545958"
    />
  </div>
  </div>

  

  {/* Div 3: Ads */}
  <div>
    <div style={{ height: '25%' }}>
            {/*add ads here*/}
      </div>
</div>

  </>
  );



  
}

// CSS Styles
const containerStyle = {
  height: '60vh',
  overflow: 'hidden',
};

const slideStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const imageStyle = {
  objectFit: 'contain',
  maxWidth: '100%',
  maxHeight: '100%',
};

export default GetImages;
