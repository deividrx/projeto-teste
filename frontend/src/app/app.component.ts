import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {



  }

  onKeepSigned() {

  }

  onSubmit() {

  }
}
