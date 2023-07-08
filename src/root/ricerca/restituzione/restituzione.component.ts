import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../libro';
import { Archivio } from '../../archivio';
import { AccessoArchivioService } from '../../accesso-archivio.service';


@Component({
  selector: 'app-restituzione',
  templateUrl: './restituzione.component.html',
  styleUrls: ['./restituzione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RestituzioneComponent implements OnInit {
  constructor() {}

  @Input() restituisci: boolean;
  @Input() ricerca: boolean;
  @Input() libroTrovato: Libro;
  @Input() archivioRicerca: Archivio;
  @Output() nascondiRe = new EventEmitter<boolean>();

  ngOnInit() {}

  confermaRestituzione() {
    this.archivioRicerca.restituzioneLibro(this.libroTrovato);
    this.nascondiRestituzione();
  }

  nascondiRestituzione() {
    this.ricerca = false;
    this.restituisci = false;
    this.nascondiRe.emit(this.ricerca);
  }
}
