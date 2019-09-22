import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-order-info-dir',
  templateUrl: './order-info-dir.component.html',
  styleUrls: ['./order-info-dir.component.css']
})
export class OrderInfoDirComponent implements OnInit {
  public uid;
  public basic;
  public products;
  public listPage;

  constructor(private route: ActivatedRoute,
              private chargeService: ChargeService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');


    this.getInfo();
  }


  getInfo() {
    /*this.basic = {
      amount: 300,
      pay_account: 'asdfa@123.com'
    };*/

    this.chargeService.getOrderInfo(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  goBack() {
    window.history.go(-1);
  }


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

}
