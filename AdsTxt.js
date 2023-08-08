

import React from 'react';

function AdsTxt() {
  // Replace this with the content of your ads.txt file
  const adsTxtContent = `
  google.com, pub-6890415870609973, DIRECT, f08c47fec0942fa0
  `;

  return (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {adsTxtContent}
    </pre>
  );
}

export default AdsTxt;
