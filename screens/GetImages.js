import React, { useEffect, useState } from 'react';
import ZoomSlider from 'react-instagram-zoom-slider';
import { RotateSpinner } from 'react-spinners-kit';
import { Zoom } from 'react-slideshow-image';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

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

  const handleImageClick = async (alt) => {
    console.log('Image clicked:', alt);
    try {
      // Assuming the document ID is present in the URL parameter or stored in state
      if (documentId) {
        // Log the document ID
        //console.log(`Document ID: ${documentId}`);

        // Get the subcollection of advertisements associated with the current image
        const adsCollectionRef = collection(firestore, 'advertisements');
        const adsQuery = query(adsCollectionRef, where('imageUrl', '==', imageUrls[0])); // Assuming imageUrls is an array
        const adsSnapshot = await getDocs(adsQuery);
        const adsDocs = adsSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

        // Assuming there is only one matching advertisement for the current image
        const currentAd = adsDocs[0];

        // Open the associated link in a new tab/window
        window.open(currentAd.data.linkUrl, '_blank');

        // Update the Ad_click field in the advertisement document
        const adDocRef = doc(firestore, 'advertisements', currentAd.id);
        const currentAdClicks = currentAd.data.Ad_click || 0;
        const currentImpressionsCount = currentAd.data.impressions_count || 0;

        // Update the Ad_click field in the Firestore document
        await updateDoc(adDocRef, {
          Ad_click: currentAdClicks + 1,
        });

        // Calculate the click-through ratio (ctr)
        const ctr = currentImpressionsCount > 0 ? (currentAdClicks + 1) / currentImpressionsCount : 0;

        // Log the current ctr value
        // console.log('Current currentAdClicks:', currentAdClicks);
        // console.log('Current currentImpressionsCount:', currentImpressionsCount);
        // console.log('Current CTR:', ctr);

        // Update the ctr field in the Firestore document
        await updateDoc(adDocRef, {
          ctr,
        });


      }
    } catch (error) {
      console.error('Error handling image click:', error);
    }
  };


  const handleSlideChange = async (currentIndex) => {
    try {
      // Check if there are imageUrls and currentIndex is within bounds
      if (imageUrls.length > 0 && currentIndex >= 0 && currentIndex < imageUrls.length) {
        const currentImageUrl = imageUrls[currentIndex];

        // Assuming the document ID is present in the URL parameter or stored in state
        if (documentId) {
          // Log the document ID and the subcollection of advertisements
          //console.log(`Document ID: ${documentId}`);

          // Get the subcollection of advertisements associated with the current image
          const adsCollectionRef = collection(firestore, 'advertisements');
          const adsQuery = query(adsCollectionRef, where('imageUrl', '==', currentImageUrl));
          const adsSnapshot = await getDocs(adsQuery);
          const adsDocs = adsSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

          // Log the subcollection of advertisements
          // console.log('Subcollection of Advertisements:', adsDocs);

          // Assuming there is only one matching advertisement for the current image
          const currentAd = adsDocs[0];

          // Update the impressions_left and impressions_count fields in the advertisement document
          const adDocRef = doc(firestore, 'advertisements', currentAd.id);
          const currentImpressionsLeft = currentAd.data.impressions_left || 0;
          const currentImpressionsCount = currentAd.data.impressions_count || 0;

          // Check if there are impressions left to decrement
          if (currentImpressionsLeft > 0) {
            // Update the impressions_left and impressions_count fields in the Firestore document
            await updateDoc(adDocRef, {
              impressions_left: currentImpressionsLeft - 1,
              impressions_count: currentImpressionsCount + 1,
            });

            //console.log('impressions_left', impressions_left)
            //console.log('impressions_count',impressions_count)

            // Log a message indicating the impressions_left has been decremented and impressions_count has been incremented
            //console.log('Impressions_left decremented successfully.');
          } else {
            console.log('No impressions left to decrement.');
          }
        }
      }
    } catch (error) {
      console.error('Error handling slide change:', error);
    }
  };
  


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

        // Retrieve the restaurant's ads_reference, an array of references to advertisements
        const adsReference = restaurantSnapshot.data().ads_reference || [];

        // Create a set to keep track of ad IDs from the restaurant's ads_reference
        const restaurantAdIds = new Set(adsReference.map((adRef) => adRef.id));

        // Step 2: Fetch all advertisements
        const allAdvertisementsQuery = query(collection(firestore, 'advertisements'));
        const allAdvertisementsSnapshot = await getDocs(allAdvertisementsQuery);
        const allAdvertisements = allAdvertisementsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // console.log(allAdvertisements)

        // Step 3: Filter out advertisements associated with the same restaurant and not in ads_reference
        const filteredAds = allAdvertisements.filter((ad) => {
          return (
            ad.data.restaurant !== documentId &&
            !restaurantAdIds.has(ad.id) &&
            ad.data.impressions_left > 0 && 
            !ad.data.InRestaurantAd 
          );
        });

        if (!restaurantSnapshot.exists()) {
          console.log('No data found for this restaurant.');
          setIsLoading(false);
          return;
        }

        // Extract restaurant data
        const restaurantData = restaurantSnapshot.data();
        const restaurantPincode = restaurantData.pincode;
        const restaurantLocality = restaurantData.locality;
        const restaurantDistrict = restaurantData.district;
        const restaurantState = restaurantData.state;

        // Step 4: Categorize the filtered ads based on targetProperty
        const pincodeAds = filteredAds.filter((ad) =>
          ad.data.targetProperty === 'Pincode' && ad.data.pincode === restaurantPincode
        );

        //console.log("Ads with targetProperty 'Pincode' and matching pincode:", pincodeAds);

        // Repeat the same for other targetProperty categories (Locality, District, State)
        const localityAds = filteredAds.filter((ad) =>
          ad.data.targetProperty === 'Locality' && ad.data.locality === restaurantLocality
        );

        //console.log("Ads with targetProperty 'Locality' and matching locality:", localityAds);

        const districtAds = filteredAds.filter((ad) =>
          ad.data.targetProperty === 'District' && ad.data.district === restaurantDistrict
        );

        //console.log("Ads with targetProperty 'District' and matching district:", districtAds);

        const stateAds = filteredAds.filter((ad) =>
          ad.data.targetProperty === 'State' && ad.data.state === restaurantState
        );

        //console.log("Ads with targetProperty 'State' and matching state:", stateAds);


        // Step 5: Randomly select the desired number of ads for each category
        const maxPincodeAds = Math.min(2, pincodeAds.length);
        const maxLocalityAds = Math.min(2, localityAds.length);
        const maxDistrictAds = Math.min(2, districtAds.length);
        const maxStateAds = Math.min(2, stateAds.length);

        const randomPincodeAds = selectRandomAds(pincodeAds, maxPincodeAds);
        const randomLocalityAds = selectRandomAds(localityAds, maxLocalityAds);
        const randomDistrictAds = selectRandomAds(districtAds, maxDistrictAds);
        const randomStateAds = selectRandomAds(stateAds, maxStateAds);


        const inRestaurantAds = allAdvertisements.filter((ad) => {
          const isSameRestaurant = ad.data.restaurant === documentId || restaurantAdIds.has(ad.id);
          return ad.data.InRestaurantAd === true && isSameRestaurant;
        });

        // Concatenate the randomly selected ads for display
        const selectedAds = [
          ...inRestaurantAds,
          ...randomPincodeAds,
          ...randomLocalityAds,
          ...randomDistrictAds,
          ...randomStateAds,
          
        ];

        // Extract image URLs and link URLs from the selected ads
        const imageUrls = selectedAds.map((ad) => ad.data.imageUrl);
        const linkUrls = selectedAds.map((ad) => ad.data.linkUrl);

        // Display the retrieved advertisements
        setImageUrls(imageUrls);
        setLinkUrls(linkUrls);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Function to select random ads up to a specified count
    const selectRandomAds = (ads, count) => {
      const selectedAds = [];
      while (selectedAds.length < count && ads.length > 0) {
        const randomIndex = Math.floor(Math.random() * ads.length);
        selectedAds.push(ads[randomIndex]);
        ads.splice(randomIndex, 1);
      }
      return selectedAds;
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
                    maxWidth: '95vw',
                    objectFit: 'cover',
                    maxHeight: '75vh',
                  }}
                />
              </div>
            ))}
            initialSlide={0}
            maxScale={3}
            minScale={1}
            slideIndicatorTimeout={8000}
            activeDotColor="#ffffff"
            dotColor="#292d2c"
            
          />
        )}
      </div>

      {/* Div 3: Ads */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 0, marginBottom: '1vh' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <RotateSpinner size={60} color="#ffffff" loading={false} />
          </div>
        ) : (
          <ImageGallery
            items={imageUrls.map((imageUrl, index) => ({
              original: imageUrl,
              thumbnail: imageUrl,
              description: `Ad ${index + 1}`,
              linkUrl: linkUrls[index], // Add linkUrl to the item object
            }))}
            showNav={false}         // Hide navigation arrows
            showThumbnails={false}  // Hide thumbnails
            showBullets={false}     // Hide bullets
            infinite={true}         // Enable infinite sliding
            slideInterval={8000}    // Set the play interval to 5000ms (5 seconds)
            autoPlay={true}         // Enable autoplay
            showFullscreenButton={false}
            showPlayButton={false}
            lazyLoad={true}
            showIndex={false}
            disableSwipe={false}
            slideDuration={1}
            onClick={(index) => handleImageClick(index)}
            onSlide= {handleSlideChange}
            style={{ height: '40px' }}
            renderItem={(item) => (
              <div style={{ width: '100%', height: '100%' }}>
                <a
                  href={item.linkUrl} // Use the linkUrl from the item object
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.original}
                    alt={item.description}
                    style={{
                      maxWidth: '95vw',
                      objectFit: 'cover',
                      maxHeight: '80vh', // Adjust this value to your preference
                      margin: 'auto',
                      display: 'block',
                    }}
                  />
                </a>
              </div>
            )}
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

export default GetImages;
