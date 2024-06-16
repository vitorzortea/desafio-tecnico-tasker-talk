import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private confirmNavigationSubject = new Subject<void>();
  confirmNavigation$ = this.confirmNavigationSubject.asObservable();
  private negNavigationSubject = new Subject<void>();
  negNavigation$ = this.negNavigationSubject.asObservable();

  confirmNavigation() {
    this.confirmNavigationSubject.next();
  }
  negNavigation() {
    this.negNavigationSubject.next();
  }
}