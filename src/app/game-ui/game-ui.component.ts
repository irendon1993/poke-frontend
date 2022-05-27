import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { GameUiService } from './game-ui.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})
export class GameUiComponent implements OnInit {

  zoneResponse: BehaviorSubject<any> = new BehaviorSubject({});
  zone: BehaviorSubject<any> = new BehaviorSubject([]);

  directions:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
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
  }
  
  onGetZone(): void {
    this.gameService.getZone().subscribe(
      (response) => {
        this.zoneResponse.next(response);
        console.log(response)
        console.log(this.zoneResponse)
        // console.log(this.zone)
      },

      (error: any) => console.log(error),
      () => {
        this.directions.next(JSON.parse(this.zoneResponse.value.directions))
        console.log(this.directions)

    // this.zone.next(JSON.parse(this.zoneResponse.value.directions))
    // this.gameService.getZoneData(this.zone.value[0]).subscribe(
      // (response) => { 
      //   this.zoneResponse.next(response);
      // },
  
      //   (error: any) => console.log(error),
  
      //   () => {
      //   this.directionOne.next(this.zoneResponse.value.direction[0]) 
      //   console.log(this.zoneResponse.value.direction[0]);
      //   } 
    // )

  },


)}
}