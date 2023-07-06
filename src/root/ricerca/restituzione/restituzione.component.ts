import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restituzione',
  templateUrl: './restituzione.component.html',
  styleUrls: ['./restituzione.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RestituzioneComponent implements OnInit {

  constructor() { }

  @Input() prestato: boolean;

  ngOnInit() {
  }

}