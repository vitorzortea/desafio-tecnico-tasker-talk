import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:PanelComponent,
    children:[
      {path:'', pathMatch:'full', redirectTo: 'projetos'},
      {path:'dashboard', component:DashboardComponent},
      {path:'projetos', loadChildren:()=>import('./projetos/projetos.module').then(m=>m.ProjetosModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
