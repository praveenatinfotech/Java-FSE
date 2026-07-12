import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = true;

  selectedCourseId = 0;

  courses = [
    {
      id: 1,
      name: 'Java',
      code: 'CS101',
      credits: 4,
      enrolled: true,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Angular',
      code: 'CS102',
      credits: 3,
      enrolled: false,
      gradeStatus: 'failed'
    },
    {
      id: 3,
      name: 'Spring Boot',
      code: 'CS103',
      credits: 4,
      enrolled: true,
      gradeStatus: 'pending'
    },
    {
      id: 4,
      name: 'Python',
      code: 'CS104',
      credits: 2,
      enrolled: false,
      gradeStatus: 'passed'
    },
    {
      id: 5,
      name: 'React',
      code: 'CS105',
      credits: 3,
      enrolled: true,
      gradeStatus: 'pending'
    }
  ];

  ngOnInit(): void {

    setTimeout(() => {

      this.isLoading = false;

    }, 1500);

  }

  onEnroll(courseId: number): void {

    this.selectedCourseId = courseId;

    console.log('Selected Course ID:', courseId);

  }

  trackByCourseId(index: number, course: any): number {

    return course.id;

  }

}