import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> implements OnDestroy {
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private api = 'https://666db1857a3738f7cacd1182.mockapi.io/pi/v1/';
  private destroy$ = new Subject<void>();
  
  constructor(
    protected http: HttpClient,
  ) {
    this.api = this.api.endsWith('/') ? this.api : `${this.api}/`;
  }

  get(table:string, params?:{[key:string]:any}){
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<T[]>(`${this.api}${table}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  getID(table:string, id:string, params?:{[key:string]:any}){
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<T>(`${this.api}${table}/${id}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  post(table:string, body:T){
    return this.http.post(`${this.api}${table}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  put(table:string, id:string, body:T){
    return this.http.put(`${this.api}${table}/${id}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  delete(table:string, id:string){
    return this.http.delete(`${this.api}${table}/${id}`, this.httpOption).pipe(takeUntil(this.destroy$));
  }
  deleteList(table:string, id:string[]){
    //Não utilizei no sistema, fiz essa função para que eu possa ter um feedback dos avaliadores se é uma boa prática
    const deletes = id.map(e=>this.http.delete(`${this.api}${table}/${e}`, this.httpOption).pipe(takeUntil(this.destroy$)));
    return forkJoin(deletes);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
