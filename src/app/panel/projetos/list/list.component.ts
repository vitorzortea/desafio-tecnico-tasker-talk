import { Component } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Project, ProjectList } from '../../../core/model/project';
import { Paginator } from '../../../core/model/project copy';
import { PaginatorState } from 'primeng/paginator';
import { PanelAfterToggleEvent } from 'primeng/panel';
import { Task, TasktList } from '../../../core/model/Task';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  loading=true;
  isMe = false;
  status:string|undefined;
  projetos:Project[]|undefined;
  total:number = 0;
  paginator:Paginator = {first: 0, rows: 6, page:0, pageCount:0};
  filter:{[key:string]:any}={};

  constructor(
    private crud:CrudService<Project | ProjectList | TasktList>,
  ){
    this.loadLit();
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
  onPageChange(event: PaginatorState) {
    this.paginator = event as Paginator;
    this.loadLit();
  }
}
