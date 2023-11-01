import React, { useEffect, useRef, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import './editor.scss';

const Editor = ({ onGetHtmlValue, htmlValue }) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  const quillInstance = useRef(null);

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  // Function to set the HTML content when the HTML value changes
  const setHtmlContent = (content) => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = content;
    }
  };

  useEffect(() => {
    // Set the initial HTML content when Quill is ready
    if (quill) {
      quillInstance.current = quill;
      setHtmlContent(htmlValue);
    }
  }, [quill, htmlValue]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents, source) => {
        if (source === 'user') {
          onGetHtmlValue(quill.root.innerHTML);
        }
      });
    }
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
