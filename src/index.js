import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/APP/App';
import './style/style.scss'
// import GotService from './services/gotService';

const root = ReactDOM.createRoot(document.getElementById('root'));
//  const got_service = new GotService()

//    got_service.getAllCharacters()
//               .then(res => console.log(res))

// got_service.getQuoteByName('tyrion')
// .then(res=> console.log(res))

  // got_service.getQuotes()
  //            .then(res=> res.forEach(item=> console.log(item.character.name) )) 


              
// got_service.getCharacter(7)
//  .then(res => console.log(res))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


