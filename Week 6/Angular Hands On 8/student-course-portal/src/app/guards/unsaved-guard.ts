import { CanDeactivateFn } from '@angular/router';

export const unsavedGuard: CanDeactivateFn<any> = (component) => {

  if (component.enrollmentForm?.dirty) {

    return confirm(
      'You have unsaved changes. Leave this page?'
    );

  }

  return true;

};