import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

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

  constructor(
    public enrollmentService: EnrollmentService
  ) {}

  toggleEnrollment(): void {

    if (this.enrollmentService.isEnrolled(this.course.id)) {

      this.enrollmentService.unenroll(this.course.id);

    } else {

      this.enrollmentService.enroll(this.course.id);

    }

  }

  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;

  }

  get cardClasses() {

    return {

      'card-enrolled':
        this.enrollmentService.isEnrolled(this.course.id),

      'card-full':
        this.course.credits >= 4,

      'expanded':
        this.isExpanded

    };

  }

}