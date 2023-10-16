const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

  //   const response = await fetch(url, {
  //     method,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: data ? JSON.stringify(data) : undefined,
  //   });
  //   return response.json();
};
