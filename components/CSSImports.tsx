"use client";

import { useEffect } from 'react';

export default function CSSImports() {
  useEffect(() => {
    // Import CSS files on the client side only
    try {
      require("@stream-io/video-react-sdk/dist/css/styles.css");
      require("react-datepicker/dist/react-datepicker.css");
    } catch (error) {
      console.warn('CSS import error:', error);
    }
  }, []);

  return null;
}
