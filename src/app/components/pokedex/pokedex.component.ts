import { Component, Input, SimpleChanges } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent {
  loading: boolean = true;
  error: boolean = false;
  pokemons: any[] = [];
  nextPage: string | null = '';
  prevPage: string | null = null;
  page: number = 1;

  constructor(private pokedex: PokedexService) {
    //Get pokemons when init page
    this.getPokemons(this.page);
  }

  @Input() searchValue: string = '';

  // Change pagination value
  setPage(value: string) {
    if (value === 'sum') this.page = this.page + 1;
    else this.page = this.page - 1;
    this.getPokemons(this.page);
    return false;
  }

  // Get pokemons by pagination
  async getPokemons(page: number): Promise<void> {
    try {
      this.loading = true;
      const response = await this.pokedex.getPokemons(page);
      this.pokemons = response.results;
      this.nextPage = response.next;
      this.prevPage = response.previous;
    } catch (err) {
      console.log('err', err);
    } finally {
      this.loading = false;
    }
  }

  //Get pokemons by name
  async getPokemonByName(name: string): Promise<void> {
    this.loading = true;
    try {
      const response = await this.pokedex.getPokemonByNameOrId(name);
      if (response === 'Erro na Requisição') {
        this.pokemons = [];
        this.error = true;
      } else {
        this.pokemons = [response];
        this.page = 1;
        this.nextPage = '';
        this.prevPage = '';
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      this.loading = false;
    }
  }

  // Watch the search value changes
  ngOnChanges(changes: SimpleChanges) {
    this.error = false;
    const search = changes['searchValue'];
    if (search.currentValue && search.currentValue !== search.previousValue) {
      // Get pokémon by name if the value exists and is different from the previous value
      this.getPokemonByName(search.currentValue);
    } else {
      // Else if get pokemons by first page
      this.getPokemons(1);
    }
  }
}
