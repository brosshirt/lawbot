import React from 'react';
import InputBox from './components/InputBox/InputBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import './App.css';

function App() {
  // So the chatresponse needs to be defined here and it will be passed into chatdisplay
  // it makes no sense to link chatresponse to other state variables because we don't want to keep rerendering the chatdisplay for no reason
  // I think loading can be global because maybe we want to do other stuff later on
  // I think input should just be managed inside of the input box and passed up into the function that we pass to input box

  // This is acceptable and GOOD ENOUGH, I'm not going to waste any more time thinking about best practices with react, you've gotta get messy
  
  
  return (
    <div className='chatpage'>  
      <ChatDisplay />
      <InputBox/>
    </div>
  );
}

export default App;
