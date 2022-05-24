import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../service/pokemon.service';
// import { Trainer } from '../interface/trainer';

export interface User {
  id: number;
  name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // id: any[] = [];
  // myFinalValue: any;

  // constructor(private pokemonService: PokemonService) { }

  // someMethod() {
  //   this.pokemonService.getUserId()
  //   .subscribe(id => this.myFinalValue = id.data[0].id)
  // }



  // // private apiUrl = environment.apiUrl;
  // userUrl = `http://127.0.0.1:3000/master/2`
  // constructor(private http: HttpClient) { }

  // getUser() {
  //   return this.http.get<User>(this.userUrl);
  // }

  // getUserResponse(): Observable<HttpResponse<User>> {
  //   return this.http.get<User>(this.userUrl, { observe: 'response'})
  // }



}
