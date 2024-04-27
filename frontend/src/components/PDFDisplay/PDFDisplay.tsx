import React, {useState, useRef, useEffect} from 'react'
import './PDFDisplay.css'
import WebViewer from '@pdftron/webviewer'

function PDFDisplay(){
    const viewer = useRef<HTMLDivElement>(null);

    // This is the only code I can find that survives the double render from strict mode: https://stackoverflow.com/a/77496914
    useEffect(() => {
        const callView = async () => {
          try {
            const docx = await WebViewer(
              {
                path: 'webviewer',
                licenseKey: process.env.REACT_APP_APRYSE_KEY,
                initialDoc: 'notes/CRIM PRO OUTLINE.pdf'
              },
              viewer.current!
            )
            // const { Core, UI } = docx;
            // const { documentViewer, annotationManager, Annotations, Tools } = Core;
          } catch (error) {
            console.log('viewer error ==> ', error)
          }
        }
        callView()
      }, []);
  
    return (
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    );
  };


export default PDFDisplay

