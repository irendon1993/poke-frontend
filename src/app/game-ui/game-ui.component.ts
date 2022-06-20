import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { GameUiService, NewZone } from './game-ui.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})

export class GameUiComponent implements OnInit {
  newGameResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  enterZoneResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  newTrainerResponse: BehaviorSubject<any> = new BehaviorSubject({});
  
  gameInitResponse: BehaviorSubject<any> = new BehaviorSubject({});
  
  zoneGetResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  zoneSetResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  directionsResponse: BehaviorSubject<any> = new BehaviorSubject({});
  directions:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  getTrainerResponse: BehaviorSubject<any> = new BehaviorSubject({});
  trainerResponse: BehaviorSubject<any> = new BehaviorSubject({});
  
  catchPokemonResponse: BehaviorSubject<any> = new BehaviorSubject({});
  zoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  wildPokemonResponse: BehaviorSubject<any> = new BehaviorSubject({});
  wildPokemon:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  randomWildPokemon = 0;
  pokemonToCatch:BehaviorSubject<any> = new BehaviorSubject<any>([]);


  throwPokeballResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokeballThrownResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokemonToPcResponse: BehaviorSubject<any> = new BehaviorSubject({});
  pcResponse: BehaviorSubject<any> = new BehaviorSubject([]);
  pc: any;
  pics: any;
  pcPicArray: any;

  optionOneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  optionOnePressedResponse: BehaviorSubject<any> = new BehaviorSubject({});
  optionOneDirectionsResponse: BehaviorSubject<any> = new BehaviorSubject({});
  nextZoneResponse: BehaviorSubject<any> = new BehaviorSubject({});


  // pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  party:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  zone: BehaviorSubject<any> = new BehaviorSubject([]);

  nextZone: BehaviorSubject<any> = new BehaviorSubject([]);

  
  
  
  picArray:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  trainerName = '';
  traveling = false;
  catching = false;
  newGame = true;
  inCenter = false;
  gameOver = false;
  pokeBalls= 0;
  randomCaught = 100;
  gameText = '';
  
  
  
 
  // pc:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  

  // getZone = ''

  
  constructor( private gameService: GameUiService){}

  // onSubmit(data: any) 
  // {
  //   this.http.post('http://localhost:3000/sign_up', data)
  //   .subscribe((result)=>{
  //     console.warn("result",result)
  //   })
  //   console.warn(data)
  // }
  
  ngOnInit(): void {
    this.onGameInit();
    this.onGetZone();
    // this.onGetTrainerId();
    // this.zoneTest();
    // this.onOptionOne();
  }
 
  startOver() {
    this.gameService.setGameState(0).subscribe()
    this.gameService.updateActiveTrainer(0).subscribe()
    window.location.reload()
  }

  enterZone() {
    this.gameService.getLastTrainer().subscribe(
      (response) => {
        this.enterZoneResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.gameService.setGameState(1).subscribe()
        this.gameService.addPokemonToPc(this.enterZoneResponse.value.id,[]).subscribe()
        this.gameService.addPcPic(this.enterZoneResponse.value.id,[]).subscribe()
        window.location.reload() 
      }
    )
  }
  
  onNewGame() {
    this.gameService.newGame(this.trainerName).subscribe(
      (response) => {
        this.newGameResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      
        this.gameService.getLastTrainer().subscribe(
          (response) => {
            this.newTrainerResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            // console.log(this.newTrainerResponse.value.id)
            
            this.gameService.updateActiveTrainer(this.newTrainerResponse.value.id).subscribe()
            this.gameService.changeZoneState(this.newTrainerResponse.value.id,8).subscribe()
            this.gameService.setPokeballs(this.newTrainerResponse.value.id,20).subscribe()
            this.newGame = false;
            this.inCenter = true;
            
            
          }
        )
      }
    )
  }
  

