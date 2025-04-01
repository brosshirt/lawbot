import React, {useState, useRef, useEffect, SetStateAction} from 'react'
import './PDFDisplay.css'
import WebViewer from '@pdftron/webviewer'

interface PDFDisplayProps {
    ctrlF: string
    setCtrlF: React.Dispatch<SetStateAction<string>>
}




function PDFDisplay({ctrlF, setCtrlF}:PDFDisplayProps){
    const viewer = useRef<HTMLDivElement>(null);

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
          } catch (error) {
            console.log('viewer error ==> ', error)
          }
        }
        callView()
      }, []);

    const searchListener = (searchPattern:string, options:object, results:Array<object>) => {
        // If the results array is empty, it's probably because of a page break, so run the search again with a substring, this will cause recursion
        if (results.length == 0 && searchPattern.length > 10){
          setCtrlF(searchPattern.slice(0, searchPattern.length - 50)) // this will trigger another search
        } 
    };

    // Configure the instance after it's initialized
    useEffect(() => {
        if (instance){
            instance.UI.disableElements(['searchPanel']);
            instance.UI.setZoomLevel('100%');
            instance.UI.addSearchListener(searchListener);
        }
    },[instance])



    useEffect(() => {
        if (instance) {
            instance.UI.searchTextFull(ctrlF, searchOptions);
        }
    },[ctrlF])

    return (
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
        // <div>hello</div>
    );
  };


export default PDFDisplay

