import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-order-service-dir',
  templateUrl: './payment-order-service-dir.component.html',
  styleUrls: ['./payment-order-service-dir.component.css']
})
export class PaymentOrderServiceDirComponent implements OnInit {
  public type = 1;

  constructor() { }

  ngOnInit() {
  }

  selectPay(n) {
    this.type = n;
  }

}
