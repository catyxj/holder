import { Component, OnInit } from '@angular/core';
import {AddressAddPurchaseDirComponent} from "../../modals/address-add-purchase-dir/address-add-purchase-dir.component";
import Swal from 'sweetalert2';
import {ChargeService} from "../../../../../../shared/charge.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sensor-order-service-dir',
  templateUrl: './sensor-order-service-dir.component.html',
  styleUrls: ['./sensor-order-service-dir.component.css']
})
export class SensorOrderServiceDirComponent implements OnInit {
  public count;
  public typeList = [];
  public type = 1;
  public addrList = [];
  public address;

  constructor(private chargeService: ChargeService,
              private modalService: NgbModal,
              public router: Router) { }

  ngOnInit() {
    this.getTypeList();
    this.getAddrList();
  }

  // 获取版本信息
  getTypeList() {
    this.typeList = [
      {
        type: 1
      },
      {
        type: 2
      }
    ];
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
    that.router.navigate(['/dir/charge/purchase/payment']);
  }

}
