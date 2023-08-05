import React, { useState, useEffect } from 'react';
import database from '../firebase/config';
import { ref, get } from 'firebase/database';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const GetImages = () => {
    const parameter_documentId = window.location.search;
    const url_params = new URLSearchParams(parameter_documentId)
    const  documentId =  url_params.get('id')
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesUrlRef = ref(database, 'restaurants/' + 'undefined/' + documentId + '/imagesBucketURL');
        const imagesUrlsSnapshot = await get(imagesUrlRef);
        const imagesUrls = imagesUrlsSnapshot.val();
        setImagesUrls(imagesUrls);
      } catch (error) {
        console.error("Error fetching images URLs:", error);
        setImagesUrls([]);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    {/* Ad space */}
    <div style={{ height: '20vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

    </div>
      {imagesUrls.length > 0 && (
        <div style={{ height: '60vh', width: '100%', position: 'relative' }}>
          <Carousel           
            showArrows={false}
            showStatus={false}
            showIndicators={true}
            showBullets={true}
            showThumbs={false}
            emulateTouch
            infiniteLoop={false}
            autoPlay={false}
            interval={3000}
            transitionTime={500}
            lazyLoad={false}
            showNav={true}
            showThumbnails={true}
          >
            {imagesUrls.map((imageUrl, index) => (
              <div key={index} style={{ height: '100%', width: '100%' }}>
                <img
                  src={imageUrl}
                  alt={`Image ${index}`}
                  style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      
      <div style={{ height: '15vh', width: '100%', position: 'relative' }}>
      {/* This empty space will take up 15% of the screen */}
    </div>

    <div style={{ height: '10vh', width: '100%', position: 'relative', backgroundColor: '#00A67D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>
      {/* Text with green background */}
      *prices may vary, website not handled by restaurant
    </div>
  </div>
);
};

export default GetImages;