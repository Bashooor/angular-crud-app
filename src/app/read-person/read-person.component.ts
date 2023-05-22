import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../person';

@Component({
  selector: 'app-read-person',
  templateUrl: './read-person.component.html',
  styleUrls: ['./read-person.component.css']
})
/**
 * This component is for displaying the details of a person in the list
 */
export class ReadPersonComponent {

  // We need injection, so that the data of the person, who will we show his details,
  // comes from list-people component
  constructor(@Inject (MAT_DIALOG_DATA) public data: Person) {}

}
