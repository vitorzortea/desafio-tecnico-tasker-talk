import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';

import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';



@NgModule({
  declarations: [
    PanelComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MenuModule,
    ToastModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
  ]
})
export class PanelModule { }
