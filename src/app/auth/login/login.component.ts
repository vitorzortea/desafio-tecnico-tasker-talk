import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form:FormGroup;
  constructor(
    private fb: FormBuilder,
    //private crud: CrudService<{user:string, senha:string}>,
    //private token: TokenService,
    //private router:Router,
  ){
    this.form = this.fb.group({
      user:[null],
      password:[null],
    });
  }

  login(){}
}
