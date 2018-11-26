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

  keyUpString(field, value) {
    this.editedMovie[field] = value;
    this.validation[field] = this.editedMovie[field] === '' ? false : true;
  }

  keyUpYear(field, value) {
    this.editedMovie[field] = value;
    this.validation[field] = Number(this.editedMovie[field]) > 1900 && Number(this.editedMovie[field]) < 2050 ? true : false;
  }

  save() {
    this.editedMovie.id = this.movie.id === '' ? this.generateId() : this.movie.id;
    this.editedMovie.title = this.editedMovie.title === '' ? this.movie.title : this.editedMovie.title;
    this.editedMovie.year = this.editedMovie.year === '' ? this.movie.year : this.editedMovie.year;
    this.editedMovie.runtime = this.editedMovie.runtime === '' ? this.movie.runtime : this.editedMovie.runtime;
    this.editedMovie.genre = this.editedMovie.genre === '' ? this.movie.genre : this.editedMovie.genre;
    this.editedMovie.director = this.editedMovie.director === '' ? this.movie.director : this.editedMovie.director;
    this.editedMovie.poster = this.editedMovie.poster === '' ? this.movie.poster : this.editedMovie.poster;
    if (Object.values(this.validation).every(Boolean)) {
      this.store.dispatch(new MovieActions.SaveMovie(this.editedMovie));
      this.close();
    } else {
      Array.from(document.getElementsByClassName('is-invalid')).forEach(element => {
        element.classList.add('flash');
      });
      setTimeout(() => {
        Array.from(document.getElementsByClassName('is-invalid')).forEach(element => {
          element.classList.remove('flash');
        });
      }, 1000);
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
