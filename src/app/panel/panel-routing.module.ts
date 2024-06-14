import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjetosComponent } from './projetos/projetos.component';

const routes: Routes = [
  {
    path:'',
    component:PanelComponent,
    children:[
      {path:'', component:DashboardComponent},
      {path:'', component:ProjetosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
