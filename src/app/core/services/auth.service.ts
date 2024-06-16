import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Session } from '../model/session';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  LoggingIn=false;
  constructor(
    private storage:StorageService,
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
    if(!this.LoggingIn){
      this.LoggingIn=true;
      sessionStorage.clear();
      return this.crud.get('users', {email}).pipe(
        map((users)=>{        
  
          const user:User = users[0] as User;
          if(user.password !== password){
            Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
            return false;
          }
  
          let token = Math.random().toString(36).substr(2);
          return this.crud.post(`users/${user.id}/sessions`,{token}).pipe(
            map(session=>{
              console.log('entrou:', token);
              this.storage.setItem('JWT_Fake', token);
              console.log('entrou1:', this.storage.getItem('JWT_Fake'));
              environment.token = token;
              this.router.navigateByUrl('');
              return true;
  
            })).subscribe({error:()=>{
  
              Swal.fire({ icon:'error', text:'Algo deu errado! tente novamente mais tarde', timer:20000, });
              return false;
  
          }});
  
      })).subscribe({
        next:()=>{ this.LoggingIn = false; return true; },
        error:()=>{
          this.LoggingIn = false;
          Swal.fire({ icon:'error', text:'E-mail ou senha incorreto', timer:20000, });
          return false;
        }
      });
    }
    return false;
  }

  getCurrentUser() {
    const token = environment?.token || this.storage.getItem('JWT_Fake');

    return {} as User;
  }

  logOut(){
      const token = environment?.token || this.storage.getItem('JWT_Fake');
      this.crud.get(`sessions`, {token}).subscribe({
        next:(res)=>{
          //O filtro do mockapi.io não exato;
          const session = res.find(e=>(e as Session).token===token) as Session | undefined;
          if(session?.id){
            this.crud.delete(`users/${session.UserId}/sessions`, session.id).subscribe({
              error:(err)=>{console.log(err)}
            });
          }
        },
        error:(err)=>{console.log(err)}
      });
      this.storage.clear();
      this.router.navigate(['/auth'])
  }

}
