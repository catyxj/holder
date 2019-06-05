import { Component, OnInit } from '@angular/core';
import {RechargeService} from "../../../shared/recharge.service";

@Component({
  selector: 'app-charge1',
  templateUrl: './charge1.component.html',
  styleUrls: ['./charge1.component.css']
})
export class Charge1Component implements OnInit {
  public simNumber;
  public price;

  constructor(private rechargeService: RechargeService) { }

  ngOnInit() {
    this.price = 300;
  }

  select(number) {
    this.price = number;
  }

  charge() {
    let data = {
      sim_number: this.simNumber,
      recharge_price: this.price
    };
    console.log(data);
    // window.location.href = 'https://openapi.alipaydev.com/gateway.do?app_id=2016092800616766&biz_content=%7B%22subject%22%3A%22%E8%BF%99%E6%98%AF%E5%95%86%E5%93%81%22%2C%22out_trade_no%22%3A%22cccccffaacc%22%2C%22total_amount%22%3A%220.1%22%2C%22product_code%22%3A%22FAST_INSTANT_TRADE_PAY%22%7D&charset=utf-8&format=JSON&method=alipay.trade.page.pay&notify_url=http%3A%2F%2Flocalhost%3A8080%2FaliPay&return_url=http%3A%2F%2Flocalhost%3A8080%2FaliPay%2Freturn&sign=i0IF51XVgpRNQMJd%2FgaErZtF8zFg9NAqlnowXeSi5TurNSLtXDQCezDxNhQZeVNLYnBLH8IB6LhklBOJ1MUDtLGmBiCm%2Bcl3omqpvFNrGLqG%2FfreJ8hOx3O3swyqdt6%2BbPlV9i2ZtyuB08ClJ9NE4VZ98CKvdBa36I8k1xUwX1qhcEliDZck%2BgY9X3NaUt4XATapOREcZNrQLiSrKlG07D1rdtY30CzY%2Fm9T0TtDUiIpXVRpgglxgyI2rLjY7HReaFv4P74vfOC1vVvJX81pS%2BHcCa37f%2FDta%2BsRGpePK%2BzYt8l2FdfZeh8PkcAmFaPqpYWF3PA8T%2BSXVAGXYF8LNw%3D%3D&sign_type=RSA2&timestamp=2019-06-05+15%3A13%3A29&version=1.0';
    // window.open('https://www.baidu.com');
    this.rechargeService.charge1(data)
      .subscribe(val => {
        window.location.href = val;
      }, err => {

      });

  }

}
