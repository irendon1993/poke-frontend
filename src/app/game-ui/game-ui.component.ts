import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { GameUiService, NewZone } from './game-ui.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})
export class GameUiComponent implements OnInit {

  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});

  zoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  zone: BehaviorSubject<any> = new BehaviorSubject([]);
  nextZone: BehaviorSubject<any> = new BehaviorSubject([]);

  
  
  directionsResponse: BehaviorSubject<any> = new BehaviorSubject({});
  directions:BehaviorSubject<any> = new BehaviorSubject<any>([]);



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
  
  onGetZone() {
    this.gameService.getTrainer().subscribe(
      (response) => {
        this.pokeResponse.next(response);
        // console.log(response)
        // console.log(this.pokeResponse)
        // console.log(this.zone)
      },

      (error: any) => console.log(error),
      () => {
        this.zone.next(JSON.parse(this.pokeResponse.value.currentZone))
        // console.log(this.zone.value)
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.directionsResponse.next(response);
          },
          
            (error: any) => console.log(error),
      
            () => {
            this.directions.next(JSON.parse(this.directionsResponse.value.directions))
            console.log(this.zone.value)
        
            // console.log(this.partyResponse.value.iamgeurl)
            } 
        ) 
  },
)
}

  zoneTest(){
    this.gameService.changeZoneState2()
    console.log("hello")
  }

  // On Option one change player zone to  next zone
  //  then get zone data
  onOptionOne(): void {
    // On submit update trainer zone
    this.gameService.getTrainer().subscribe(
      (response) => {
        this.pokeResponse.next(response);
        console.log(response)
        // 
      },
      (error: any) => console.log(error),
      () => {

        this.zone.next(JSON.parse(this.pokeResponse.value.currentZone))
        // console.log(this.zone.value)
        this.gameService.getZoneData(this.zone.value).subscribe(
          
          (response) => { 
            this.directionsResponse.next(response);
          },
          
            (error: any) => console.log(error),
      
            () => {
            this.nextZone.next(JSON.parse(this.directionsResponse.value.next_zone))
            // console.log(this.directionsResponse.value)
            console.log(this.nextZone.value)

            this.gameService.changeZoneState(this.pokeResponse.value.id,this.nextZone.value[0])
            console.log(this.pokeResponse.value.id)
            console.log(this.nextZone.value[0])
            
            this.gameService.getZoneData(this.nextZone.value[0])  
        
        
            // console.log(this.partyResponse.value.iamgeurl)
            }
            
        ) 
      },


    )
  }
}