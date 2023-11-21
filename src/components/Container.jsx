'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Container({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 50,
    });
  }, []);
  return <>{children}</>;
}
