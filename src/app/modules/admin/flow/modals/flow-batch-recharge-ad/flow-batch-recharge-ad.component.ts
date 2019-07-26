import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FlowService} from "../../../../../shared/flow.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-flow-batch-recharge-ad',
  templateUrl: './flow-batch-recharge-ad.component.html',
  styleUrls: ['./flow-batch-recharge-ad.component.css']
})
export class FlowBatchRechargeAdComponent implements OnInit {
  @Input()
  currentData;

  public amount;
  public isSpinning = false;

  constructor(public activeModal: NgbActiveModal,
              private flowService: FlowService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      amount: this.amount,
      iccid: this.currentData
    };
    this.isSpinning = true;
    this.flowService.batchRecharge(post)
      .subscribe(val => {
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
