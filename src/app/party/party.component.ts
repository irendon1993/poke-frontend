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

  partyOne:BehaviorSubject<any> = new BehaviorSubject<any>([]);
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
          this.partyResponse.next(JSON.parse(this.trainerResponse.value.pic_array))
          this.party = this.partyResponse.value
          console.log(this.party)
          if(this.party[0] == 0) {
            this.party.shift()
          }
          console.log(this.party.length)
          this.pokemonCaught = this.party.length
          
          
          if(this.pokemonCaught == 1) {
            this.partyService.getPokemon(this.partyResponse.value[0]).subscribe(
              (response) => { 
                this.pokeParty.next(response);
              },
                (error: any) => console.log(error),
                () => {
                  this.partyOne.next(this.pokeParty.value.iamgeurl)
                }
            )
          } else if (this.pokemonCaught == 2) {
              this.partyService.getPokemon(this.partyResponse.value[0]).subscribe(
                (response) => { 
                  this.pokeParty.next(response);
                },
                  (error: any) => console.log(error),
                  () => {
                    this.partyOne.next(this.pokeParty.value.iamgeurl)
                    this.partyService.getPokemon(this.partyResponse.value[1]).subscribe(
                      (response) => { 
                        this.pokeParty.next(response);
                      },
                        (error: any) => console.log(error),
                        () => {
                          this.partyTwo.next(this.pokeParty.value.iamgeurl)
                        }
                    )
                  }
              )
            } else if(this.pokemonCaught >= 3) {
              this.partyService.getPokemon(this.partyResponse.value[0]).subscribe(
                (response) => { 
                  this.pokeParty.next(response);
                },
                  (error: any) => console.log(error),
                  () => {
                    this.partyOne.next(this.pokeParty.value.iamgeurl)
                    this.partyService.getPokemon(this.partyResponse.value[1]).subscribe(
                      (response) => { 
                        this.pokeParty.next(response);
                      },
                        (error: any) => console.log(error),
                        () => {
                          this.partyTwo.next(this.pokeParty.value.iamgeurl)
                          this.partyService.getPokemon(this.partyResponse.value[2]).subscribe(
                            (response) => { 
                              this.pokeParty.next(response);
                            },
                              (error: any) => console.log(error),
                              () => {
                                this.partyThree.next(this.pokeParty.value.iamgeurl)
                                
                              }
                          )
                        }
                    )
                  }
              )
            }   
          } 
    )
    }
  )
}
//     this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
//     this.partyService.getPokemon(this.pokeParty.value[0]).subscribe(
   
//       (response) => { 
//       this.partyResponse.next(response);
//     },

//       (error: any) => console.log(error),

//       () => {
//       this.partyOne.next(this.partyResponse.value.iamgeurl) 
//       // console.log(this.partyResponse.value.iamgeurl)
//       } 

//     );

//     this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
//     this.partyService.getPokemon(this.pokeParty.value[1]).subscribe(
    
//     (response) => { 
//       this.partyResponse.next(response);
//     },

//       (error: any) => console.log(error),

//       () => {
//       this.partyTwo.next(this.partyResponse.value.iamgeurl) 
//       // console.log(this.partyResponse.value.iamgeurl)
//       } 

//     );

//     this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
//     this.partyService.getPokemon(this.pokeParty.value[2]).subscribe(
    
//     (response) => { 
//       this.partyResponse.next(response);
//     },

//       (error: any) => console.log(error),

//       () => {
//       this.partyThree.next(this.partyResponse.value.iamgeurl) 
//       // console.log(this.partyResponse.value.iamgeurl)
//       } 
    
//     );
    
//     },
//   );
// }


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
