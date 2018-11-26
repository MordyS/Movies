import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Movie } from './../movie.model';
import { AppState } from './../app.state';
import * as MovieActions from './../movie.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  showPopup: boolean;
  helper: boolean;
  movie: Movie;
  editedMovie: Movie = {
    id: '',
    title: '',
    year: '',
    runtime: '',
    genre: '',
    director: '',
    poster: ''
  };
  validation = {
    title: true,
    year: true,
    runtime: true,
    genre: true,
    director: true,
    poster: true
  };

  isShowPopup() {
    return this.showPopup;
  }

  generateId() {
    return 'hh' + (Date.now() % 100000).toString();
  }

  validate(movie) {
    this.validation.title = movie.title === '' ? false : true;
    this.validation.year = Number(movie.year) > 1900 && Number(movie.year) < 2050 ? true : false;
    this.validation.runtime = movie.runtime === '' ? false : true;
    this.validation.genre = movie.genre === '' ? false : true;
    this.validation.director = movie.director === '' ? false : true;
    this.validation.poster = movie.poster === '' ? false : true;
    return Object.values(this.validation).every(Boolean);
  }

  save() {
    this.editedMovie.id = this.movie.id === '' ? this.generateId() : this.movie.id;
    this.editedMovie.title = this.editedMovie.title === '' ? this.movie.title : this.editedMovie.title;
    this.editedMovie.year = this.editedMovie.year === '' ? this.movie.year : this.editedMovie.year;
    this.editedMovie.runtime = this.editedMovie.runtime === '' ? this.movie.runtime : this.editedMovie.runtime;
    this.editedMovie.genre = this.editedMovie.genre === '' ? this.movie.genre : this.editedMovie.genre;
    this.editedMovie.director = this.editedMovie.director === '' ? this.movie.director : this.editedMovie.director;
    this.editedMovie.poster = this.editedMovie.poster === '' ? this.movie.poster : this.editedMovie.poster;
    if (this.validate(this.editedMovie)) {
      this.store.dispatch(new MovieActions.SaveMovie(this.editedMovie));
      this.close();
    }
  }

  cancel() {
    this.close();
  }

  close() {
    this.store.dispatch(new MovieActions.ShowPopup(false));
    this.helper = false;
    this.editedMovie = {
      id: '',
      title: '',
      year: '',
      runtime: '',
      genre: '',
      director: '',
      poster: ''
    };
    this.validation = {
      title: true,
      year: true,
      runtime: true,
      genre: true,
      director: true,
      poster: true
    };
  }

  constructor(private store: Store<AppState>) {
    store.select('movie').subscribe((result: AppState) => {
      this.showPopup = result.showPopup;
      this.movie = result.selected[0];
    });
  }

  ngOnInit() {
  }

}
