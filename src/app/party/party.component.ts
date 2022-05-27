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

  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokeParty: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  partyResponse: BehaviorSubject<any> = new BehaviorSubject({});

  partyOne:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  partyTwo:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  partyThree:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.onGetTrainerId();
    // this.onGetPokemon();
  }

onGetTrainerId(): void {
  this.partyService.getUserId().subscribe(
    (response) => { 
    // const test = response.pokeParty
    // console.log(test)
    this.pokeResponse.next(response);
  },
    (error: any) => console.log(error),
    () => {

    this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
    this.partyService.getPokemon(this.pokeParty.value[0]).subscribe(
   
      (response) => { 
      this.partyResponse.next(response);
    },

      (error: any) => console.log(error),

      () => {
      this.partyOne.next(this.partyResponse.value.iamgeurl) 
      // console.log(this.partyResponse.value.iamgeurl)
      } 

    );

    this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
    this.partyService.getPokemon(this.pokeParty.value[1]).subscribe(
    
    (response) => { 
      this.partyResponse.next(response);
    },

      (error: any) => console.log(error),

      () => {
      this.partyTwo.next(this.partyResponse.value.iamgeurl) 
      // console.log(this.partyResponse.value.iamgeurl)
      } 

    );

    this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
    this.partyService.getPokemon(this.pokeParty.value[2]).subscribe(
    
    (response) => { 
      this.partyResponse.next(response);
    },

      (error: any) => console.log(error),

      () => {
      this.partyThree.next(this.partyResponse.value.iamgeurl) 
      // console.log(this.partyResponse.value.iamgeurl)
      } 
    
    );
    
    },
  );
}


// onGetPokemon(): void {
// this.partyService.getPokemon(this.pokeParty.value[0]).subscribe(
//   (response) => { 
//   const test = response.iamgeurl
//   console.log(test)
//   console.log(response)
//   this.partyResponse.next(response);
// },
//   (error: any) => console.log(error),
//   () => {
//   this.iamgeurl.next(JSON.parse(this.partyResponse.value.iamgeurl)) 
//   // console.log(this.pokeParty.value)
//   console.log(this.pokeParty.value[0])
//   } 
// );
// }


}
