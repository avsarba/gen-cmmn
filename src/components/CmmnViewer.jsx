import React, { useEffect, useRef } from 'react';
import CmmnJS from 'cmmn-js/lib/Viewer';

function CmmnViewer({ xml }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) {
      viewerRef.current = new CmmnJS({
        container: containerRef.current,
        width: '100%',
        height: '100%'
      });
    }

    const viewer = viewerRef.current;

    if (xml) {
      try {
        viewer.importXML(xml, (err) => {
          if (err) {
            console.error('Error rendering CMMN', err);
          } else {
            const canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');
          }
        });
      } catch (error) {
        console.error('Error importing CMMN XML', error);
      }
    }

    return () => {
      viewer.destroy();
    };
  }, [xml]);

  return <div ref={containerRef} className="cmmn-viewer" style={{ width: '100%', height: '600px' }}></div>;
}

export default CmmnViewer;
