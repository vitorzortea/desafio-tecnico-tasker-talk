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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private subscription: Subscription;
  projetos:Project[]|undefined;
  status:string|undefined;
  loading=true;
  isMe = false;
  isEdit = {visible:false, id:'-1'};
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
        icon: 'pi pi-times'
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
    this.subscription = this.navigationService.confirmNavigation$.subscribe(() => { this.isEdit.visible = true; });
    this.loadLit();
    const idAtivo = router.url.split('/')
    if(idAtivo[idAtivo.length-1] != 'projetos'){
      this.isEdit={visible:true, id:router.url.split('/')[router.url.split('/').length-1]}
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
      this.projetos = _e.items/*.map(f=>{
        //Uso Temporario Pois o MokApi não limita numeros Randomicos
        if(f.status>=4){
          f.status=0;
          this.crud.put('project', (f.id as string), f).subscribe();
        } return f});
        */
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

  
  hubMenu(id:string, goTo:'edit'){
    ({
      edit:()=>{this.isEdit={visible:true, id}}
    }[goTo])();
    //this[goTo](id);
  }
  onShow(toogle?:boolean){ if(!toogle){this.router.navigate([this.isEdit.id], {relativeTo: this.activatedRoute});} }
  onHide(){
    this.router.navigate(['./'], {relativeTo: this.activatedRoute});
    this.loadLit();
  }
  onPageChange(event: PaginatorState) {
    this.paginator = event as Paginator;
    this.loadLit();
  }
}
