import { Component } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Project, ProjectList } from '../../../core/model/project';
import { Paginator } from '../../../core/model/project copy';
import { PaginatorState } from 'primeng/paginator';
import { PanelAfterToggleEvent } from 'primeng/panel';
import { Task, TasktList } from '../../../core/model/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  loading=true;
  projetos:Project[]|undefined;
  total:number = 0;
  paginator:Paginator = {first: 0, rows: 4, page:0, pageCount:0};

  constructor(
    private crud:CrudService<Project | ProjectList | TasktList>,
  ){
    this.loadLit();
  }
  loadLit(){
    this.loading=true;
    this.crud.get('project', {page:(this.paginator?.page || 0)+1, limit: (this.paginator?.rows|| 1)}).subscribe(e=>{
      const _e = e as ProjectList;
      this.loading=false;
      this.total = _e.count;
      this.projetos = _e.items;
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

  onPageChange(event: PaginatorState) {
    this.paginator = event as Paginator;
    this.loadLit();
  }
}
