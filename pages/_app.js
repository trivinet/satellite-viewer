import React from 'react';
import '../styles/globals.css';

var defaultLight = true;
var defaultLng = 'ESP';

export default function MyApp({ Component, pageProps }) {
  const [lightGlobal, setLightGlobal] = React.useState(defaultLight);
  const [lngGlobal, setLngGlobal] = React.useState(defaultLng);

  // Force one re-render when TLEs finish loading
  const [, force] = React.useState(0);
  React.useEffect(() => {
    function onReady() { force(x => x + 1); }
    window.addEventListener('tle-ready', onReady);
    return () => window.removeEventListener('tle-ready', onReady);
  }, []);

  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
