import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { noCourseCodeValidator } from '../../validators/no-course-code.validator';
import { emailTakenValidator } from '../../validators/email-taken.validator';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm {

  enrollmentForm: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {

    this.enrollmentForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          emailTakenValidator()
        ]
      ],

      courseId: [
        '',
        [
          Validators.required,
          noCourseCodeValidator()
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  get studentName() {
    return this.enrollmentForm.get('studentName');
  }

  get studentEmail() {
    return this.enrollmentForm.get('studentEmail');
  }

  get courseId() {
    return this.enrollmentForm.get('courseId');
  }

  get additionalCourses() {

    return this.enrollmentForm.get('additionalCourses') as FormArray;

  }

  addCourse() {

    this.additionalCourses.push(

      this.fb.control('')

    );

  }

  removeCourse(index: number) {

    this.additionalCourses.removeAt(index);

  }

  onSubmit() {

    this.submitted = true;

    console.log(this.enrollmentForm.value);

    console.log(this.enrollmentForm.getRawValue());

  }

  reset() {

    this.submitted = false;

    this.enrollmentForm.reset({

      preferredSemester: 'Odd',

      agreeToTerms: false

    });

    while (this.additionalCourses.length) {

      this.additionalCourses.removeAt(0);

    }

  }

}