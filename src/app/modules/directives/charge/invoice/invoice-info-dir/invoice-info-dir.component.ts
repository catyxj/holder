import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddressEditInvioceDirComponent} from "../modals/address-edit-invioce-dir/address-edit-invioce-dir.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChargeService} from "../../../../../shared/charge.service";
import {AdressService} from "../../../../../shared/adress.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-info-dir',
  templateUrl: './invoice-info-dir.component.html',
  styleUrls: ['./invoice-info-dir.component.css']
})
export class InvoiceInfoDirComponent implements OnInit {
  public amount; // 开票金额
  public addressList = []; // 地址列表
  public showAll = false; // 显示所有地址
  public defaultAddress; // 默认地址
  public otherAddress = []; // 其他地址
  public infoList = []; // 发票信息列表
  public defaultInfo; // 默认信息
  public otherInfo = []; // 其他信息
  public showAllInfo = false; // 显示所有信息
  public showAddAddr = false; // 选中添加新地址
  public selectedAddr; // 当前选中地址
  public selectedInfo; // 当前选中信息

  public newAddr = false; // 是否使用新地址
  public newAddress; // 新地址信息
  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName = '';
  public addrList;
  public cities = [];
  public regions = [];
  public checkAddr;
  public checkInfo;

  public showDefInfo; // 显示修改信息
  public showNewInfo; // 使用新信息
  public newInfo; // 新发票信息


  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private chargeService: ChargeService,
              private addressService: AdressService) { }

  ngOnInit() {
    this.amount = this.route.snapshot.paramMap.get('amount');
    this.newAddress = {
      name: '',
      address: '',
      contact: '',
      location: 0
    };
    this.newInfo = {
      name: '',
      id: '',
      bank: '',
      account: '',
      address: '',
      phone: ''
    };
    this.getAddressInfo();
    this.getInfo();
    this.getAddress();
  }

  getAddressInfo() {
    this.addressList = [
      {
        uid: '11111',
        def: false,
        name: 'aaaaa',
        location_id: 330201,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508x11111111'
      },
      {
        uid: '22222',
        def: false,
        name: 'bbbbb',
        location_id: 330203,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xx2222222'
      },
      {
        uid: '33333',
        def: true,
        name: 'aaaaa',
        location_id: 330101,
        address: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xxx3333333'
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
      this.selectedAddr = this.defaultAddress;
    }
  }


  getInfo() {
    this.infoList = [
      {
        uid: 'adsfas',
        def: true,
        name: '宁波厚德能源科技有限公司1',
        id: 'aaaa',
        bank: 'aaaaaaaa',
        account: '1224444',
        phone: '12345'
      },
      {
        uid: 'adsfas111',
        def: false,
        name: '宁波厚德能源科技有限公司',
        id: 'bbbb',
        bank: 'bbbbbbbbbbb',
        account: '1224dasf',
        phone: '12345222'
      },
      {
        uid: 'adsfas222',
        def: false,
        name: '宁波厚德能源科技有限公司',
        id: 'dddda',
        bank: 'aadddd',
        account: '122444dd',
        phone: '1234225'
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
      this.selectedInfo = this.defaultInfo;
    }

  }


  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
      });
  }


  /*initLocation() {
    let location = this.currentData.location_id;
    console.log(location);
    if (location && location !== 0) {
      if (location < 100) {
        location = location * 10000;
      } else if ( location < 10000) {
        location = location * 100;
      }
    }
    let aProvince = location ? Math.floor(location / 10000) : 0;
    let aCity = location ? Math.floor(location / 100) : 0;
    let aRegion = location ? location : 0;

    if (aProvince === 0) {
      this.selectedProvince = this.addrList[0];
      this.locationId = this.addrList[0].LocationId;
      this.locationName = this.addrList[0].LocationName;
      return;
    }
    for (let i = 0; i < this.addrList.length; i++) {
      if ( aProvince === this.addrList[i].LocationId ) {
        this.cities = this.addrList[i].cities;
        this.selectedProvince = this.addrList[i];
        this.locationId = this.addrList[i].LocationId;
        this.locationName = this.addrList[i].LocationName;
        if (aCity) {
          for (let j = 0; j < this.cities.length; j++) {
            if (aCity === this.cities[j].LocationId) {
              this.regions = this.cities[j].regions;
              this.selectedCity = this.cities[j];
              this.locationId = this.cities[j].LocationId;
              this.locationName = this.cities[j].LocationName;
              if (aRegion) {
                for ( let n = 0; n < this.regions.length; n++) {
                  if (aRegion === this.regions[n].LocationId) {
                    this.selectedRegion = this.regions[n];
                    this.locationId = this.regions[n].LocationId;
                    this.locationName = this.regions[n].LocationName;
                    break;
                  }
                }
              }
              break;
            }
          }
        }
        break;
      }
    }

  }*/

  provinceChange(value): void {
    console.log(value);
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.cities = value.cities;
    this.selectedCity = null;
    this.selectedRegion = null;
  }
  cityChange(value) {
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.regions = value.regions;
    this.selectedRegion = null;
  }
  regionChange(value) {
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
  }


  // 选中地址
  selectAddr(data) {
    this.selectedAddr = {
      uid: data.uid,
      name: data.name,
      address: data.address,
      contact: '',
      location: data.location_id
    };
    this.newAddr = false;
  }

  // 使用新地址
  selectNewAddr() {
    this.newAddr = true;
    this.selectedAddr = this.newAddress;
  }


  // 选中信息
  selectInfo(data) {
    this.selectedInfo = {
      uid: data.uid,
      name: data.name,
      id: data.id,
      bank: data.bank,
      account: data.account,
      address: data.address,
      phone: data.phone
    };
    this.showNewInfo = false;
  }

  // 使用新信息
  selectNewInfo() {
    this.showNewInfo = true;
    this.selectedInfo = this.newInfo;
  }


  // 修改地址
  editAddr(data) {
    let that = this;
    const modalRef = this.modalService.open(AddressEditInvioceDirComponent, {windowClass: 'modal_l', centered: true});
    modalRef.componentInstance.currentData = data;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getAddressInfo();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 删除地址
  deleteAddr(data) {

  }

  // 删除信息
  deleteInfo(data) {

  }


  save() {

    if (!this.selectedInfo) {
      Swal('请填写发票信息');
    }

    if (this.showAddAddr || this.newAddr) {
      this.newAddress.location = this.locationId;
    }

    let post = {
      showAddAddr: this.showAddAddr, // 添加新地址（无默认地址）
      showNewInfo: this.showNewInfo, // 显示新信息
      newAddr: this.newAddr, // 使用新地址（有默认地址）
      selectedAddr: this.selectedAddr,
      selectedInfo: this.selectedInfo
    };
    console.log(post);
  }

  closeW() {
    window.close();
  }

}
