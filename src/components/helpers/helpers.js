export function getPaginationData(headerLinks) {  
  let urlsForPaginator = headerLinks.split(',').reduce((acc, link) => {
    let match = link.match(/<(.*)>; rel="(\w*)"/)
    let url = match[1].split('=');
    let rel = match[2]; 
    acc[rel] = url[3];
    return acc;
  }, {}); 
  return urlsForPaginator;
}


export const debounce = (fn, time) => {
  let timeoutId;
  return function(...args) {    
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args)
    }, time);
  }
}
