import { Component, Inject } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person';
import {FormControl, Validators} from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent {

  // We need injection, so that the data of the person, who will be editted,
  // comes from list-people component
  constructor(private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: Person) {}

  // Initializing the data of the person, who will be editted
  editPerson: Person = {
    id: this.data.id,
    vorname: this.data.vorname,
    nachname: this.data.nachname,
    email: this.data.email 
  }

  // 3 objects for the 3 input fields to prevent invalid inputs or empty input fields
  vornameForm = new FormControl('', [Validators.required]);
  nachnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);

  // Raise an error message, when the first name field is empty
  getErrorMessageVorname() {
    return (this.vornameForm.hasError('required'))? 'Vornamen eintragen!': '';
  }

  // Raise an error message, when the last name field is empty
  getErrorMessageNachname() {
    return (this.nachnameForm.hasError('required'))? 'Nachnamen eintragen!': '';
  }

  // Raise an error message, when the email field is empty or while inputing an invalid email
  getErrorMessageEmail() {
    if (this.emailForm.hasError('required')) {
      return 'Email-Adresse eintragen!'
    }
    return (this.emailForm.hasError('email'))? 'Unkorrekte Email-Adresse!' : '';
  }

  // Editting the new informations of the person in the list
  edit() {
    this.personService.updatePerson(this.editPerson);
  }
}
