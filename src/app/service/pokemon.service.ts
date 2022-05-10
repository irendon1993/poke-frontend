import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { Pokemon } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('http://127.0.0.1:3000/pokemon/')
  }

  getPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>('http://127.0.0.1:3000/pokemon/237')
  }
}
