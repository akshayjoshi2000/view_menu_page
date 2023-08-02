import React from 'react';
import database from '../firebase/config'; // Adjust the path as needed
import { ref, get } from 'firebase/database';

const documentId = '-NahQvFwvx4LVvwSmC65';

export const getImages = async () => {
  try {
    const imagesUrlRef = ref(database, 'restaurants/' + 'undefined/'+ documentId  + '/imagesBucketURL');
    const imagesUrlsSnapshot = await get(imagesUrlRef);
    console.log("imagesUrlRef url's :", imagesUrlRef);
    const imagesUrls = imagesUrlsSnapshot.val();
    
    console.log("image url's :", imagesUrls);
    return imagesUrls;
  } catch (error) {
    console.error("Error fetching images URLs:", error);
    return null;
  }
};

const GetImages = () => {
  const handleButtonClick = async () => {
    await getImages();
  };

  return (
    <div>
      <h1>This is GetImages page</h1>
      <button onClick={handleButtonClick}>Get Images</button>
    </div>
  );
};

export default GetImages;
