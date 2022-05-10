import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css']
})
export class ApiTestComponent implements OnInit {
  // searchPokemon(term: string): observable<Pokemon[]>{

  //   const params = new HttpParams({fromString: '25=term'});
  //     return this.httpClient.request({'GET', this."http://127.0.0.1:3000/pokemon/5", {responseType: 'json',
  //   params}};
  //   )
  // } 

  constructor() { }

  ngOnInit(): void {
  }

}
