import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment-order-service-dir',
  templateUrl: './payment-order-service-dir.component.html',
  styleUrls: ['./payment-order-service-dir.component.css']
})
export class PaymentOrderServiceDirComponent implements OnInit {
  public type = 1;
  public uid;
  public info;
  public isVisible = false;

  constructor(private chargeService: ChargeService,
              private route: ActivatedRoute,
              private router: Router) { }

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
        if (this.type === 1) {
          /*Swal(
            '订单已提交',
            '',
            'success'
          ).then(() => {
            window.close();
          });*/
          this.isVisible = true;
        }
        if (this.type === 2) {
          window.location.href = val;
        }
    }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


  handleOk(): void {
    this.isVisible = false;
    // window.close();
    this.router.navigate(['/charge/purchase/dashboard']);
  }

}
