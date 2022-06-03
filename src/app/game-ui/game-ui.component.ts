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

  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  party:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  zoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  zone: BehaviorSubject<any> = new BehaviorSubject([]);

  nextZoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  nextZone: BehaviorSubject<any> = new BehaviorSubject([]);

  
  
  directionsResponse: BehaviorSubject<any> = new BehaviorSubject({});
  directions:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  // catchingPokemon = false;
  traveling = false;
  newGame = true;
  gameOver = false;
  pokeBalls = 5;

  wildPokemonResponse: BehaviorSubject<any> = new BehaviorSubject({});
  wildPokemon:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  randomWildPokemon = 0;
  pokemonToCatch:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  
  pokemonToPcResponse: BehaviorSubject<any> = new BehaviorSubject({});
  pcResponse: BehaviorSubject<any> = new BehaviorSubject([]);
  pc: any;
  pcArray: Observable<any>[]=[];
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
    // this.zoneTest();
    // this.onOptionOne();
  }

  

  onGameInit() {
    this.gameService.getGameState().subscribe(
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {
            // console.log(this.pokeResponse.value.game_state)
            this.newGame = this.pokeResponse.value.game_state;
            // console.log(this.newGame)
            if(this.pokeResponse.value.game_state == 1) {
              this.newGame = false;
              this.traveling = true;
            }
            
           }
    )
  }


  reload() {
    window.location.reload();
  }



  

  // setGameState0() {
  //   this.catchingPokemon = 0
  // }
  // setGameState1() {
  //   this.catchingPokemon = 1
  // }
  // setGameState2() {
  //   this.catchingPokemon = 2
  // }
  // setGameState3() {
  //   this.catchingPokemon = 3
  // }

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

    this.gameService.getTrainer().subscribe(

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
                console.log(this.wildPokemonResponse.value.id)
                console.log(this.pokeResponse.value.id)
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
    
  throwPokeball() {
    this.gameService.getTrainer().subscribe(
      (response) => {
        this.pokeResponse.next(response);
      },
      (error: any) => console.log(error),
      () => {

        // console.log(this.pokeResponse.value)
        // this.pcArray.push(this.pokeResponse.value.pc)
        // console.log(this.pcArray)
        this.pc = JSON.parse(this.pokeResponse.value.pc)
        console.log(this.pc)
        this.pc.push(this.pokeResponse.value.current_pokemon)
        console.log(this.pc)
        this.pokeBalls --
        // console.log(this.pokeBalls)
        if(this.pokeBalls === 0) {
          this.gameOver = true;
        
        }
        
        this.gameService.addPokemonToPc(this.pokeResponse.value.id, this.pc).subscribe()

        // this.pokemonToPcResponse.next(res)
      }
    )
  }

  

  onGetZone() {
    this.gameService.getTrainer().subscribe(
      
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
            console.log(this.zone.value)
            } 
        ) 
  },
)
}

  

  // On Option one change player zone to  next zone
  //  then get zone data
  onOptionOne(): void {
    // On submit update trainer zone
    this.gameService.getTrainer().subscribe(

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
            
        
        
            // console.log(this.partyResponse.value.iamgeurl)
            }
            
        ) 
      },


    )
  }
}