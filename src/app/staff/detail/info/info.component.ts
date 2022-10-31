import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() staffId!: string;

  constructor() {}

  addDetail() {}
  editDetail() {}
}
