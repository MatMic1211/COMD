import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '../Services/movie-service';
import { MovieLoaderComponent } from '../MovieLoader/movie-loader.component'; // Importowanie loadera

interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  standalone: false,
})
export class MovieSearchComponent {
  movies: Movie[] = [];
  filterTerm: string = '';
  isLoading: boolean = false;

  constructor(private movieService: MovieService) { }

  onSearch(): void {
    console.log('Searching for:', this.filterTerm);  
    this.isLoading = true;
    this.movieService.searchMovies(this.filterTerm).subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

}
