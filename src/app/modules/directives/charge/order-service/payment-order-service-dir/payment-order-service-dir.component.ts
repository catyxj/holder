import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-order-service-dir',
  templateUrl: './payment-order-service-dir.component.html',
  styleUrls: ['./payment-order-service-dir.component.css']
})
export class PaymentOrderServiceDirComponent implements OnInit {
  public type = 1;
  public uid;
  public info;

  constructor(private chargeService: ChargeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getInfo();
  }

  // 获取订单信息
  getInfo() {
    this.chargeService.getPayInfo(this.uid)
      .subscribe(data => {
        this.info = data;
      }, err => {

      });

  }

  selectPay(n) {
    this.type = n;
  }

  save() {
    let post = {
      order_sn: this.uid,
      method: this.type
    };
    this.chargeService.payOrder(post)
      .subscribe(val => {

    }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
