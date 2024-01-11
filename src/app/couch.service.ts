// src/app/couch.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouchService {
  private apiUrl = 'http://localhost:5984/sample'; // Update with your CouchDB URL
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:admin') // Replace with your CouchDB credentials
  });

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  login(): Observable<any> {
    // Implement login logic
    // For simplicity, assume a successful login and return a mock response
    return new Observable(observer => {
      this.loggedIn = true;
      observer.next({ success: true });
      observer.complete();
    });
  }

  saveDocument(document: any): Observable<any> {
    if (!this.loggedIn) {
      console.error('User not logged in. Please log in first.');
      return new Observable(); // You can return an empty observable or handle it differently
    }

    return this.http.post<any>(`${this.apiUrl}`, document, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add more methods for CRUD operations if needed
}
