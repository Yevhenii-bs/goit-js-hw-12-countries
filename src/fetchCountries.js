

export default function fetchCountries(e) {
  const searchCountry = e.target.value;

  const url = `https://restcountries.com/v2/name/${searchCountry}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data).catch(error => {
      console.log(error)
     });
    
}
