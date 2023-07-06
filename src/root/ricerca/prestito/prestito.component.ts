import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PrestitoComponent implements OnInit {
  constructor() {}

  @Input() prestato: boolean;

  ngOnInit() {}
}
