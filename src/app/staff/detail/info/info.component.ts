import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() stafdId!: string;

  constructor() {}

  ngOnInit(): void {
    // this.sia.get('1013780138799882');
    console.log('make this work');
  }

  addDetail() {}
  editDetail() {}
}
