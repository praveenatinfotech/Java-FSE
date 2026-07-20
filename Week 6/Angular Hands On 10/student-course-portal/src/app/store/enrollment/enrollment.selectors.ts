import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledCourseIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

export const isCourseEnrolled = (courseId: number) =>
  createSelector(
    selectEnrolledCourseIds,
    (ids) => ids.includes(courseId)
  );