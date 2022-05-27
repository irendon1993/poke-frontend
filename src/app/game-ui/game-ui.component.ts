import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'


@Component({
  selector: 'game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})
export class GameUiComponent implements OnInit {

  constructor( private http:HttpClient){}
  onSubmit(data: any) 
  {
    this.http.post('http://localhost:3000/sign_up', data)
    .subscribe((result)=>{
      console.warn("result",result)
    })
    console.warn(data)
  }
  
  ngOnInit(): void {
  }
  
  


}
