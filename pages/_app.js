import React, { useState, useEffect } from 'react';
import '../styles/globals.css'

var defaultDark = true;

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const [darkGlobal, setDarkGlobal] = React.useState(defaultDark);

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

