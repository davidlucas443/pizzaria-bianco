import { useEffect, useState } from 'react';
import { BrandMark } from './Brand';
export function LoadingScreen() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const image = document.querySelector('.hero-pizza');
    if (!image || (image.complete && image.naturalWidth) || location.hash) return;
    setLoading(true);
    let active = true;
    const done = () => { if (active) setLoading(false); };
    const timer = setTimeout(done, 1500); image.decode().then(done, done);
    return () => { active = false; clearTimeout(timer); };
  }, []);
  return loading ? <div className="loading-screen" role="status"><BrandMark /><span>O forno está pronto.</span></div> : null;
}
