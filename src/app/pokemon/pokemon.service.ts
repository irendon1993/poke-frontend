import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { Pokemon } from '../interface/pokemon';
import { environment } from 'src/environments/environment';

export interface User {
  id: number;
  name: string;
  pokeParty?: string[];
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Response {
  id: number;
  name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/pokemon`)
  }

  getPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/245`)
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.apiUrl}/create`,pokemon)
  }

  getUserId(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/master/2`)
  }

  
}
