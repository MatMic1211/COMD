import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from '../Services/movie-service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  private filterSubject: Subject<string> = new Subject<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieService: MovieService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term))
    ).subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.dataSource.data = this.movies;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Błąd:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch(): void {
    this.isLoading = true;

    this.filterTerm = this.filterTerm.trim();
    this.filterSubject.next(this.filterTerm);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}  
