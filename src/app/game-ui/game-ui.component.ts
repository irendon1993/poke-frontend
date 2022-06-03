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
  
  catchingPokemon = false;
  wildPokemonResponse: BehaviorSubject<any> = new BehaviorSubject({});
  wildPokemon:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  randomWildPokemon = 0;
  pokemonToCatch:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  
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
    this.onGetZone();
    // this.zoneTest();
    // this.onOptionOne();
  }

  reload() {
    if(this.catchingPokemon === false) {
      this.catchingPokemon = true;
    }
    else {
      this.catchingPokemon = false;
    }
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  
  
  catchPokemon() {
    if(this.catchingPokemon === false) {
      this.catchingPokemon = true;
    }
    else {
      this.catchingPokemon = false;
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
            // console.log(this.wildPokemon.value)
            this.randomWildPokemon = this.getRandomInt(this.wildPokemon.value.length)
           

            this.gameService.getPokemon(this.wildPokemon.value[this.randomWildPokemon]).subscribe(
              (response) => {
                
                this.wildPokemonResponse.next(response);
                console.log(this.wildPokemonResponse.value.id)
                console.log(this.pokeResponse.value.id)
              },
              (error: any) => console.log(error),
              () => {
                // console.log(this.wildPokemon.value)
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

  zoneTest(){
    this.gameService.getTrainer().subscribe(
      (response) => { 
        this.pokeResponse.next(response);
        console.log(this.pokeResponse.value.id)
      },
      (error: any) => console.log(error),
      () => {
        this.pcResponse.next(JSON.parse(this.pokeResponse.value.poke_party))
        
        console.log(this.pcResponse)
        this.pcArray.push(this.pcResponse.value)
        this.pc = this.pcResponse.value
        console.log(this.pc)
        this.pc.push('2')
        // console.log(this.pokeResponse)
        
        console.log(this.pc)
        this.gameService.addPokemonToPc(this.pokeResponse.value.id,this.pc).subscribe(

        )
        // console.log(this.pcArray[0])
       
        // this.gameService.getZoneData(4)
        
        // console.log(this.catchingPokemon)
        // this.catchingPokemon = true;
        // console.log(this.catchingPokemon)
        // window.location.reload()

      }
    );
    
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