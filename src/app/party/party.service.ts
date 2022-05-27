import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
// import { Pokemon } from '../interface/pokemon';
import { environment } from 'src/environments/environment';


export interface User {
  id: number;
  name: string;
  pokeParty?: string[];
  iamgeurl?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Pokemon {
  id?: number;
  pokeid: string;
  name: string;
  iamgeurl?: any;
  partyOne?: any;
  partyTwo?: any;
  created_at?: string;
  updated_at?: string;

}

// export interface Response {
//   id: number;
//   name: string;
//   password?: string;
//   created_at?: string;
//   updated_at?: string;
//   iamgeurl?: string;
// }


@Injectable({
  providedIn: 'root'
})

export class PartyService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`)
  }

  getUserId(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/master/6`)
  }

  // getPokemon(): Observable<Pokemon> {
  //   return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/245`)
  // }

  // createPokemon(pokemon: Pokemon): Observable<Pokemon> {
  //   return this.http.post<Pokemon>(`${this.apiUrl}/create`,pokemon)
  // }



  
}
