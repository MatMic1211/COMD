import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbID: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = 'f54c3658';

  constructor(private http: HttpClient) { }

  searchMovies(searchTerm: string): Observable<Movie[]> {
    let params = new HttpParams().set('apikey', this.apiKey);

    params = params.set('y', searchTerm);
    params = params.set('s', encodeURIComponent(searchTerm));

    return this.http.get<{ Search: { imdbID: string }[] }>(this.apiUrl, { params }).pipe(
      switchMap(response => {
        if (!response.Search) return of([]);
        const movieDetailsRequests = response.Search.map(movie => this.getMovieDetails(movie.imdbID));
        return forkJoin(movieDetailsRequests);
      }),
      catchError(error => {
        console.error('Błąd podczas pobierania wyników:', error);
        return throwError(error);
      })

    );
  }

  private getMovieDetails(imdbID: string): Observable<Movie> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', imdbID);

    return this.http.get<Movie>(this.apiUrl, { params }).pipe(
      catchError(() => of(null as unknown as Movie))
    );
  }
}
