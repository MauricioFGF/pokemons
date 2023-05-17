import { Component } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { ActivatedRoute } from '@angular/router';
import translate from 'translate';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css'],
})
export class PokemonProfileComponent {
  loading: boolean = true;
  error: boolean = false;
  details: any = {};
  description: string = 'Carregando...';

  constructor(private pokedex: PokedexService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getPokemonById(id);
  }

  async getPokemonById(id: any): Promise<void> {
    this.loading = true;
    try {
      const response = await this.pokedex.getPokemonByNameOrId(id);
      if (response === 'Erro na Requisição') {
        this.details = [];
        this.error = true;
      } else {
        this.details = response;
        this.getDescription(this.details.species.url);
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      this.loading = false;
    }
  }

  async getDescription(url: string) {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let textConcat = 'Sem Descrição';
          data.flavor_text_entries.some((text: any) => {
            if (text.language.name === 'en') {
              textConcat = text.flavor_text;
              return true;
            }
            return false;
          });
          console.log(textConcat);
          this.description = textConcat;
        });
    } catch (err) {
      console.log('err', err);
      this.description = 'Sem Descrição';
    }
  }
}
