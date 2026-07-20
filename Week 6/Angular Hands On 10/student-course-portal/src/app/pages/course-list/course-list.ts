import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

import * as CourseActions from '../../store/course/course.actions';
import * as CourseSelectors from '../../store/course/course.selectors';

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

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  searchTerm = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.courses$ = this.store.select(
      CourseSelectors.selectAllCourses
    );

    this.loading$ = this.store.select(
      CourseSelectors.selectCourseLoading
    );

    this.error$ = this.store.select(
      CourseSelectors.selectCourseError
    );

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.searchTerm = params['search'] || '';

    });

    this.store.dispatch(
      CourseActions.loadCourses()
    );

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