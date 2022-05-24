import { Component, OnInit} from '@angular/core';
import { Pokemon } from './interface/pokemon';
import { PokemonService, Response, User } from './service/pokemon.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  error: any;
  party: string[]=[];
  headers: string[] = [];
  data: any;
  user: User| undefined;
  title = 'poke-frontend';
  response : Response | undefined; 
  private apiUrl = environment.apiUrl;
  private pokemon: Pokemon = {
    'pokeid': '455',
    'name': 'mew',
    'iamgeurl': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
  }

  
  

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    
    this.onGetUserId();
    this.onGetTrainerId();
    // this.onGetUserData();
    // this.onGetPokemons();
    // this.onGetPokemon();
    // this.onCreatePokemon();
    }

  //   onGetUserData() {
  //   this.pokemonService.getUserId().subscribe(res => {
  //     console.log(res);
  //     this.data = res;
  //     console.log(this.data);
  //  });
  // }

    // public getuser() {
    //   return this.http.get(`${this.apiUrl}/trainer/1`)
    //   .map((res: Response))

    // }
  // onGetPokemons(): void {
  //   this.pokemonService.getPokemons().subscribe(
  //     (response) => console.table(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done getting Poekmon')
  //   );
  // }


  // onCreatePokemon(): void {
  //   this.pokemonService.createPokemon(this.pokemon).subscribe(
  //     (response) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done creating Pokemon')
  //   );
  // }


    onGetUserId() {
      this.pokemonService.getUserId()
      .subscribe(data => this.user = {
        id: (data as any).id,
        name:  (data as any).name,
      });
    }

    

  onGetTrainerId(): void {
    this.pokemonService.getUserId().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Trainer')
    );
  }

  
  

}
