import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../shared/order.service";
import {OrderStatusSettingAdComponent} from "../modals/order-status-setting-ad/order-status-setting-ad.component";


@Component({
  selector: 'app-order-info-ad',
  templateUrl: './order-info-ad.component.html',
  styleUrls: ['./order-info-ad.component.css']
})
export class OrderInfoAdComponent implements OnInit {
  public uid;
  public info;
  public products;
  public listPage;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private orderService: OrderService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');


    this.getBasic();
    // this.getProducts();
  }

  // 获取基础信息
  getBasic() {
    /*this.info = {
      amount: 300,
      pay_account: 'asdfa@123.com'
    };
    this.basic.pay_account = this.hideEmailInfo(this.basic.pay_account);*/

    this.orderService.getBasic(this.uid)
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

  // 状态设置模态框
  statusSet() {
    let that = this;
    const modalRef = this.modalService.open(OrderStatusSettingAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.info;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
      }
    }, (reason) => {
      console.log(reason);
    });
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
