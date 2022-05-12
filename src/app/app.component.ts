import { Component, OnInit} from '@angular/core';
import { Pokemon } from './interface/pokemon';
import { PokemonService} from './service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poke-frontend';

  private pokemon: Pokemon = {
    'pokeid': '455',
    'name': 'mew',
    'iamgeurl': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // this.onGetPokemons();
    // this.onGetPokemon();
    // this.onCreatePokemon();
    }

  onGetPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (response) => console.table(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Poekmon')
    );
  }

  onGetPokemon(): void {
    this.pokemonService.getPokemon().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Pokemon')
    );
  }
  
  // onCreatePokemon(): void {
  //   this.pokemonService.createPokemon(this.pokemon).subscribe(
  //     (response) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done creating Pokemon')
  //   );
  // }

}
