import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private confirmNavigationSubject = new Subject<void>();
  confirmNavigation$ = this.confirmNavigationSubject.asObservable();

  confirmNavigation() {
    
    console.log('entrou aqui2');
    this.confirmNavigationSubject.next();
  }
}