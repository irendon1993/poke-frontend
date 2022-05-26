import { Component, OnInit} from '@angular/core';
import { Pokemon } from './interface/pokemon';
import { PokemonService, Response, User } from './pokemon/pokemon.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  error: any;
  user: User| undefined;

  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokeParty: BehaviorSubject<any> = new BehaviorSubject<any>([]);



  // private pokemon: Pokemon = {
  //   'pokeid': '455',
  //   'name': 'mew',
  //   'iamgeurl': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
  // }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    
    // this.onGetUserId();
    // this.onGetTrainerId();
    // this.onGetUserData();
    // this.onGetPokemons();
    // this.onGetPokemon();
    // this.onCreatePokemon();
    }

    // onGetUserId() {
    //   this.pokemonService.getUserId()
    //   .subscribe(data => this.user = {
    //     id: (data as any).id,
    //     name:  (data as any).name,
    //   });
    // }

  // onGetTrainerId(): void {
  //   this.pokemonService.getUserId().subscribe(
  //     (response) => { 
  //     const test = response.pokeParty
  //     console.log(test)
  //     console.log(response)
  //     this.pokeResponse.next(response);
  //   },
  //     (error: any) => console.log(error),
  //     () => {
  //     this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
  //     // console.log(this.pokeParty.value)
  //     console.log(this.pokeParty.value[0])
  //     } 
  //   );
  // }

  // onGetPokemons(): void {
  //   this.pokemonService.getPokemons().subscribe(
  //     (response) => console.table(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done getting Poekmon')
  //   );
  // }

  // onGetPokemon(): void {
  //   this.pokemonService.getPokemon().subscribe(
  //     (response) => console.table(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done getting Poekmon')
  //   );
  // }

  // onCreatePokemon(): void {
  //   this.pokemonService.createPokemon(this.pokemon).subscribe(
  //     (response) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done creating Pokemon')
  //   );
  // }


   

  
  

}
