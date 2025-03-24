const baseUrl = 'https://671f7361e7a5792f052e4dbe.mockapi.io/api/v1/events';

export const fetchEvents = () => {
  return fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка загрузки событий: ${res.statusText}`);
      }
      return res.json();
    })
    .then((eventsList) => {
      return eventsList.map(({ id, title, dateFrom, dateTo, description }) => ({
        id,
        title,
        description,
        dateFrom: new Date(dateFrom), 
        dateTo: new Date(dateTo),
      }));
    })
    .catch((error) => {
      console.error('Ошибка при получении событий:', error);
      return [];
    });
};

// export const loadEvents = () => {
//   fetchEvents()
//     .then((events) => {
//       console.log('Fetched Events:', events); // проверьте, что приходит в events
//       this.setState({ events });
//     })
//     .catch((error) => console.error('Ошибка загрузки событий:', error));
// };

export const createEvent = (eventData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при создании события');
      }
      return response.json(); 
    });
};



