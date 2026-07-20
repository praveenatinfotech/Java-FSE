import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function emailTakenValidator(): AsyncValidatorFn {

  return (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {

    return of(control.value).pipe(

      delay(800),

      map(email => {

        if (!email) {

          return null;

        }

        if (email.toLowerCase().includes('test@')) {

          return {

            emailTaken: true

          };

        }

        return null;

      })

    );

  };

}