import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  submitted = false;

  student = {

    studentName: '',

    studentEmail: '',

    courseId: '',

    preferredSemester: 'Odd',

    agreeToTerms: false

  };

  onSubmit(form: NgForm) {

    console.log(form.value);

    this.submitted = true;

  }

  reset(form: NgForm) {

    form.resetForm();

    this.submitted = false;

  }

}