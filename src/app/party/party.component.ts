import { Component, OnInit} from '@angular/core';
import {Pokemon} from "./party.service"
// import { Pokemon } from '../interface/pokemon';
import { PokemonService, Response, User } from '../pokemon/pokemon.service';
import { BehaviorSubject } from 'rxjs';
import { PartyService } from './party.service';


@Component({
  selector: 'party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  error: any;
  user: User| undefined;


  pokeBallImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
  pokemonCaught: any;
  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});

  trainerResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  
  pokeParty: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  partyResponse: BehaviorSubject<any> = new BehaviorSubject({});
  party: any;

  partyOne:any;
  partyTwo:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  partyThree:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.onGetTrainerId();
    // this.onGetPokemon();
  }

onGetTrainerId(): void {
  this.partyService.getGameState().subscribe(
    (response) => { 
    this.pokeResponse.next(response);
  },
    (error: any) => console.log(error),
    () => {
    
    this.partyService.getUser(this.pokeResponse.value.active_trainer).subscribe(
      (response) => { 
        
      this.trainerResponse.next(response);
      },
        (error: any) => console.log(error),
        () => {
          console.log(this.trainerResponse.value)
          this.partyResponse.next(this.trainerResponse.value.pic_array)
          this.party = this.partyResponse.value
          console.log(this.party)
          if(this.party[0] == 0) {
            this.party.shift()
          }
          console.log(this.party.length)
          this.pokemonCaught = this.party.length
          console.log(this.partyResponse)
          
          if(this.pokemonCaught == 1) {
            this.partyOne = this.partyResponse.value[0]
          } else if (this.pokemonCaught == 2) {
            this.partyOne = this.partyResponse.value[0]
            this.partyTwo = this.partyResponse.value[1]
            } else if(this.pokemonCaught >= 3) {
              
              this.partyOne = this.partyResponse.value[0]
              this.partyTwo = this.partyResponse.value[1]
              this.partyThree = this.partyResponse.value[2]
            }                      
          }      
       ) 
     } 
   ) 
}
}
