import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title: string = 'pokemons';
  searchValue: string = '';

  setSearchValue(value: string) {
    this.searchValue = value;
  }
}
