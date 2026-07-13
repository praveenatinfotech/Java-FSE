import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourses: number[] = [];

  enroll(courseId: number): void {

    if (!this.enrolledCourses.includes(courseId)) {

      this.enrolledCourses.push(courseId);

    }

  }

  unenroll(courseId: number): void {

    this.enrolledCourses = this.enrolledCourses.filter(

      id => id !== courseId

    );

  }

  isEnrolled(courseId: number): boolean {

    return this.enrolledCourses.includes(courseId);

  }

  getEnrolledCourses(): number[] {

    return this.enrolledCourses;

  }

}