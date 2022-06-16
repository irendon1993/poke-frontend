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
    
   
   

  
  

}
