import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
    NotificationService
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {

  constructor(
    public notificationService: NotificationService
  ) {

    this.notificationService.setMessage(

      'Welcome to Angular Dependency Injection Hands-on'

    );

  }

}