import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmationmodal.component.html',
  styleUrls: ['./confirmationmodal.component.css']
})
export class ConfirmationModalComponent {
  @Input() message: string = '';
  @Input() title: string = '';

  constructor(private activeModal: NgbActiveModal) { }

  dismiss(result: boolean) {
    this.activeModal.close(result);
  }
}
