import { Component, OnInit } from '@angular/core';
import {UserService, User} from './user.service';
// import {Trainer} from '../interface/trainer'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  error: any;
  headers: string[] = [];
  user: User| undefined;

  constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.showTrainer
  //   this.showTrainer_v1
  // }

  


  // showUser() {
  //   this.userService.getUser()
  //   .subscribe({
  //     next: (data: User) => this.user = {...data},
  //     error: error => this.error = error,
  //   });
  // }

  // showUser_v1() {
  //   this.userService.getUser()
  //   .subscribe((data: User)=> this.user = {
  //     id: data.id,
  //     name: data.name
  //   })
  // }

  // showUserResponse() {
  //   this.userService.getUserResponse()
  //   .subscribe(resp =>{
  //     const keys = resp.headers.keys();
  //       this.headers = keys.map(key =>
  //         `${key}: ${resp.headers.get(key)}`);

  //       // access the body directly, which is typed as `Config`.
  //       this.user = { ...resp.body! };
  //   })
  // }

}
