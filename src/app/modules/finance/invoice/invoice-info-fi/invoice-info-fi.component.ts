import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InvoiceSetFiComponent} from "../modals/invoice-set-fi/invoice-set-fi.component";
import Swal from 'sweetalert2';
import {InvoiceService} from "../../../../shared/invoice.service";

@Component({
  selector: 'app-invoice-info-fi',
  templateUrl: './invoice-info-fi.component.html',
  styleUrls: ['./invoice-info-fi.component.css']
})
export class InvoiceInfoFiComponent implements OnInit {
  public uid;
  public basic;
  public invoice;
  public listPage;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');


    this.getBasic();
  }

  // 获取基础信息
  getBasic() {
    /*this.basic = {
      created_username: '112333',
      created_name: 'aaaaa',
      created_org: 'aaaadsf',
      created_at: '2019-4-4',
      order_status: false,
      pay_at: '2019-9-9',
      pay_money: 300,
      buyer_account: 'asdfa@123.com'
    };
    if (this.basic && this.basic.buyer_account) {
      this.basic.buyer_account = this.hideEmailInfo(this.basic.buyer_account);
    }
    this.invoice = {
      company: 'qqqq',
      taxpayer_id: '122334',
      bank_account: 'adfa',
      open_account: 'asdfasdf',
      register_place: '浙江省宁波市',
      register_tel: '1234654',
      invoiced_type: 1,
      name: 'asdfasdf',
      tel: '1234549798',
      location_name: '浙江省宁波市海曙区哒哒哒哒哒哒'
    };*/


    this.invoiceService.getInvoiceInfo(this.uid)
      .subscribe(data => {
        this.basic = data.order;
        this.invoice = data.invoiced;
        if (this.basic && this.basic.buyer_account) {
          this.basic.buyer_account = this.hideEmailInfo(this.basic.buyer_account);
        }
      }, err => {

      });
  }

  // 状态设置模态框
  statusSet() {
    let that = this;
    const modalRef = this.modalService.open(InvoiceSetFiComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
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
