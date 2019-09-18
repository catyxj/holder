import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddressEditInvioceDirComponent} from "../modals/address-edit-invioce-dir/address-edit-invioce-dir.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-invoice-info-dir',
  templateUrl: './invoice-info-dir.component.html',
  styleUrls: ['./invoice-info-dir.component.css']
})
export class InvoiceInfoDirComponent implements OnInit {
  public amount;
  public addressList = [];
  public showAll = false;
  public defaultAddress;
  public otherAddress = [];
  public infoList = [];
  public defaultInfo;
  public otherInfo = [];
  public showAllInfo = false;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private chargeService: ChargeService) { }

  ngOnInit() {
    this.amount = this.route.snapshot.paramMap.get('amount');
    this.getAddress();
    this.getInfo();
  }

  getAddress() {
    this.addressList = [
      {
        def: false,
        location_id: 330201,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xxxxxxxxxxx'
      },
      {
        def: false,
        location_id: 330203,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xxxxxxxxxxx'
      },
      {
        def: true,
        location_id: 330101,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xxxxxxxxxxx'
      }
    ];


    if (this.addressList && this.addressList.length > 0) {
      this.otherAddress = [];
      for (let i = 0; i < this.addressList.length; i++) {
        if (this.addressList[i].def) {
          this.defaultAddress = this.addressList[i];
        } else {
          this.otherAddress.push(this.addressList[i]);
        }
      }
    }
  }


  getInfo() {
    this.infoList = [
      {
        def: true,
        name: '宁波厚德能源科技有限公司1'
      },
      {
        def: false,
        name: '宁波厚德能源科技有限公司'
      },
      {
        def: false,
        name: '宁波厚德能源科技有限公司'
      }
    ];

    if (this.infoList && this.infoList.length > 0) {
      this.otherInfo = [];
      for (let i = 0; i < this.infoList.length; i++) {
        if (this.infoList[i].def) {
          this.defaultInfo = this.infoList[i];
        } else {
          this.otherInfo.push(this.infoList[i]);
        }
      }
    }

  }


  // 修改地址
  editAddr(data) {
    let that = this;
    const modalRef = this.modalService.open(AddressEditInvioceDirComponent, {windowClass: 'modal_l', centered: true});
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

}
