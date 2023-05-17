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
    this.getPokemons(this.page);
  }

  @Input() searchValue: string = '';

  setPage(value: string) {
    if (value === 'sum') this.page = this.page + 1;
    else this.page = this.page - 1;
    this.getPokemons(this.page);
    return false;
  }

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

  ngOnChanges(changes: SimpleChanges) {
    this.error = false;
    const search = changes['searchValue'];
    if (search.currentValue && search.currentValue !== search.previousValue) {
      this.getPokemonByName(search.currentValue);
    } else {
      this.getPokemons(1);
    }
  }
}
