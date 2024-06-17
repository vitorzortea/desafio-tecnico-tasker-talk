import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { exitPopUpGuard } from '../../core/guard/exit-pop-up.guard';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path:'',
    component:ListComponent,
    children:[
      {path:':id', component:EditComponent, canDeactivate: [exitPopUpGuard],},
      {path:'novo', component:EditComponent, canDeactivate: [exitPopUpGuard],},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule { }
