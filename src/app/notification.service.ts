import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmamodalComponent } from './confirmamodal/confirmamodal.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable();

  notify(message: string) {
    this.notificationSubject.next(message);
  }
  
  constructor(private modalService: NgbModal) { }

  confirm(message: string, title: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmamodalComponent, { centered: true });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    return modalRef.result;
  }
}
