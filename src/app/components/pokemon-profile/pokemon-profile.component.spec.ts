import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonProfileComponent } from './pokemon-profile.component';

describe('PokemonProfileComponent', () => {
  let component: PokemonProfileComponent;
  let fixture: ComponentFixture<PokemonProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonProfileComponent]
    });
    fixture = TestBed.createComponent(PokemonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
