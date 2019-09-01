import axios from 'axios';

export default class AecomBackend {
  headers;

  constructor() {
    this.headers = new Headers();
    this.headers.append('content-type', 'application/json');

  }

  getProjects() {
    return axios.get("https://apps.aecom-digital.com/excellence/projects");
  }
}
