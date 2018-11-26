import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Movie } from './movie.model';

export const SAVE_MOVIE = '[MOVIE] Save';
export const REMOVE_MOVIE = '[MOVIE] Remove';
export const SHOW_POPUP = '[POPUP] Change';
export const SELECT_MOVIE = '[MOVIE] Select';

export class SaveMovie implements Action {
    readonly type = SAVE_MOVIE;

    constructor(public payload: Movie) { }
}

export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIE;

    constructor(public payload: string) { }
}

export class ShowPopup implements Action {
    readonly type = SHOW_POPUP;

    constructor(public payload: boolean) { }
}

export class SelectMovie implements Action {
    readonly type = SELECT_MOVIE;

    constructor(public payload: Movie) { }
}

export type Actions = SaveMovie | RemoveMovie | ShowPopup | SelectMovie;
