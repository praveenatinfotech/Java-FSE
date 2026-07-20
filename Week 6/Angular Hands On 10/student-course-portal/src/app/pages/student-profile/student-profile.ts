import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  enrolledCourses$: Observable<number[]>;

  constructor(
    private store: Store
  ) {

    this.enrolledCourses$ =
      this.store.select(
        EnrollmentSelectors.selectEnrolledCourseIds
      );

  }

}