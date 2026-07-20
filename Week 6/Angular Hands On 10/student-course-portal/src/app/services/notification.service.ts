import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  private message = '';

  setMessage(message: string): void {

    this.message = message;

  }

  getMessage(): string {

    return this.message;

  }

}