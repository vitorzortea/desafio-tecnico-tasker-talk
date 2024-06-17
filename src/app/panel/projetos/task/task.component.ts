import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Task } from '../../../core/model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements AfterViewInit {
  @Input() tasks:Task[] = [];
  @Output() close = new EventEmitter<Task[]>();
  
  form: FormGroup;
  open= true;
  constructor(
    private fb: FormBuilder,
  ){ 
    this.form = fb.group({
      id: [{value:null, disabled:true}],
      createdAt: [new Date(), Validators.required],
      endAt: [new Date(), Validators.required],
      title:  ['', Validators.required],
      status:  [0, Validators.required],
      describe: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.form.reset();
    console.log('this.tasks: ', this.tasks);
  }
  saveTemp(){
    this.form.markAllAsTouched();
    console.log(this.form);
    if(this.form.valid){
      const value = {...this.form.value} as Task;
      this.form.reset();
      value.porcent = 0;
      this.tasks.push(value);
      this.close.emit(this.tasks);
    }else{
      Swal.fire({
        'icon':'error',
        'text': 'Formulário deve ser preenchido corretamente',
      })
    }
  }
  onHide(){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'suas alterações não foram salvas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((e)=>{
      if(e.isConfirmed){ this.close.emit(); }
      this.open=true;
    });
  }

}
