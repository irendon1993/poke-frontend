import { Component, OnInit} from '@angular/core';
import { PokemonService} from './service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poke-frontend';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.onGetPokemons();
    }

  onGetPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Poekmon')
    );
  }

}
