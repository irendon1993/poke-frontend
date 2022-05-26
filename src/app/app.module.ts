import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameUiComponent } from './game-ui/game-ui.component';
import { FormsModule } from '@angular/forms';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PartyComponent } from './party/party.component';


@NgModule({
  declarations: [
    AppComponent,
    GameUiComponent,
    PokemonComponent,
    PartyComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
