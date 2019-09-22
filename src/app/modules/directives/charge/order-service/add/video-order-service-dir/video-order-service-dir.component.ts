import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../../shared/charge.service";
import {AddressAddPurchaseDirComponent} from "../../modals/address-add-purchase-dir/address-add-purchase-dir.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-video-order-service-dir',
  templateUrl: './video-order-service-dir.component.html',
  styleUrls: ['./video-order-service-dir.component.css']
})
export class VideoOrderServiceDirComponent implements OnInit {
  public count;
  public typeList = [];
  public type = 1;
  public addrList = [];
  public address;
  public orderType;
  public title;

  constructor(private chargeService: ChargeService,
              private modalService: NgbModal,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderType = this.route.snapshot.paramMap.get('type');
    switch (this.orderType) {
      case 'terminal':
        this.title = 'NK物联网终端订购';
        break;
      case 'video':
        this.title = '视频设备订购';
        break;
      case 'bluetooth':
        this.title = '蓝牙模组订购';
        break;
      case 'sensor':
        this.title = '传感器订购';
        break;
    }
    this.getTypeList();
    this.getAddrList();
  }

  // 获取版本信息
  getTypeList() {
    /*this.typeList = [
      {
        type: 1
      },
      {
        type: 2
      }
    ];*/

    this.chargeService.getProductInfo()
      .subscribe(data => {
        this.typeList = data;
      }, err => {

      });


  }

  // 获取地址信息
  getAddrList() {
    this.addrList = [
      {
        uid: 'aaaa',
        info: '浙江省 宁波市 鄞州区 新明街道 XXX'
      },
      {
        uid: 'bbb',
        info: '浙江省 宁波市 鄞州区 新明街道 XXX'
      },
      {
        uid: 'acc',
        info: '浙江省 宁波市 鄞州区 南部商务区 sssssss'
      },
      {
        uid: 'add',
        info: '浙江省 宁波市 鄞州区 新明街道 XXX'
      }
    ];

    this.chargeService.getAddressList()
      .subscribe(data => {
        this.addrList = data;
      }, err => {

      });
  }


  // 添加新地址
  addAddr() {
    let that = this;
    const modalRef = this.modalService.open(AddressAddPurchaseDirComponent, {windowClass: 'modal_l', centered: true});
    // modalRef.componentInstance.currentData = this.basic;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getAddrList();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  save() {
    let that = this;
    let post = {
      type: this.type,
      count: this.count,
      address: this.address
    };
    console.log(post);
    this.chargeService.submitOrder(post)
      .subscribe(val => {

        that.router.navigate(['/dir/charge/purchase/payment']);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });

  }

}
