import { Movie } from './movie.model';

export interface AppState {
    movies: Movie[];
    showPopup: boolean;
    selected: Movie[];
}
