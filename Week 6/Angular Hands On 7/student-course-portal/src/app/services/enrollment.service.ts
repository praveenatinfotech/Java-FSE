import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourses: number[] = [];

  constructor(private courseService: CourseService) {}

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

  getEnrolledCourses(): Course[] {

    return this.enrolledCourses
      .map(id => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);

  }

}