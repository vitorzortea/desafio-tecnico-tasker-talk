import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import Swal from 'sweetalert2';
import { Session } from '../model/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(
    private crud:CrudService<User|Session>,
  ) { }

  login(email:string, password:string){
    console.log('Entrou 1');
    //Login geralmente é feito com POST e a vericação por segurança é feito pelo Back,
    //porém o Mockapi não tem um JWT e fiz assim para simular um sistema de token
    return this.crud.get('users', {email}).pipe(
      map((users)=>{
        console.log('Entrou 2');
        
        const user:User = users[0] as User;
        if(user.password !== password){
          Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
          return false;
        }
        
        //Aqui farei um JWT Fake
        let token = Math.random().toString(36).substr(2);
        return this.crud.post('sessions',{
          userId: user.id || '',
          token: token,
        }).pipe(
          map(session=>{
            console.log('Entrou 3');
            console.log('resposta:', session);
            localStorage.setItem('f#wQ21', token);
            return true;
          })).subscribe({error:()=>{
            console.log('Entrou 4');
            Swal.fire({ icon:'error', text:'Algo deu errado! tente novamente mais tarde', timer:20000, });
          return false;
        }});
        })
      ).subscribe({error:()=>{
        console.log('Entrou 4');
        Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
      return false;
    }})
  }

  getCurrentUser(token: string) {}

  logOut(){}

}
