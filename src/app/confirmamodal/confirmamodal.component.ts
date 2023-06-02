import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmamodal',
  templateUrl: './confirmamodal.component.html',
  styleUrls: ['./confirmamodal.component.scss']
})
export class ConfirmamodalComponent {
  @Input() message: string = '';
  @Input() title: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  dismiss(result: boolean) {
    this.activeModal.close(result);
  }
}
