import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2'
import { IFormBuilder, IFormGroup } from '@rxweb/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: IFormGroup<FormLogin>;
  ifb: IFormBuilder;
  constructor(
    private auth:AuthService,
    //private router:Router,
    private fb: FormBuilder
  ) {
    this.ifb = fb as IFormBuilder;    
    this.form = this.ifb.group<FormLogin>({
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.required]],
    });
  }

  login(){
    if(this.form.valid){
      const value = this.form.value as FormLogin
      if(this.auth.login(value.email, value.password)){
        Swal.fire({
          text: 'Foi!',
          icon: 'success',
        })
      }
    }else{
      Swal.fire({
        text: 'O formulário de login deve ser respondido corretamente.',
        icon: 'error',
      })
    }
  }
}

type FormLogin = {email:string, password:string}