import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trainer } from '../interface/trainer';


export interface Response {
  id: number;
  name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  iamgeurl?: string;
  directions?: string[];
}

export interface User {
  id: number;
  name: string;
  pokeParty?: string[];
  iamgeurl?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Zone {
  id?: number;
  wildPokemon?: string[];
 

}

export interface NewZone {
  id?: any;
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


@Injectable({
  providedIn: 'root'
})

export class GameUiService {

  getNewZone = ''
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  catchingPokemon = false;
  

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  newGame(newName: any) :Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/master/create_master`,{"name": newName})
  }

  updateActiveTrainer(trainer:any): Observable<Trainer>{
    return this.http.put<Trainer>(`${this.apiUrl}/game2/1/update_trainer`, {trainer})
  }

  getLastTrainer(): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/master/last`)
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`)
  }

  getTrainer() {
    return this.http.get<Trainer>(`${this.apiUrl}/master/find/9`)
  }

  getZone(): Observable<Zone>  {
    return this.http.get<Zone>(`${this.apiUrl}/zone/3`)
  }
  
  getGameState(): Observable<Zone>  {
    return this.http.get<Zone>(`${this.apiUrl}/game2/1`)
  }

  setGameState(state :any): Observable<Zone> {
    return this.http.put<Zone>(`${this.apiUrl}/game2/1/update_state`, {state} )
  }

  getZoneData(id: any): Observable<Zone> {
    return this.http.get<Zone>(`${this.apiUrl}/zone/${id}`)
  }

  changeZoneState(id: number, zoneId: number): Observable<Zone>{
    return this.http.put<Zone>(`${this.apiUrl}/master/${id}/zone_update`, {"zone": `${zoneId}`},  this.httpOptions)
  }
  
  changeCurrentPokemon(id: number, pokemonId: number): Observable<Pokemon>{
    return this.http.put<Pokemon>(`${this.apiUrl}/master/${id}/pokemon_update`, {"pokemon": `${pokemonId}`},  this.httpOptions)
  }
  
  addPcPic(id: number, pokemon:any): Observable<Trainer>{
    return this.http.put<Trainer>(`${this.apiUrl}/master/${id}/pics_update`, {pokemon},  this.httpOptions)
  }

  addPokemonToPc(id: number, pokemon: any): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/master/${id}/pc_update`,  {pokemon} ,  this.httpOptions)
  }

  changeZoneState2(): Observable<Zone>  {
    // const params = new HttpParams()
    //   .set("zone": 2)
    return this.http.put<Zone>(`${this.apiUrl}/master/9/zone_update`, { "zone": 5}, this.httpOptions)
    
  }


}
