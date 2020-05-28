export const urlBase = 'http://localhost:3000';
export const urlGetCharsPage = 'http://localhost:3000/characters?_page=';
export const speciesUrl = '/species';
export const charsUrl = 'http://localhost:3000/characters';

export const getSortedCharsUrl = (sortFilter, page) => {
  return `${charsUrl}?_sort=${sortFilter}&_order=asc&_page=${page}`
};
