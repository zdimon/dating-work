import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {selectAccount} from '../store/session/session.selector';
import { Observable, Subscription } from 'rxjs';
import { SessionState } from '../store/session/session.store';
import { Store } from '@ngrx/store';
import {AddAccount} from '../store/session/session.action';
import { SocketService } from '../service/socket.service';
import { BillingService } from '../service/billing.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: '../templates/profile/add.credit.component.html',
})
export class AddCreditComponent  implements OnInit, OnDestroy{
  modalRef: BsModalRef;
  account: Observable<any>;
  credits: number = 100;
  dialog_subscription: Subscription;
  @ViewChild('template',{'static': false}) public templateref: TemplateRef<any>;
  billing: any;

  constructor(
    private modalService: BsModalService,
    private session_store: Store<SessionState>,
    private socket_service: SocketService,
    private billing_service: BillingService
    ){
      this.account = this.session_store.select(selectAccount);
      this.dialog_subscription = this.socket_service.show_billing_dialog$.subscribe(data => {
        this.openModal();
        this.dialog_subscription.unsubscribe();

      })
  }
  ngOnInit(){

  }
  openModal() {
    this.modalRef = this.modalService.show(this.templateref);
    this.billing_service.getPlans().subscribe(data => {
      this.billing = data;
    });
  }

  add(){
    let data = {'credits': this.credits};
    this.session_store.dispatch(new AddAccount(data));
    this.modalRef.hide();
  }

  replanish(plan: any){
    let data = {'credits': plan.credit, 'plan_id': plan.id};
    this.billing_service.addCredits(data).subscribe(data => {
      this.session_store.dispatch(new AddAccount(data));
    });

    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.dialog_subscription.unsubscribe();
  }

}
