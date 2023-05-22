import { Component} from '@angular/core';
import { PersonService } from '../person.service';
import { MatDialog} from '@angular/material/dialog';
import { CreatePersonComponent } from '../create-person/create-person.component';
import { Person } from '../person';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { ReadPersonComponent } from '../read-person/read-person.component';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
/**
 * This component is for displaying the list of people
 */
export class ListPeopleComponent {

  // We need three dialogs for the other three components (create-, edit- and read-person)
  constructor(private personService: PersonService, 
    public dialog: MatDialog) {}

  // List of people and if the list is empty "die Liste ist leer!" shows up
  persons = this.personService.persons;
  emptyList = (this.persons.length === 0);

  // Creating new person
  create() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(CreatePersonComponent, {
      height: '350px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe( _ =>
      this.emptyList = (this.persons.length === 0)
    )
  }

  // Deleting a person
  delete(id: number) {
    this.dialog.closeAll();
    this.personService.deletePerson(id);
    this.emptyList = (this.persons.length === 0);
  }

  // Editting a person
  edit(person: Person) {
    this.dialog.closeAll();
    this.dialog.open(EditPersonComponent, {
      data: {
        id: person.id,
        vorname: person.vorname,
        nachname: person.nachname,
        email: person.email
      },
      height: '350px',
      width: '300px',
    })
  }

  // Reading a person's informations
  // By clicking on the name of a person, his details will appeare
  read(person: Person) {
    this.dialog.closeAll();
    this.dialog.open(ReadPersonComponent, {
      data: {
        id: person.id,
        vorname: person.vorname,
        nachname: person.nachname,
        email: person.email
      },
      height: '350px',
      width: '300px',
    })
  }
}
