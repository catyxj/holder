import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-order-service-dir',
  templateUrl: './payment-order-service-dir.component.html',
  styleUrls: ['./payment-order-service-dir.component.css']
})
export class PaymentOrderServiceDirComponent implements OnInit {
  public type = 1;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
  }

  selectPay(n) {
    this.type = n;
  }

  save() {
    let post = {

    }
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
