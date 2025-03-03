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
  isLoading: boolean = false;
  displayedColumns: string[] = ['Poster', 'Title', 'Year', 'Runtime', 'Genre', 'Director', 'Plot'];
  dataSource = new MatTableDataSource<Movie>(this.movies);

  @ViewChild(MatSort) sort!: MatSort; // Non-null assertion

  constructor(private movieService: MovieService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSearch(): void {
    this.isLoading = true;
    this.movieService.searchMovies(this.filterTerm).subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.dataSource.data = movies; 
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        this.isLoading = false;
      }
    );
  }
}
