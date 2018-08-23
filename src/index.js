import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
	.then(reg => {
   console.log('ServiceWorker successfuly registered!');
 }).catch(e => { 
   console.log('Registration failed', e);
 });
}