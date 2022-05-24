import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trainer } from '../interface/trainer';

@Injectable({
  providedIn: 'root'
})
export class GameUiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrainer() {
    return this.http.get<Trainer>(`${this.apiUrl}/trainer/1`)
  }

}
