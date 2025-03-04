import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-loader',
  templateUrl: './movie-loader.component.html',
  styleUrls: ['./movie-loader.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class MovieLoaderComponent {
}
