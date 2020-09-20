const getData = async url => {
  const request = await fetch(url);

  if(!request.ok) {
    throw new Error(`Ошибка при загрузке ${request.url}: ${request.status}`);
  }

  const data = await request.json();

  return data;
}

getData('https://swapi.dev/api/people/11/')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(`Сервер недоступен: ${error}`);
  })