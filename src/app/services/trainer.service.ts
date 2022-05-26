import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

export interface Trainer {
  id: string;
  name: string;
  poke_party: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private trainers$ = new BehaviorSubject<Trainer[]>([]);

  constructor(private http: HttpClient) { }

  public init(): void {
    this.http
    .get<Trainer[]>('http://127.0.0.1:3000/masters/2')
    .subscribe((trainers)=> {
      this.trainers$.next(trainers);
    });
  }

  public getTrainers(): Observable<Trainer[]> {
    return this.trainers$
  }


}
