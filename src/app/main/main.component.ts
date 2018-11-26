import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Movie } from './../movie.model';
import { AppState } from './../app.state';
import * as MovieActions from './../movie.actions';
import * as allMovies from './../movies.list';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[];
  movieDel: string;

  addNew() {
    this.store.dispatch(new MovieActions.ShowPopup(true));
    this.store.dispatch(new MovieActions.SelectMovie({
      id: '',
      title: '',
      year: '',
      runtime: '',
      genre: '',
      director: '',
      poster: ''
    }));
  }

  edit(movie) {
    this.store.dispatch(new MovieActions.ShowPopup(true));
    this.store.dispatch(new MovieActions.SelectMovie(movie));
  }

  del(movieId) {
    document.getElementById('confirm').style.display = 'block';
    this.movieDel = movieId;
  }

  delYes() {
    this.store.dispatch(new MovieActions.RemoveMovie(this.movieDel));
    document.getElementById('confirm').style.display = 'none';
  }

  delNo() {
    document.getElementById('confirm').style.display = 'none';
  }

  constructor(private http: HttpClient, private store: Store<AppState>) {
    store.select('movie').subscribe((result: AppState) => {
      this.movies = result.movies;
    });
  }

  ngOnInit() {
    allMovies.list.forEach(movie => {
      this.http.get('https://www.omdbapi.com/?t=' + movie + '&apikey=b324dd1b').subscribe(data => {
        if (data['Response'] === 'True') {
          const movieData: Movie = {
            'id': data['imdbID'],
            'title': data['Title'],
            'year': data['Year'],
            'runtime': data['Runtime'],
            'genre': data['Genre'],
            'director': data['Director'],
            'poster': data['Poster']
          };
          this.store.dispatch(new MovieActions.SaveMovie(movieData));
        } else {
          console.log('"' + movie + '"' + ' not found in imdb');
        }
      });
    });

  }

}
