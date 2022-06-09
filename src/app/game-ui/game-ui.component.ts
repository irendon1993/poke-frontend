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

  gameResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  party:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  zoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  zone: BehaviorSubject<any> = new BehaviorSubject([]);

  nextZoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  nextZone: BehaviorSubject<any> = new BehaviorSubject([]);

  
  
  trainerResponse: BehaviorSubject<any> = new BehaviorSubject({});
  directionsResponse: BehaviorSubject<any> = new BehaviorSubject({});
  directions:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  picArray:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  trainerName = '';
  traveling = false;
  catching = false;
  newGame = true;
  gameOver = false;
  pokeBalls= 0;
  
  newTrainerResponse: BehaviorSubject<any> = new BehaviorSubject({});
  

  wildPokemonResponse: BehaviorSubject<any> = new BehaviorSubject({});
  wildPokemon:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  randomWildPokemon = 0;
  pokemonToCatch:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  
  pokemonToPcResponse: BehaviorSubject<any> = new BehaviorSubject({});
  pcResponse: BehaviorSubject<any> = new BehaviorSubject([]);
  pc: any;
  pics: any;
  pcPicArray: any;
 
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
  
  onNewGame() {
    this.gameService.newGame(this.trainerName).subscribe(
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.gameService.setGameState(1).subscribe()
        this.gameService.getLastTrainer().subscribe(
          (response) => {
            this.newTrainerResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            // console.log(this.newTrainerResponse.value.id)
            this.gameService.updateActiveTrainer(this.newTrainerResponse.value.id).subscribe()
            this.gameService.changeZoneState(this.newTrainerResponse.value.id,4).subscribe()
            this.gameService.setPokeballs(this.newTrainerResponse.value.id,3).subscribe()
            window.location.reload()
            
          }
        )
      }
    )
  }
  

  onGameInit() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
            this.newGame = this.pokeResponse.value.game_state;
            if(this.pokeResponse.value.game_state == 1) {
              this.newGame = false;
              this.traveling = true;
            }
            
            this.gameService.addPokemonToPc(this.pokeResponse.value.active_trainer,[]).subscribe()
            this.gameService.addPcPic(this.pokeResponse.value.active_trainer,[]).subscribe()
            console.log(this.pokeResponse.value)
           }
    )
  }
  onGetZone() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.gameResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.gameResponse.value.active_trainer).subscribe(
      
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.zone.next(JSON.parse(this.pokeResponse.value.currentZone))
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.directionsResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.directions.next(JSON.parse(this.directionsResponse.value.directions))
            // console.log(this.zone.value)
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
      this.pokeResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
    this.gameService.getTrainer(this.pokeResponse.value.active_trainer).subscribe(
    (response) => {
      this.trainerResponse.next(response);
    },
    (error: any) => console.log(error),
    () => {
      // console.log(this.trainerResponse.value.pic_array)
      this.picArray.next(JSON.parse(this.trainerResponse.value.pic_array))
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
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.pokeResponse.value.active_trainer).subscribe(

      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.zone.next(JSON.parse(this.pokeResponse.value.currentZone))
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.zoneResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.wildPokemon.next(JSON.parse(this.zoneResponse.value.wild_pokemon));
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
                this.gameService.changeCurrentPokemon(this.pokeResponse.value.id, this.wildPokemonResponse.value.id).subscribe()
                
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
        this.gameResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      // console.log(this.gameResponse.value)
      this.gameService.getTrainer(this.gameResponse.value.active_trainer).subscribe(
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        
        this.pokeBalls = this.pokeResponse.value.pokeballs
        // this.pokeBalls = this.pokeBalls.toInt();
        console.log(this.pokeResponse.value)
        console.log(this.pokeBalls)
        this.gameService.setPokeballs(this.pokeResponse.value.id,this.pokeBalls-1).subscribe()
        console.log(this.pokeBalls)
        if(this.pokeBalls <= 0) {
          this.pics = JSON.parse(this.pokeResponse.value.pic_array);
            this.gameOver = true;
            console.log(this.pics)
          }

        else {
          console.log(this.pokeResponse.value)
          this.pc = JSON.parse(this.pokeResponse.value.pc)
          // console.log(this.pc)
          this.pc.push(this.pokeResponse.value.current_pokemon)
          
          
          this.gameService.getPokemon(this.pokeResponse.value.current_pokemon).subscribe(
            (response) => {
                    this.pokemonToPcResponse.next(response);
                  },
                  (error: any) => console.log(error),
                  () => {

                    // console.log(this.pokemonToPcResponse.value.iamgeurl)

                    this.pics = JSON.parse(this.pokeResponse.value.pic_array);
                    // this.pics.push(this.pokeResponse.value.current_pokemon)
                    this.pics.push(this.pokemonToPcResponse.value.iamgeurl)

                    if(this.pics[0] == 0) {
                      this.pics.shift();
                      // console.log(this.pics)
                      this.gameService.addPcPic(this.pokeResponse.value.id, this.pics).subscribe()
                      this.gameService.addPokemonToPc(this.pokeResponse.value.id, this.pc).subscribe()
                    } else {

                    // console.log(this.pics)
                    this.gameService.addPcPic(this.pokeResponse.value.id, this.pics).subscribe()
                    this.gameService.addPokemonToPc(this.pokeResponse.value.id, this.pc).subscribe()
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
        this.gameResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
      this.gameService.getTrainer(this.gameResponse.value.active_trainer).subscribe(

      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
        this.zone.next(JSON.parse(this.pokeResponse.value.currentZone))
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.directionsResponse.next(response);
          },
          (error: any) => console.log(error),
          () => {
            this.nextZone.next(JSON.parse(this.directionsResponse.value.next_zone))
            this.gameService.changeZoneState(this.pokeResponse.value.id, this.nextZone.value[1]).subscribe(
            
            (response) => { 
                this.nextZoneResponse.next(response);
                // console.log(this.nextZoneResponse)
            },
            (error: any) => console.log(error),
            () => {
              console.log(this.nextZone)
              console.log(this.pokeResponse.value.id)
              console.log(this.nextZone.value[0])
            

              window.location.reload()
              // this.gameState()
              // this.gameService.getZoneData(this.nextZone.value[0])  
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