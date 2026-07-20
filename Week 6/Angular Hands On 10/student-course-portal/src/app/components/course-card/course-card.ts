import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

import { Course } from '../../models/course.model';

import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import * as EnrollmentSelectors from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    HighlightDirective,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input() course!: Course;

  isExpanded = false;

  isEnrolled = false;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.store.select(
      EnrollmentSelectors.isCourseEnrolled(this.course.id)
    ).subscribe(value => {

      this.isEnrolled = value;

    });

  }

  viewCourse(): void {

    this.router.navigate(['/courses', this.course.id]);

  }

  toggleEnrollment(): void {

    if (this.isEnrolled) {

      this.store.dispatch(
        EnrollmentActions.removeEnrollment({
          courseId: this.course.id
        })
      );

    } else {

      this.store.dispatch(
        EnrollmentActions.enrollCourse({
          courseId: this.course.id
        })
      );

    }

  }

  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;

  }

  get cardClasses() {

    return {

      'card-enrolled': this.isEnrolled,

      'card-full': this.course.credits >= 4,

      'expanded': this.isExpanded

    };

  }

}