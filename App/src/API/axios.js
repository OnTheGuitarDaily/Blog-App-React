import axios from 'axios';

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    accept: 'application/json'
  }
});

const apiService = {
  get: (endPoint) => instance.get(endPoint),
  post: (endPoint,data) => instance.post(endPoint, data),
  edit: (endPoint,data) => instance.put(endPoint, data),
  delete: (endPoint) => instance.delete(endPoint),
};

export default apiService;
