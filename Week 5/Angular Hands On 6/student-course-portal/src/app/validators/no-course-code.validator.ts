import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noCourseCodeValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.toUpperCase().startsWith('XX')) {

      return {
        invalidCourseCode: true
      };

    }

    return null;

  };

}