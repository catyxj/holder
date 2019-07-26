import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../../../../../shared/flow.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-flow-charge-inline-ad',
  templateUrl: './flow-charge-inline-ad.component.html',
  styleUrls: ['./flow-charge-inline-ad.component.css']
})
export class FlowChargeInlineAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public price;
  public amount;
  public isSpinning = false;

  constructor(public activeModal: NgbActiveModal,
              public flowService: FlowService) { }

  ngOnInit() {
    this.getAmount();
  }

  // 获取系统余额
  getAmount() {
    this.flowService.getAmount()
      .subscribe(data => {
        this.amount = data.amount;
      }, err => {

      });
  }

  save() {
    let that = this;
    let data = {
      iccid: [this.currentData.iccid],
      amount: this.price
    };
    console.log(data);
    // window.open('https://www.baidu.com');
    this.isSpinning = true;
    this.flowService.batchRecharge(data)
      .subscribe(val => {
        // window.location.href = val;
        that.isSpinning = false;
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        that.isSpinning = false;
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
