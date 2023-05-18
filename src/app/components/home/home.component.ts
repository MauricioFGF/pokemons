import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchValue: string = '';

  // Set the value used to look up the pokemon in the pokedex
  setSearchValue(value: string) {
    this.searchValue = value;
  }
}
