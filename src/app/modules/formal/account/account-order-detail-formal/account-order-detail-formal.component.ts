import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../shared/order.service";
import {ChargeService} from "../../../../shared/charge.service";

@Component({
  selector: 'app-account-order-detail-formal',
  templateUrl: './account-order-detail-formal.component.html',
  styleUrls: ['./account-order-detail-formal.component.css']
})
export class AccountOrderDetailFormalComponent implements OnInit {
  public uid;
  public info;
  public products;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private orderService: OrderService,
              private chargeService: ChargeService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getBasic();
  }


  // 获取基础信息
  getBasic() {
    /*this.basic = {
      amount: 300,
      pay_account: 'asdfa@123.com'
    };
    this.basic.pay_account = this.hideEmailInfo(this.basic.pay_account);*/


    this.chargeService.getOrderInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.info.buyer_account = this.hideEmailInfo(this.info.buyer_account);
        if (this.info && this.info.item_type === 1) {
          this.info.des = JSON.parse(this.info.item_desc);
        }
      }, err => {

      });
  }

  // 获取产品信息
  /*getProducts() {
    this.orderService.getProducts(this.uid)
      .subscribe(data => {
        this.products = data;
      }, err => {

      });
  }*/




  hideEmailInfo(email) {
    if (String (email).indexOf ('@') > 0) {
      let newEmail, str = email.split('@'), _s = '';

      for (let i = 0; i < str[0].length; i++) {
        _s += '*';
      }

      /*if (str[0].length > 4) {
        _s = str[0].substr (0, 4);
        for (let i = 0; i < str[0].length - 4; i++) {
          _s += '*';
        }
      } else {
        _s = str[0].substr (0, 1);
        for (let i = 0; i < str[0].length - 1; i++) {
          _s += '*';
        }
      }*/
      newEmail = _s + '@' + str[1];
      return newEmail;
    } else {
      return this.hidden(email, 2, 2);
    }
  }

// 隐藏字符
  hidden(str, frontLen, endLen) {
    let len = str.length - frontLen - endLen;
    if (len <= 2) {
      return '**';
    }
    let xing = '';
    for (let i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  }


  goBack() {
    window.history.go(-1);
  }

}
