import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../../shared/charge.service";
import {AddressAddPurchaseDirComponent} from "../../modals/address-add-purchase-dir/address-add-purchase-dir.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";

import Swal from 'sweetalert2';
import {AddressEditPurchaseDirComponent} from "../../modals/address-edit-purchase-dir/address-edit-purchase-dir.component";


@Component({
  selector: 'app-video-order-service-dir',
  templateUrl: './video-order-service-dir.component.html',
  styleUrls: ['./video-order-service-dir.component.css']
})
export class VideoOrderServiceDirComponent implements OnInit {
  public count = 1;
  public typeList = [];
  public type; // 选择类型
  public addrList = [];
  public addressId;
  public orderType;
  public title;
  public id;
  public cost;

  constructor(private chargeService: ChargeService,
              private modalService: NgbModal,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderType = this.route.snapshot.paramMap.get('type');
    switch (this.orderType) {
      case 'terminal':
        this.title = 'NK物联网终端订购';
        this.id = 1;
        break;
      case 'video':
        this.title = '视频设备订购';
        this.id = 2;
        break;
      case 'bluetooth':
        this.title = '蓝牙模组订购';
        this.id = 3;
        break;
      case 'sensor':
        this.title = '传感器订购';
        this.id = 4;
        break;
    }
    this.getTypeList();
    this.getAddrList();
  }

  // 获取版本信息
  getTypeList() {
    /*this.typeList = [
      {
        id: 1,
        name: 'aaa',
        price: 222
      },
      {
        id: 2,
        name: 'bbb',
        price: 111
      }
    ];*/

    this.chargeService.getProductInfo(this.id)
      .subscribe(data => {
        this.typeList = data;
        for (let i = 0; i < this.typeList.length; i++) {
          let ty = this.typeList[i];
          ty.des = JSON.parse(ty.description);
        }
      }, err => {

      });


  }

  // 获取地址信息
  getAddrList() {
    /*this.addrList = [
      {
        uid: 'aaaa',
        name: 'aaaaaaa',
        telephone: '122334',
        location_name: '浙江省 宁波市 鄞州区 新明街道 XXX',
        location_id: 330201,
        address: 'aaaaaaaaaaaaaaaa'
      },
      {
        uid: 'bbb',
        name: 'bbbbbb',
        telephone: '122334',
        location_name: '浙江省 宁波市 鄞州区 新明街道 XXX'
      },
      {
        uid: 'acc',
        name: 'cccccc',
        telephone: '122334',
        location_name: '浙江省 宁波市 鄞州区 南部商务区 sssssss'
      },
      {
        uid: 'adad',
        name: 'dddddd',
        telephone: '122334',
        location_name: '浙江省 宁波市 鄞州区 新明街道 XXX'
      }
    ];*/

    let type = 1;
    this.chargeService.getAddressList(type)
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

  // 修改地址
  editAddr(data) {
    let that = this;
    const modalRef = this.modalService.open(AddressEditPurchaseDirComponent, {windowClass: 'modal_l', centered: true});
    modalRef.componentInstance.currentData = data;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getAddrList();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 删除地址
  delAddr(data) {
    let that = this;
    this.chargeService.deleteAddress({data: [data.uid]})
      .subscribe(val => {
        /*Swal(
          '删除成功！',
          '',
          'success'
        );*/
        that.getAddrList();
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


  save() {
    let that = this;
    if (!this.type) {
      Swal(
        '请选择产品型号',
        '',
        'info'
      );
      return;
    }
    if (!this.addrList || this.addrList.length <= 0 || !this.addressId) {
      Swal(
        '请选择地址或添加新地址',
        '',
        'info'
      );
      return;
    }

    let addr;
    for (let i = 0; i < this.addrList.length; i++) {
      if (this.addressId === this.addrList[i].uid) {
        addr = this.addrList[i];
        break;
      }
    }

    console.log(addr);
    let post = {
      item_id: this.type,
      number: this.count,
      ship_name: addr.name,
      ship_tel: addr.telephone,
      ship_address: addr.location_name
    };
    console.log(post);
    this.chargeService.submitOrder(post)
      .subscribe(val => {
        let uid = val.order_sn;
        that.router.navigate(['/dir/charge/purchase/payment', uid]);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });

    // that.router.navigate(['/dir/charge/purchase/payment', 'aaaa']);

  }

}
