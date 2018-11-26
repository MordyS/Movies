import { Action } from '@ngrx/store';
import { Movie } from './movie.model';
import { AppState } from './app.state';
import * as MovieActions from './movie.actions';

const initialState: Movie = {
    id: '',
    title: '',
    year: '',
    runtime: '',
    genre: '',
    director: '',
    poster: ''
};

export function reducer(state: AppState = { movies: [], showPopup: false, selected: [initialState] }, action: MovieActions.Actions) {
    switch (action.type) {
        case MovieActions.SAVE_MOVIE:
            const i = state.movies.findIndex(m => m.id === action.payload.id);
            if (i < 0) {
                state.movies[state.movies.length] = action.payload;
                return { ...state };
            } else {
                state.movies[i] = action.payload;
                return { ...state };
            }
            break;

        case MovieActions.REMOVE_MOVIE:
            const d = state.movies.findIndex(m => m.id === action.payload);
            state.movies.splice(d, 1);
            return { ...state };

        case MovieActions.SHOW_POPUP:
            return { ...state, showPopup: action.payload };

        case MovieActions.SELECT_MOVIE:
            state.selected[0] = action.payload;
            return { ...state };

        default:
            return state;
    }
}
