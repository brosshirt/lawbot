import React, {useState, useRef, useEffect} from 'react'
import './PDFDisplay.css'
import WebViewer from '@pdftron/webviewer'

interface PDFDisplayProps {
    ctrlF: string
}




function PDFDisplay({ctrlF}:PDFDisplayProps){
    const viewer = useRef<HTMLDivElement>(null);

    const searchText = "seizures"

    const searchOptions = {
        caseSensitive: false,  // match case
        wholeWord: false,      // match whole words only
        wildcard: false,      // allow using '*' as a wildcard value
        regex: false,         // string is treated as a regular expression
        searchUp: false,      // search from the end of the document upwards
        ambientString: true,  // return ambient string as part of the result
      };

    const [instance, setInstance] = useState<any>(null) 

    // This is the only code I can find that survives the double render from strict mode: https://stackoverflow.com/a/77496914
    useEffect(() => {
        const callView = async () => {
          try {
            setInstance(await WebViewer(
              {
                path: 'webviewer',
                licenseKey: process.env.REACT_APP_APRYSE_KEY,
                initialDoc: 'notes/CRIM PRO OUTLINE.pdf'
              },
              viewer.current!
            ))
            // const { Core, UI } = docx;
            // const { documentViewer, annotationManager, Annotations, Tools } = Core;
          } catch (error) {
            console.log('viewer error ==> ', error)
          }
        }
        callView()
      }, []);


    const searchDoc = () => {

    }

    useEffect(() => {
        if (instance) {
            instance.UI.searchTextFull(ctrlF, searchOptions);
        }
    },[ctrlF])

    


      


  
    return (
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    );
  };


export default PDFDisplay

