import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  styleUrls: ['./rimozione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RimozioneComponent implements OnInit {
  constructor() {}

  @Input() prestato: boolean;

  ngOnInit() {}
}
