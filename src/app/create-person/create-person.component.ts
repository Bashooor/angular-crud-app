import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms'
import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent {
  
  constructor (private personService: PersonService) { }

  // Initializing the new added person in the list
  newPerson: Person = {
    id: 0,
    vorname: '',
    nachname: '',
    email: ''
  }

  // 3 objects for the 3 input fields to prevent invalid inputs or empty input fields
  vornameForm = new FormControl('', [Validators.required]);
  nachnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);

  // Raise an error message, when the first name field is empty
  getErrorMessageVorname() {
    if (this.vornameForm.hasError('required')) {
      return 'Vornamen eintragen!';
    }
    return "";
  }

  // Raise an error message, when the last name field is empty
  getErrorMessageNachname() {
    if (this.nachnameForm.hasError('required')) {
      return 'Nachnamen eintragen!';
    }
    return "";
  }

  // Raise an error message, when the email field is empty or while inputing an invalid email
  getErrorMessageEmail() {
    if (this.emailForm.hasError('required')) {
      return 'Email-Adresse eintragen!';
    }
    return this.emailForm.hasError('email') ? 'Unkorrekte Email-Adresse!' : '';
  }

  // New person will be added to the list
  create() {
      this.personService.createPerson(this.newPerson);
  }
}
