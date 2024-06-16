import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';
import { User } from '../core/model/user';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnDestroy {
  private observeEnvironment = of(environment);
  private subscriptionEnvironment:Subscription;
  user:User|undefined;
  items: MenuItem[] | undefined; 

  constructor(
    private auth:AuthService,
  ) {
    this.items = [
      { label: 'Painel de Controle', icon: 'pi pi-chart-bar', routerLink:'' },
      { label: 'Pojetos', icon: 'pi pi-inbox', routerLink:'' },
      { label: 'Tarefas', icon: 'pi pi-list-check', routerLink:'' },
      { label: 'Para Hoje', icon: 'pi pi-calendar-clock', routerLink:'' },
    ];
    (environment.user) ? this.user = environment.user : this.auth.getCurrentUser();
    this.subscriptionEnvironment = this.observeEnvironment.subscribe(e=>{ this.user = environment.user; })  
  }
  
  logOut(){ console.log('entrou'); this.auth.logOut(); }
  
  ngOnDestroy(): void { this.subscriptionEnvironment.unsubscribe(); }
  
}
