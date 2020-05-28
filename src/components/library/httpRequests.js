
function HTTPRequest() { 

  const get = async (url) => {
    const response = await fetch(url);    
    if (!response.ok) throw new Error(response.error);    
    const headerLinks = response.headers.get('Link');
    const resData = await response.json();
    return { headerLinks, resData };    
 }

 const getSorted = async () => {
  const response = await fetch(`http://localhost:3000/characters?_sort=name&_order=asc&_page=2`);
  if (!response.ok) throw new Error(response.error);    
  const headerLinks = response.headers.get('Link');
  const resData = await response.json();  
  return { headerLinks, resData };
 }

  const getSpecies = async (url) => {
    const response = await fetch(url);      
    if (!response.ok) throw new Error(response.error); 
    const resData = await response.json(); 
    return resData;
  }

  const postCharacter = async (char, url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(char)
    });
    if (!response.ok) throw new Error(response.error);
    const resData = await response.json();
    return resData; 
  }
  
  const putCharacter = async (char, url) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(char)
    });
    if (!response.ok) throw new Error(response.error);
    const resData = await response.json();
    return resData; 
  }

  const getSearched = async (url) => {
    const response = await fetch(url);      
    if (!response.ok) throw new Error(response.error); 
    const resData = await response.json(); 
    return resData;    
 }

  const deleteChar = async(url) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const resData = await response.json();
    return resData;
}

  return {
    get,
    getSpecies,
    postCharacter,
    getSearched,
    deleteChar,
    putCharacter,
    getSorted,
  }
}

export default new HTTPRequest();