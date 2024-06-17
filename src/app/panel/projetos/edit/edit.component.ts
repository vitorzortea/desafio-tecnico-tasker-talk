import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { Subscription, forkJoin } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation-service.service';
import { Task } from '../../../core/model/task';
import { Project } from '../../../core/model/project';

type FormProjeto = {
  describe: string;
  createdAt: Date,
  endAt: Date,
  title: string,
  empresa: string,
  status: 0,
  imagem: string,
  porcent: 21,
  user: { name: string, avatar: string },
  editedAt: Date,
  id: string,
  userId: string,
}
//type FormlistTask = {
//  createdAt: Date,
//  endAt: Date,
//  title: string,
//  description: string,
//  status: number,
//  porcent: string,
//  id: string,
//  projectId: string,
//  subTasks: any[],
//}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  creatingTask=false;
  tasks:any|undefined=[];
  
  private subscription: Subscription;
  open= true;
  form: FormGroup;

  id:string|null;
  title='Novo Projeto'
  sidebarVisible=false;

  constructor(
    private crud:CrudService<any>,
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router,
    private navigationService:NavigationService,
  ){ 
    this.form = this.fb.group({
      id: [{value:null, disabled:true}],
      status:  [null, Validators.required],
      empresa:  ['', Validators.required],
      title:  ['', Validators.required],
      createdAt: [new Date(), Validators.required],
      endAt: [new Date(), Validators.required],
      describe: ['', Validators.required],
      imagem: ['', Validators.required],
      porcent: [0, Validators.required],
      user: [null, Validators.required],
      editedAt: [new Date(), Validators.required],
      userId: [undefined, Validators.required],
    });
    console.log('Teste: ', this.form.value)
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id!='novo'){
      this.title = 'Editar Projeto'
      this.getProjecct();
    }
    this.subscription = this.navigationService.confirmNavigation$.subscribe(()=>{ this.open = true; });
  }
  
  getProjecct(){
    this.crud.getID('project', this.id || '').subscribe(e=>this.loadForm(e as FormProjeto));
  }
  loadForm(e:FormProjeto){
    console.log({...e})
    this.form = this.fb.group({
      status:  [e.status, Validators.required],
      empresa:  [e.empresa, Validators.required],
      title:  [e.title , Validators.required],
      createdAt: [new Date(e.createdAt ), Validators.required],
      endAt: [new Date(e.endAt ), Validators.required],
      describe: [e.describe , Validators.required],
      imagem: [e.imagem , Validators.required],
      porcent: [e.porcent, Validators.required],
      user: [e.user, Validators.required],
      editedAt: [new Date(e.editedAt ), Validators.required],
      id: [e.id, Validators.required],
      userId: [e.userId, Validators.required],
    });
  }  

  submit(){
    console.log('salvar', this.form);
    if(!this.form.value.userId){
      this.form.patchValue({
        user: {
          name: environment.user?.name || 'User Erro',
          avatar: environment.user?.avatar || 'User Erro'
        },
        userId: environment.user?.id || '-1',
        imagem: "https://loremflickr.com/640/480/business"
      });
    }
    this.form.markAllAsTouched();
    if(this.form.valid){
      console.log(this.tasks);
      console.log(this.tasks.length);
      const value = this.form.value;
      const save = (value.id) 
      ? this.crud.put(`users/${value.userId}/project`, value.id, value)
      : this.crud.post(`users/${value.userId}/project`, value);
      save.subscribe({
        next:(e)=>{
          if(this.tasks.length){
            console.log(this.tasks);
            console.log(this.tasks.length);
            const gets = this.tasks.map((f:Task)=>{
              console.log('>');
              return (!f?.id)
                ? this.crud.post(`users/${value.userId}/project/${(e as Project).id}/Task`, f)
                : this.crud.put(`users/${value.userId}/project/${(e as Project).id}/Task`, f.id, f)
            });
            forkJoin(gets).subscribe(g=>{
              this.loadForm(e as FormProjeto);
              Swal.fire({
                icon:'success',
                text:'Projeto Salvo com sucesso'
              }).then(()=>{
                this.router.navigate(['../'], {relativeTo: this.activatedRoute});
              })
            })
          }else{
            this.loadForm(e as FormProjeto);
            Swal.fire({
              icon:'success',
              text:'Projeto Salvo com sucesso'
            }).then(()=>{
              this.router.navigate(['../'], {relativeTo: this.activatedRoute});
            })
          }
        },
        error:()=>{
          Swal.fire({
            icon:'error',
            text:'Algo deu errado...'
          })
        }
      })
    }
  }
  onHide(){ 
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
