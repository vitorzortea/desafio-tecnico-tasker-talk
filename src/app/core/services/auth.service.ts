import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Session } from '../model/session';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(
    private crud:CrudService<User|Session>,
    private router:Router,
  ) { }

  login(email:string, password:string){
    /*==========================================
        SISTEMA DE LOGIN È FEITO COM POST!!!
    ============================================
    -Normalmente aqui levariamos ao sistema de CRUD com o petodo post em
    um caminho na API feito pra isso, mas como desconheço um sistema de JWT no Mockapi Free
    criei na função o metodo GET para verificar a o email e a senha sem vazar a senha na url do gat
    e então gerei um token salvando em sessions com o id do usuário buscando fazer algo que lembre o JWT
    */

    sessionStorage.clear();
    return this.crud.get('users', {email}).pipe(
      map((users)=>{        

        const user:User = users[0] as User;
        if(user.password !== password){
          Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
          return false;
        }

        let token = Math.random().toString(36).substr(2);
        return this.crud.post('sessions',{
          userId: (user.id as string),
          token: token,
        }).pipe(
          map(session=>{

            sessionStorage.setItem('JWT_Fake', token);
            this.router.navigateByUrl('');
            return true;

          })).subscribe({error:()=>{

            Swal.fire({ icon:'error', text:'Algo deu errado! tente novamente mais tarde', timer:20000, });
            return false;

          }});

      })).subscribe({error:()=>{

        Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
        return false;

      }}
    );
  }

  getCurrentUser(token: string) {}

  logOut(){}

}
