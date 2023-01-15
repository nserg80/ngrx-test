import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';

@Component({
  selector: 'mc-error-backend-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  // Input alias
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  errorMessages: string[]

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      const messages = this.backendErrorsProps[name].join(', ');
      return `${name} ${messages}`
    })
  }

}
