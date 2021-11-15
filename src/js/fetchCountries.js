const BASE_API = 'https://restcountries.com/v2/name';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_API}/${searchQuery}`).then(response => response.json());
}
export default { fetchCountries };
