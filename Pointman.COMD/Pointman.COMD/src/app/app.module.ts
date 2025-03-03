import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './MovieSerach/movie-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieLoaderComponent } from './MovieLoader/movie-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MovieLoaderComponent,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
