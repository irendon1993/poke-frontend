import { Component, OnInit} from '@angular/core';
import { Pokemon } from '../interface/pokemon';
import { PokemonService, Response, User } from '../pokemon/pokemon.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  error: any;
  user: User| undefined;

  pokeResponse: BehaviorSubject<any> = new BehaviorSubject<any>({});
  pokeParty: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.onGetUserId();
    this.onGetTrainerId();
  }

  onGetUserId() {
    this.pokemonService.getUserId()
    .subscribe(data => this.user = {
      id: (data as any).id,
      name:  (data as any).name,
    });
  }

onGetTrainerId(): void {
  this.pokemonService.getUserId().subscribe(
    (response) => { 
    const test = response.pokeParty
    console.log(test)
    console.log(response)
    this.pokeResponse.next(response);
  },
    (error: any) => console.log(error),
    () => {
    this.pokeParty.next(JSON.parse(this.pokeResponse.value.poke_party)) 
    // console.log(this.pokeParty.value)
    console.log(this.pokeParty.value[0])
    } 
  );
}

}
