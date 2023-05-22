import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // List of all persons
  persons: Person[] = [];

  constructor() { }

  // create new person
  createPerson(person: Person) {
    const newPerson: Person = {
      ...person,
      id: this.generateId()
    };
    this.persons.push(newPerson);
  }

  // update person's information
  updatePerson(person: Person) {
    const index: number = this.persons.findIndex(p => p.id === person.id);
    if (index != -1) {
      this.persons[index] = person;
    }
  }

  // delete person from the list
  deletePerson(id: number) {
    const index: number = this.persons.findIndex(p => p.id === id);
    if (index != -1) {
      this.persons.splice(index, 1);
    }
  }

  // generate id of a new created person.
  // If the list is empty => id = 1, otherwise the person's id is (id+1) of the last person in the list
  generateId(): number {
    const len = this.persons.length;
    if(len === 0) {
      return 1;
    }
    return this.persons[len-1].id + 1;
  }
}