import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { Pokemon } from '../interface/pokemon';
import { environment } from 'src/environments/environment';

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
}
