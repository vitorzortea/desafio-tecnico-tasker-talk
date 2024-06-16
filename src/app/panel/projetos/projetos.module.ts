import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { KnobModule } from 'primeng/knob';



@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    PanelModule,
    CardModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    ProgressBarModule,
    DividerModule,
    FieldsetModule,
    ToolbarModule,
    KnobModule,
  ]
})
export class ProjetosModule { }
