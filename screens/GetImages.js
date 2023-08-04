import React, { useState, useEffect } from 'react';
import database from '../firebase/config';
import { ref, get } from 'firebase/database';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const documentId = '-NahQvFwvx4LVvwSmC65';

const GetImages = () => {
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesUrlRef = ref(database, 'restaurants/' + 'undefined/' + documentId + '/imagesBucketURL');
        const imagesUrlsSnapshot = await get(imagesUrlRef);
        const imagesUrls = imagesUrlsSnapshot.val();
        console.log("image url array:", imagesUrls);
        setImagesUrls(imagesUrls);
      } catch (error) {
        console.error("Error fetching images URLs:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {imagesUrls.length > 0 && (
        <div style={{ height: '80vh', width: '100%', position: 'relative', marginTop:'15vh' }}>
          <Carousel
            zoom={true}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showBullets={true}
            showThumbs={false}
            emulateTouch
            infiniteLoop={false}
            autoPlay={false}
            interval={3000}
            transitionTime={500}
            lazyLoad={true}
            showNav={true}
            showThumbnails={true}
          >
            {imagesUrls.map((imageUrl, index) => (
              <div key={index} style={{ height: '100%', width: '100%' }}>
                <img
                  src={imageUrl}
                  alt={`Image ${index}`}
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <h5>*prices may vary, Not handled by restauraunt</h5>
    </div>
  );
};

export default GetImages;
