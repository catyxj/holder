import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import {InvoiceService} from "../../../../../shared/invoice.service";

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

  constructor(public activeModal: NgbActiveModal,
              private invoiceService: InvoiceService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      status: this.status
    };
    this.invoiceService.invoiceStatusSet(post)
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
      });
  }

}
