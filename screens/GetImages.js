import React, { useEffect, useState } from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import { RotateSpinner } from 'react-spinners-kit';
import Ad from '../Ad';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, limit, getDocs, DocumentReference } from 'firebase/firestore';
import { firestore, analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

function GetImages() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesUrls, setImagesUrls] = useState([]);
  const documentId = new URLSearchParams(window.location.search).get('id');
  const [imageUrls, setImageUrls] = useState([]);
  const [linkUrls, setLinkUrls] = useState([]);
  const [displayedRestaurantSet, setDisplayedRestaurantSet] = useState(new Set());




  useEffect(() => {
    if (documentId) {
      const fetchData = async () => {
        try {
          const documentRef = doc(firestore, 'restaurants', documentId);
          const docSnapshot = await getDoc(documentRef);

          if (docSnapshot.exists()) {
            const currentReadCount = docSnapshot.data().read_count || 0;
            await updateDoc(documentRef, {
              read_count: currentReadCount + 1,
            });

            // Log an event for document access
            logEvent(analytics, 'document_access', {
              document_id: documentId,
            });

            // Get the image URLs directly from the document
            const images = docSnapshot.data().imagesBucketURL || [];
            setImagesUrls(images);
          } else {
            console.log('No data found for this restaurant.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching images
        }
      };

      fetchData();
    }
  }, [documentId]);



  useEffect(() => {
    const fetchAdvertisements = async () => {
      if (!documentId) {
        setIsLoading(false);
        return;
      }

      try {
        // Step 1: Fetch the restaurant document to access ads_reference
        const restaurantRef = doc(firestore, 'restaurants', documentId);
        const restaurantSnapshot = await getDoc(restaurantRef);

        if (!restaurantSnapshot.exists()) {
          console.log('No data found for this restaurant.');
          setIsLoading(false);
          return;
        }

        // Step 2: Parse the ads_reference field to get a list of advertisement references
        const adReferences = restaurantSnapshot.data().ads_reference || [];

        // Step 3: Create a set to keep track of ad IDs from the restaurant's ads_reference
        const restaurantAdIds = new Set(adReferences.map((adRef) => adRef.id));

        // Step 4: Fetch all advertisements
        const allAdvertisementsQuery = query(collection(firestore, 'advertisements'));
        const allAdvertisementsSnapshot = await getDocs(allAdvertisementsQuery);
        const allAdvertisements = allAdvertisementsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        // Step 5: Filter out advertisements associated with the same restaurant
        const adsFromOtherRestaurants = allAdvertisements.filter((ad) => ad.data.restaurant !== documentId);

        // Step 6: Filter out ads that are already in the restaurant's ads_reference
        const remainingAds = adsFromOtherRestaurants.filter((ad) => !restaurantAdIds.has(ad.id));

        // Step 7: Randomly select a number of ads, up to a maximum of 6 or the available ads
        const maxAdsToDisplay = Math.min(6, remainingAds.length);
        const randomAds = [];

        while (randomAds.length < maxAdsToDisplay) {
          const randomIndex = Math.floor(Math.random() * remainingAds.length);
          const randomAd = remainingAds[randomIndex];

          // Add the random ad to the list of displayed ads
          randomAds.push(randomAd);

          // Remove the selected ad from the list to avoid duplicates
          remainingAds.splice(randomIndex, 1);
        }

        // Extract image URLs and link URLs from the randomly selected ads
        const imageUrls = randomAds.map((ad) => ad.data.imageUrl);
        const linkUrls = randomAds.map((ad) => ad.data.linkUrl);

        // Display the retrieved advertisements
        setImageUrls(imageUrls);
        setLinkUrls(linkUrls);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the asynchronous function to fetch advertisements
    fetchAdvertisements();
  }, [documentId]);



  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Div 1: Displaying message */}
      <div style={{ height: '4vh', textAlign: 'center', marginTop: '0vh' }}>
        <div style={{ backgroundColor: '#333333', fontWeight: '300', color: '#FFFFFF', padding: '3px 0', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ flex: 1 }}> Prices may vary. Not handled by the restaurant</span>
        </div>
      </div>

      {/* Div 2: Carousel */}
      <div style={{ height: '65%', position: 'relative', textAlign: 'center', marginTop: '0vh', zIndex: 1 }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <RotateSpinner size={60} color="#ffffff" loading={true} />
          </div>
        ) : (
          <ZoomSlider
            slides={imagesUrls.map((imageUrl, index) => (
              <div key={index} style={{ ...slideStyle, width: '100%' }}>
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
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
        )}
      </div>

      {/* Div 3: Ads */}   
     <div style={{ height: '20%', position: 'fixed',bottom: 0, textAlign: 'center', marginTop: '0vh', zIndex: 0 , marginBottom: '0vh' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            
          </div>
        ) : (
          <ZoomSlider
            slides={imageUrls.map((imageUrl, index) => (
              <div key={imageUrl} style={{ width: '100%' }}>
                <a
                  href={linkUrls[index]} // Set the href to the fetched linkUrl
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    style={{
                      maxWidth: '100vw',
                      objectFit: 'cover',
                      maxHeight: '20vh',
                    }}
                  />
                </a>
              </div>
            ))}
            initialSlide={0}
            maxScale={3}
            minScale={1}
            slideIndicatorTimeout={3000}
            activeDotColor="#ffffff"
            dotColor="#292d2c"
          />
        )}
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
  zIndex: 0,
};

const adContainerButton = {
  padding: '0px',
  bottom: 30,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0vh',
};

export default GetImages;
