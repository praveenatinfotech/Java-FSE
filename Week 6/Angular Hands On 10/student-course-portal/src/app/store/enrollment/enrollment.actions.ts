import { createAction, props } from '@ngrx/store';

export const enrollCourse = createAction(
  '[Enrollment] Enroll Course',
  props<{ courseId: number }>()
);

export const removeEnrollment = createAction(
  '[Enrollment] Remove Enrollment',
  props<{ courseId: number }>()
);

export const clearEnrollments = createAction(
  '[Enrollment] Clear Enrollments'
);