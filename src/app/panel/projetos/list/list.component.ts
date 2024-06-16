import { Component } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Project, ProjectList } from '../../../core/model/project';
import { Paginator } from '../../../core/model/project copy';
import { PaginatorState } from 'primeng/paginator';
import { PanelAfterToggleEvent } from 'primeng/panel';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { Task, TasktList } from '../../../core/model/task';
import { NavigationService } from '../../../core/services/navigation-service.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  projetos:Project[]|undefined;
  status:string|undefined;
  loading=true;
  isMe = false;
  menuProjeto:MenuItem[] = [
    {
        label: 'Editar Projeto',
        icon: 'pi pi-pen-to-square',
        id:'edit'
      },
      {
        label: 'Adicionar Tarefa',
        icon: 'pi pi-list-check'
      },
      {
        separator: true
      },
      {
        label: 'Deletar',
        icon: 'pi pi-times',
        id:'delete'
  }]


  total:number = 0;
  paginator:Paginator = {first: 0, rows: 6, page:0, pageCount:0};
  filter:{[key:string]:any}={};

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private navigationService: NavigationService,
    private crud:CrudService<Project | ProjectList | TasktList>,
  ){
    this.loadLit();
    const idAtivo = router.url.split('/')
    if(idAtivo[idAtivo.length-1] != 'projetos'){
    }
  }





  loadLit(){
    this.projetos=[];
    this.loading=true;
    this.crud.get('project', { ...this.filter, page:(this.paginator?.page || 0)+1, limit: (this.paginator?.rows|| 1)}).subscribe({
      next:(e)=>{
      const _e = e as ProjectList;
      this.loading=false;
      this.total = _e.count;
      this.projetos = _e.items;
      },
      error:(err)=>{
        this.loading=false;
      }
  })
  }
  loadTask(event:PanelAfterToggleEvent, index:number){
    if(!event?.collapsed){
      const projetos = (this.projetos as Project[]);
      const id = projetos[index].id as string;
      this.crud.get(`project/${id}/Task`).subscribe(e=>{
        projetos[index].listTask = (e as TasktList ).items;
        const newPorcent = (e as TasktList).items.reduce(
          (a: number, b: Task, index: number, array: Task[]) => (a || array[index-1]?.porcent || 0) + b.porcent, 0
        )/(e as TasktList).items.length;
        if(newPorcent !=  projetos[index].porcent){
          (this.projetos as Project[])[index].porcent = newPorcent;
          this.crud.put('project', id, projetos[index]).subscribe();
        }
      })
    }
  }

  listMe(){
    if(!this.isMe){
      delete this.filter['userId'];
      this.loadLit();
      return;
    }
    this.filter['userId'] = environment.user?.id;
    this.loadLit();
  }
  listStatus(){
    if(this.status === undefined){
      delete this.filter['status'];
      this.loadLit();
      return;
    }
    this.filter['status'] = this.status;
    this.loadLit();
  }

  
  hubMenu(projeto:Project, goTo:'edit'|'delete'){
    ({
      edit:()=>{this.router.navigate([projeto.id], {relativeTo: this.activatedRoute}); },
      delete:()=>{this.delete(projeto)},
    }[goTo])();
  }
  goToCreate(){ this.router.navigate(['novo'], {relativeTo: this.activatedRoute}) }
  delete(projeto:Project){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Seu Projeto não poderá ser recuperado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((e)=>{
      if(e.isConfirmed){
        const user = projeto.userId;
        const id = projeto.id || '';
        console.log('pro:', projeto)
        this.crud.delete('users/'+user+'/'+'project', id).subscribe({
          next:()=>{
            Swal.fire({
              icon:'success',
              text:'Projeto Deletado com sucesso',
              timer: 2000
            });
            this.resetPaginator();
            this.loadLit();
          },
          error:()=>{
            Swal.fire({
              icon:'error',
              text:'Algo Deu Errado',
              timer: 2000
            });
          }
        })

      }
      return e
    });
  }



  onPageChange(event: PaginatorState) {
    this.paginator = event as Paginator;
    this.loadLit();
  }
  resetPaginator(){
    this.paginator = {first: 0, rows: 6, page:0, pageCount:0};
  }
}
