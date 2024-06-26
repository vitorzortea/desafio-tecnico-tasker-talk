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
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar'
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TableModule } from 'primeng/table';








@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    ReactiveFormsModule,
    //NGPRIME
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
    SkeletonModule,
    PaginatorModule,
    ToggleButtonModule,
    TagModule,
    SidebarModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
  ]
})
export class ProjetosModule { }
