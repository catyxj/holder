import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-set-fi',
  templateUrl: './invoice-set-fi.component.html',
  styleUrls: ['./invoice-set-fi.component.css']
})
export class InvoiceSetFiComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public status;

  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    /*this.deliveryService.scrap(this.uid)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });*/
  }

}
