import { Component } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Project, ProjectList } from '../../../core/model/project';
import { Paginator } from '../../../core/model/project copy';
import { PaginatorState } from 'primeng/paginator';

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
    private crud:CrudService<ProjectList>,
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

  onPageChange(event: PaginatorState) {
    this.paginator = event as Paginator;
    this.loadLit();
  }
}
