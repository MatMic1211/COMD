import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '../Services/movie-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
export class MovieSearchComponent implements AfterViewInit {
  movies: Movie[] = [];
  filterTerm: string = '';
  yearFilter: string = '';
  genreFilter: string = '';
  directorFilter: string = '';
  plotFilter: string = '';
  isLoading: boolean = false;
  displayedColumns: string[] = ['Poster', 'Title', 'Year', 'Runtime', 'Genre', 'Director', 'Plot'];
  dataSource = new MatTableDataSource<Movie>(this.movies);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movieService: MovieService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSearch(): void {
    this.isLoading = true;
    this.movieService.searchMovies(
      this.filterTerm,
      this.yearFilter,
      this.genreFilter,
      this.directorFilter,
      this.plotFilter
    ).subscribe(
      (movies: Movie[]) => {
        this.movies = movies.filter(movie =>
          (!this.yearFilter || movie.Year === this.yearFilter) &&
          (!this.genreFilter || movie.Genre.toLowerCase().includes(this.genreFilter.toLowerCase())) &&
          (!this.directorFilter || movie.Director.toLowerCase().includes(this.directorFilter.toLowerCase())) &&
          (!this.plotFilter || movie.Plot.toLowerCase().includes(this.plotFilter.toLowerCase()))
        );
        this.dataSource.data = this.movies;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Błąd:', error);
        this.isLoading = false;
      }
    );
  }
}
