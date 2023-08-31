import React, { useState } from 'react';

const Ad = () => {
  const [adLoaded, setAdLoaded] = useState(false);

  const onAdLoaded = () => {
    setAdLoaded(true);
    console.log('Ad loaded');
  };

  if (!adLoaded) {
    return null;
  }

  return (
    <div>
      <ins
        class="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1451426234429612"
        data-ad-slot="5174927401"
        data-ad-format="auto"
        data-full-width-responsive="true"
        onAdLoaded={onAdLoaded}
      ></ins>
    </div>
  );
};

export default Ad;