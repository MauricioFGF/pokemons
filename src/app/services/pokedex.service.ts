import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Pokedex from '../components/pokedex/pokedex';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiUrl = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) {}

  async getPokemons(page: number) {
    const limit = 10;
    const offset = 10 * (page - 1);
    let response: any;
    await fetch(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        response = data;
      });

    const newResults: any[] = [];
    response.results.forEach((item: any) => {
      fetch(item.url)
        .then((response) => response.json())
        .then((data) => {
          newResults.push(data);
        });
    });
    response.results = newResults;
    return response;
  }

  async getPokemonByNameOrId(name: string) {
    try {
      const lowerName = name.toLocaleLowerCase();
      let response = {};
      await fetch(`${this.apiUrl}/pokemon/${lowerName}`)
        .then((response) => response.json())
        .then((data) => {
          response = data;
        });

      return response;
    } catch (err) {
      console.log('err', err);
      return 'Erro na Requisição';
    }
  }
}
