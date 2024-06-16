import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  constructor(
    private activatedRoute:ActivatedRoute,
  ){
    console.log('activatedRoute2: ', activatedRoute.snapshot)
  }
}
