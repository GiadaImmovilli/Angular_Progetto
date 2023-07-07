import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../libro';
import { Archivio } from '../../archivio';
import { AccessoArchivioService } from '../../accesso-archivio.service';

@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  styleUrls: ['./rimozione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RimozioneComponent implements OnInit {
  constructor(private archivioAppoggio: AccessoArchivioService) {}

  @Input() prestato: boolean;
  @Input() ricerca: boolean;
  @Input() libroTrovato: Libro;
  @Input() archivioRicerca: Archivio;
  @Output() nascondiR = new EventEmitter<boolean>();

  ngOnInit() {}

  rimozione() {
    this.archivioRicerca.rimozioneLibro(this.libroTrovato);
    this.nascondiRimozione();
  }

  nascondiRimozione() {
    this.ricerca = false;
    this.nascondiR.emit(this.ricerca);
  }
}
