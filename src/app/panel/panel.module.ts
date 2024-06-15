import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';

import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PanelComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MenuModule,
    ToastModule,
  ]
})
export class PanelModule { }
