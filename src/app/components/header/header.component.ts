import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchValue = '';
  @Output() search = new EventEmitter();

  onKeypressEvent(event: any) {
    if (event.key === 'Enter') this.setSearchValue(event.target.value);
  }

  setSearchValue(value: string) {
    this.searchValue = value;
    this.search.emit(value);
  }
}
