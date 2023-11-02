import React from 'react';

function RawHTMLRenderer({ htmlContent }) {
  // Create an object with a __html property that contains your HTML content
  const html = { __html: htmlContent };

  return <div dangerouslySetInnerHTML={html} />;
}

export default RawHTMLRenderer;