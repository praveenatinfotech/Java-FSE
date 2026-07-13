import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses: Course[] = [];

  isLoading = true;

  searchTerm = '';

  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.searchTerm = params['search'] || '';

    });

    this.loadCourses();

  }

  loadCourses(): void {

    this.isLoading = true;

    this.courseService.getCourses().subscribe({

      next: (courses) => {

        this.courses = courses;

        this.isLoading = false;

      },

      error: () => {

        this.errorMessage = 'Failed to load courses';

        this.isLoading = false;

      }

    });

  }

  updateSearch(): void {

    this.router.navigate(
      ['/courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );

  }

  trackByCourseId(
    index: number,
    course: Course
  ): number {

    return course.id;

  }

}