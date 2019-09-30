import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderService} from "../../../../../shared/order.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-status-setting-ad',
  templateUrl: './order-status-setting-ad.component.html',
  styleUrls: ['./order-status-setting-ad.component.css']
})
export class OrderStatusSettingAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public status;

  constructor(public activeModal: NgbActiveModal,
              private orderService: OrderService) { }

  ngOnInit() {
    // this.status = this.currentData.order_status;
    this.status = '1';
  }

  save() {
    let that = this;
    let post = {
      order_sn: this.uid,
      status: this.status
    };
    this.orderService.setStatus(this.uid)
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