  onGameInit() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.gameInitResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
            this.newGame = this.gameInitResponse.value.game_state;
            if(this.gameInitResponse.value.game_state == 1) {
              this.newGame = false;
              this.traveling = true;
              console.log(this.traveling)
            }
            
            
            console.log(this.gameInitResponse.value)
           }
    )
  }
  onGetZone() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.zoneGetResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.zoneGetResponse.value.active_trainer).subscribe(
      
      (response) => {
        this.zoneSetResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        console.log(this.zoneSetResponse.value.currentZone)
        this.zone.next(this.zoneSetResponse.value.currentZone)
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.directionsResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.directions.next(this.directionsResponse.value.directions)
            console.log(this.directions.value)
            } 
        ) 
  },
)
      }
    )
}


onGetTrainerId() {
  this.gameService.getGameState().subscribe(
    (response) => {
      this.getTrainerResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
    this.gameService.getTrainer(this.getTrainerResponse.value.active_trainer).subscribe(
    (response) => {
      this.trainerResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
      // console.log(this.trainerResponse.value.pic_array)
      this.picArray.next(this.trainerResponse.value.pic_array)
      // console.log(this.picArray.value)
    }
  )
}
  )
}

  reload() {
    window.location.reload();
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  
  catchPokemon() {
    if(this.traveling === false) {
      this.traveling = true;
    }
    else {
      this.traveling = false;
    }

    this.gameService.getGameState().subscribe(
      (response) => {
        this.catchPokemonResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.catchPokemonResponse.value.active_trainer).subscribe(

      (response) => {
        this.catchPokemonResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.zone.next(this.catchPokemonResponse.value.currentZone)
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.zoneResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.wildPokemon.next(this.zoneResponse.value.wild_pokemon);
            this.randomWildPokemon = this.getRandomInt(this.wildPokemon.value.length)
           

            this.gameService.getPokemon(this.wildPokemon.value[this.randomWildPokemon]).subscribe(
              (response) => {
                
                this.wildPokemonResponse.next(response);
                // console.log(this.wildPokemonResponse.value.id)
                // console.log(this.pokeResponse.value.id)
              },
              (error: any) => console.log(error),
              () => {
                this.pokemonToCatch.next(this.wildPokemonResponse.value.iamgeurl)
                this.gameService.changeCurrentPokemon(this.catchPokemonResponse.value.id, this.wildPokemonResponse.value.id).subscribe()
                
              }
            )
          }
        )
        }
    )
  }
    )
}
    
  throwPokeball() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.throwPokeballResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      // console.log(this.gameResponse.value)
      this.gameService.getTrainer(this.throwPokeballResponse.value.active_trainer).subscribe(
      (response) => {
        this.pokeballThrownResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.randomCaught = this.getRandomInt(100)
        this.pokeBalls = this.pokeballThrownResponse.value.pokeballs
        // this.pokeBalls = this.pokeBalls.toInt();
        // console.log(this.pokeballThrownResponse.value)
        // console.log(this.pokeBalls)
        this.gameService.setPokeballs(this.pokeballThrownResponse.value.id,this.pokeBalls-1).subscribe()
        console.log(this.pokeBalls)
        if(this.pokeBalls <= 0) {
          this.pics = this.pokeballThrownResponse.value.pic_array;
            this.gameOver = true;
            console.log(this.pics)
          }
        else if(this.pokeBalls > 0 && this.randomCaught < 61) {
          console.log(this.randomCaught)

        }

        else if (this.randomCaught > 61){
          console.log(this.pokeballThrownResponse.value)
          console.log(this.randomCaught)
          this.pc = this.pokeballThrownResponse.value.pc
          // console.log(this.pc)
          this.pc.push(this.pokeballThrownResponse.value.current_pokemon)
          
          
          this.gameService.getPokemon(this.pokeballThrownResponse.value.current_pokemon).subscribe(
            (response) => {
                    this.pokemonToPcResponse.next(response);
                  },
                  (error: any) => console.log(error),
                  () => {

                    // console.log(this.pokemonToPcResponse.value.iamgeurl)

                    this.pics = this.pokeballThrownResponse.value.pic_array;
                    // this.pics.push(this.pokeResponse.value.current_pokemon)
                    this.pics.push(this.pokemonToPcResponse.value.iamgeurl)

                    if(this.pics[0] == 0) {
                      this.pics.shift();
                      // console.log(this.pics)
                      this.gameService.addPcPic(this.pokeballThrownResponse.value.id, this.pics).subscribe()
                      this.gameService.addPokemonToPc(this.pokeballThrownResponse.value.id, this.pc).subscribe()
                    } else {

                    // console.log(this.pics)
                    this.gameService.addPcPic(this.pokeballThrownResponse.value.id, this.pics).subscribe()
                    this.gameService.addPokemonToPc(this.pokeballThrownResponse.value.id, this.pc).subscribe()
                    this.traveling = true;
                    window.location.reload()
                    }
                    
                  }
                
          )
          
        }

       
      }
    )
    
  }
    )
}
  


  

  // On Option one change player zone to  next zone
  //  then get zone data
  onOptionOne(): void {
    // On submit update trainer zone
    this.gameService.getGameState().subscribe(
      (response) => {
        this.optionOneResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.optionOneResponse.value.active_trainer).subscribe(

      (response) => {
        this.optionOnePressedResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.zone.next(this.optionOnePressedResponse.value.currentZone)
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.optionOneDirectionsResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.nextZone.next(this.optionOneDirectionsResponse.value.next_zone)
            
            this.gameService.changeZoneState(this.optionOnePressedResponse.value.id, this.nextZone.value[0]).subscribe(
            
            (response) => { 
                this.nextZoneResponse.next(response);
            },
            (error: any) => console.log(error),
            () => {
              console.log(this.nextZone.value)
              window.location.reload()
            }
            );
            } 
        ) 
      },
    )
  }
    )
}


