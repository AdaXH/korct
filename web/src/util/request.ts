export default (url: string, method?: string, body?: any, options?: CommonObj): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method || 'get',
      headers: {
        ...options?.headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          return res.json();
        }
      })
      .then((res) => {
        const { success, data, ...errorInfo } = res;
        if (!success) {
          // handle error
          console.log('error', errorInfo);
          reject(errorInfo);
        } else {
          resolve(data);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};
