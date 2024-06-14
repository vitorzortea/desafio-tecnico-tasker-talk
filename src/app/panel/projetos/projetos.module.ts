import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosComponent } from './projetos.component';


@NgModule({
  declarations: [
    ProjetosComponent
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule
  ]
})
export class ProjetosModule { }
