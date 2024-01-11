// src/app/app.component.ts

import { Component } from '@angular/core';
import { CouchService } from './couch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  formData: any = {};
  submitted = false;
  loggedIn = false;

  constructor(private couchService: CouchService) {}

  submitForm(): void {
    if (this.loggedIn) {
      // Save form data to CouchDB only if the user is logged in
      this.couchService.saveDocument(this.formData).subscribe(
        response => {
          console.log('Document saved successfully:', response);
          this.submitted = true;
        },
        error => {
          console.error('Error saving document:', error);
        }
      );
    } else {
      console.error('User not logged in. Please log in first.');
      // You can display a message to the user or redirect to the login page
    }
  }

  login(): void {
    // Implement login logic in the CouchService
    this.couchService.login().subscribe(
      response => {
        console.log('Login successful:', response);
        this.loggedIn = true;
      },
      error => {
        console.error('Error during login:', error);
        // Handle error, e.g., show error message
      }
    );
  }
}
