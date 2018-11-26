import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movietitle' })
export class MovieTitle implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }
        const newVal = value.replace(/[^\w\s]/gi, '');
        return newVal.replace(/\w\S*/g, function (str) {
            return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
        });
    }
}
