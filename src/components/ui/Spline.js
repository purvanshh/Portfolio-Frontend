import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const Spline = ({ scene, ...rest }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load(scene);
    }
  }, [scene]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Spline;