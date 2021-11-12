import './sass/main.scss';
import * as _ from 'lodash';

import fetchCountries from './fetchCountries';
import countryCard from './templateCard.hbs';
import countryList from './templateList.hbs';

import * as PNotify from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';

const inputSpace = document.querySelector('.input');
const container = document.querySelector('.countries-selection');
const inputNotice = new PNotify.Stack({
  dir1: 'up',
});

inputSpace.addEventListener('input', _.debounce(onInput, 500));

function onInput(e) {
  e.preventDefault();
  fetchCountries(e).then(data => {
    container.innerHTML = '';
    inputNotice.close(true);
    if (data.length === 1) {
      container.insertAdjacentHTML('beforeend', countryCard(data[0]));
    } 
    else if (data.length < 11 && data.length > 2) {
      data.forEach(country => {
        console.log(country.name);
      });
      container.insertAdjacentHTML('beforeend', countryList(data));
    } 
   
    else if (data.length > 10){
      PNotify.notice({
        text: 'Unfortunately too many matches have been found. Please try again',
        stack: inputNotice,
        modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
      })
    } 
 else {
      onTheError(info, 'No matches found!');
     
    }
  }).catch(onTheError);

}
function onTheError(typeInfo, text){
  container.innerHTML = ''
  PNotify.notice({
    text: 'No matches found!',
    delay: 1000,
    color: 'red',
  })
}