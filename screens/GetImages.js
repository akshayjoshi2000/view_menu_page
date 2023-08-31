import React, { useEffect, useState  } from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import {database, analytics} from '../firebase/config';
import { ref, get } from 'firebase/database';
import { RotateSpinner } from 'react-spinners-kit';
import Ad from '../Ad';
import { Link } from 'react-router-dom';

function GetImages() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [demoimagesUrls, setDemoImagesUrls] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (scrolled) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    }
  }, [scrolled]);

  
  const fetchImages = async (documentId) => {
    const imagesUrlRef = ref(database, `restaurants/undefined/${documentId}/imagesBucketURL`);
    const imagesUrlsSnapshot = await get(imagesUrlRef);
    const imagesUrls = imagesUrlsSnapshot.val();
    return imagesUrls || [];
  };

  const fetchDemoImages = async () => {
    const demoimagesUrlRef = ref(database, 'restaurants/undefined/-NbRCtowU3eu-NMQEDCU/imagesBucketURL');
    const demoimagesUrlsSnapshot = await get(demoimagesUrlRef);
    const demoimagesUrls = demoimagesUrlsSnapshot.val();
    return demoimagesUrls || [];
  };

  useEffect(() => {
    const parameter_documentId = window.location.search;
    const url_params = new URLSearchParams(parameter_documentId);
    const documentId = url_params.get('id');

    const fetchData = async () => {
      try {
        const images = await fetchImages(documentId);
        const demoImages = await fetchDemoImages();
        setImagesUrls(images);
        setDemoImagesUrls(demoImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <RotateSpinner size={60} color="#ffffff;" loading={true} />
      </div>
    );
  }
  
  if (imagesUrls.length === 0) {
    return (
      
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column'  }}>
      {/* Div 1: Displaying message */}
      <div style={{ height: '8vh%', textAlign: 'center' , marginTop: '0vh'}}>
      <div style={{ backgroundColor: '#333333', fontWeight: 'bold', color: '#FFFFFF', display: 'flex', alignItems: 'center', padding: '1% 0', textAlign: 'center' }}>
          <div className="left-arrow" style={{ marginLeft: '20px' }}>
            <Link to="/">
              <img src={require('../assets/left_arrow.svg')} alt="Back" style={{ width: '20px', height: '20px',fill: '#fff' }} />
            </Link>
          </div>
          <span style={{ flex: 1 }}>This is a Demo Page</span>
        </div>     
      </div>
    
      {/* Div 2: Carousel */}
      <div className="carousel-container" style={{ height: '65vh', position: 'relative', textAlign: 'center', marginTop: '1vh', zIndex: 0}}>
      <ZoomSlider
                  slides={demoimagesUrls.map((imageUrl) => (
                    <div key={imageUrl} className="image-container">
                      <img
                        src={imageUrl}
                        alt="Slide"
                        style={{
                          maxWidth: '80vh',
                          objectFit: 'cover',
                          maxWidth: '100%',
                          maxHeight: '90%',
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
      
      {/* Div 3: Ads */}
      <div style={adContainerStyle}>
                <Ad />
            </div>
      </div>  
    );
  
     }

    return (

        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column'  }}>
      {/* Div 1: Displaying message */}
      <div style={{ height: '8vh%', textAlign: 'center' , marginTop: '0vh'}}>
        <p style={{ lineHeight: '110%', margin: '0', paddingTop: '1%', paddingBottom: '1%', fontSize: '14px' , backgroundColor: '#333333', fontWeight: 'bold', color: '#FFFFFF'}}>
        Prices may vary. Not handled by restaurant
        </p> 
      </div>

    {/* Div 2: Carousel */}
        <div style={{ height: '65%', position: 'relative', textAlign: 'center', marginTop: '1vh' ,zIndex: 0}}>
          <ZoomSlider 
            slides={imagesUrls.map((imageUrl, index) => (
              <div key={index} style={{ ...slideStyle, width:'100%' }}>
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  style={{
                  maxWidth: '80vh',
                  objectFit: 'cover',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
          ))}
          initialSlide={0}
          maxScale={3}
          minScale={1}
          slideIndicatorTimeout={5000}
          activeDotColor="#292d2c"
          dotColor="#545958"
        />
        </div>

   
     {/* Div 3: Ads */}
     <div style={adContainerStyle}>
              <Ad />
      </div>
  </div>
  
  
 );}

const slideStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const adContainerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  marginTop:'2vh',
  width: '100%',
  height: '20vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
};
export default GetImages;
