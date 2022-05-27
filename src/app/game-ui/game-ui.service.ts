import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrainer() {
    return this.http.get<Trainer>(`${this.apiUrl}/master/7`)
  }

  getZone(): Observable<Zone>  {
    return this.http.get<Zone>(`${this.apiUrl}/zone/3`)
  }

  getZoneData(id: number): Observable<Zone> {
    return this.http.get<Zone>(`${this.apiUrl}/zone/${id}`)
  }

}
