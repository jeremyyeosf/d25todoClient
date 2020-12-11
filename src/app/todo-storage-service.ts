import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  results
  constructor(private http: HttpClient) { }

  add(result) {
    this.results = []
    this.results.push(result)
  }

  push(result) {
    this.results.push(result)
  }

  sendDataToExpress(data) {
    this.http.post('http://localhost:3000/database', data)
      .toPromise()
      .then((result) => {
        console.log(result)
      })
  }

  clear() {
    this.results = []
  }
}