onOptionTwo(): void {
  // On submit update trainer zone
  this.gameService.getGameState().subscribe(
    (response) => {
      this.optionOneResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
    this.gameService.getTrainer(this.optionOneResponse.value.active_trainer).subscribe(

    (response) => {
      this.optionOnePressedResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
      this.zone.next(this.optionOnePressedResponse.value.currentZone)
      this.gameService.getZoneData(this.zone.value).subscribe(
        
        (response) => { 
          this.optionOneDirectionsResponse.next(response);
        },
        (error: any) => console.log(error),
        () => {
          this.nextZone.next(this.optionOneDirectionsResponse.value.next_zone)
          this.gameService.changeZoneState(this.optionOnePressedResponse.value.id, this.nextZone.value[1]).subscribe(
          
          (response) => { 
              this.nextZoneResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            console.log(this.nextZone.value)
            window.location.reload()
          }
          );
          } 
      ) 
    },
  )
}
  )
}


onOptionThree(): void {
  // On submit update trainer zone
  this.gameService.getGameState().subscribe(
    (response) => {
      this.optionOneResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
    this.gameService.getTrainer(this.optionOneResponse.value.active_trainer).subscribe(

    (response) => {
      this.optionOnePressedResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
      this.zone.next(this.optionOnePressedResponse.value.currentZone)
      this.gameService.getZoneData(this.zone.value).subscribe(
        
        (response) => { 
          this.optionOneDirectionsResponse.next(response);
        },
        (error: any) => console.log(error),
        () => {
          this.nextZone.next(this.optionOneDirectionsResponse.value.next_zone)
          this.gameService.changeZoneState(this.optionOnePressedResponse.value.id, this.nextZone.value[2]).subscribe(
          
          (response) => { 
              this.nextZoneResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            window.location.reload()
          }
          );
          } 
      ) 
    },
  )
}
  )
}
}