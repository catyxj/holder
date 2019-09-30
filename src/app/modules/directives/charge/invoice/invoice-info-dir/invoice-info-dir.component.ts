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
  public sn; // 开票订单号

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
    this.sn = this.route.snapshot.paramMap.get('sn');
    // console.log(this.sn);

    this.newAddress = {
      name: '',
      address: '',
      telephone: '',
      location_id: 0,
      location_name: ''
    };
    this.newInfo = {
      name: '',
      taxpayer: '',
      bank: '',
      account: '',
      address: '',
      phone: ''
    };
    this.getAddressInfo();
    this.getInfo();
    this.getAddress();
  }

  // 获取地址信息
  getAddressInfo() {
    /*this.addressList = [
      {
        uid: '11111',
        is_default: false,
        name: 'aaaaa',
        location_id: 330201,
        location_name: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508x1',
        telephone: '11111111',
        address: '浙江 宁波 鄞州区'
      },
      {
        uid: '22222',
        is_default: false,
        name: 'bbbbb',
        location_id: 330203,
        telephone: '11111111',
        location_name: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508x',
        address: '首南街道 泰康中路558号宁波商会国贸中心A座2508xx2222222'
      },
      {
        uid: '33333',
        is_default: true,
        name: 'aaaaa',
        location_name: '浙江 宁波 鄞州区 首南街道 泰康中路558号宁波商会国贸中心A座2508xx22',
        telephone: '11111111',
        location_id: 330101,
        address: '首南街道 泰康中路558号宁波商会国贸中心A座2508xxx3333333'
      }
    ];
    this.initAddress();*/

    let type = 2;
    this.chargeService.getAddressList(type)
      .subscribe(data => {
        this.addressList = data;
        this.initAddress();
      }, err => {

      });
  }

  initAddress() {
    if (this.addressList && this.addressList.length > 0) {
      this.otherAddress = [];
      for (let i = 0; i < this.addressList.length; i++) {
        if (this.addressList[i].is_default) {
          this.defaultAddress = this.addressList[i];
        } else {
          this.otherAddress.push(this.addressList[i]);
        }
      }
      this.selectedAddr = this.defaultAddress;

      console.log(this.defaultAddress, this.otherAddress);
    }
  }



  getInfo() {
    /*this.infoList = [
      {
        id: 'adsfas',
        is_default: true,
        company: '宁波厚德能源科技有限公司1',
        taxpayer_id: 'aaaa',
        bank_account: 'aaaaaaaa',
        open_account: '1224444',
        register_place: '浙江省宁波市海曙区',
        register_tel: '12345'
      },
      {
        id: 'adsfas111',
        is_default: false,
        company: '宁波厚德能源科技有限公司',
        taxpayer_id: 'bbbb',
        bank_account: 'bbbbbbbbbbb',
        open_account: '1224dasf',
        register_place: '浙江省宁波市鄞州区',
        register_tel: '12345222'
      }
    ];
    if (this.infoList && this.infoList.length > 0) {
      this.otherInfo = [];
      for (let i = 0; i < this.infoList.length; i++) {
        if (this.infoList[i].is_default) {
          this.defaultInfo = this.infoList[i];
        } else {
          this.otherInfo.push(this.infoList[i]);
        }
      }
      this.selectedInfo = {
        id: this.defaultInfo.id,
        name: this.defaultInfo.company,
        taxpayer: this.defaultInfo.taxpayer_id,
        bank: this.defaultInfo.bank_account,
        account: this.defaultInfo.open_account,
        address: this.defaultInfo.register_place,
        phone: this.defaultInfo.register_tel
      };
    }*/

    this.chargeService.getInvoiceInfoList()
      .subscribe(data => {
        this.infoList = data;
        if (this.infoList && this.infoList.length > 0) {
          this.otherInfo = [];
          for (let i = 0; i < this.infoList.length; i++) {
            if (this.infoList[i].is_default) {
              this.defaultInfo = this.infoList[i];
            } else {
              this.otherInfo.push(this.infoList[i]);
            }
          }
          this.selectedInfo = {
            id: this.defaultInfo.id,
            name: this.defaultInfo.company,
            taxpayer: this.defaultInfo.taxpayer_id,
            bank: this.defaultInfo.bank_account,
            account: this.defaultInfo.open_account,
            address: this.defaultInfo.register_place,
            phone: this.defaultInfo.register_tel
          };
        }
      }, err => {

      });

  }

  // 获取地区下拉列表
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
    this.selectedAddr = data;
    this.newAddr = false;
    this.checkAddr = false;
  }

  // 使用新地址
  selectNewAddr() {
    this.newAddr = true;
    this.selectedAddr = this.newAddress;
  }


  // 选中信息
  selectInfo(data) {
    this.selectedInfo = {
      id: data.id,
      name: data.company,
      taxpayer: data.taxpayer_id,
      bank: data.bank_account,
      account: data.open_account,
      address: data.register_place,
      phone: data.register_tel
    };
    this.showNewInfo = false;
    this.checkInfo = false;
    if (!data.is_default) {
      this.showDefInfo = false;
    }
  }

  // 使用新信息
  selectNewInfo() {
    this.showNewInfo = true;
    this.showDefInfo = false;
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
    let that = this;
    this.chargeService.deleteAddress({data: [data.uid]})
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.getAddressInfo();
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

  // 设为默认地址
  setDefaultAddr(data) {
    let that = this;
    that.getAddressInfo();
  }

  // 删除信息
  deleteInfo(data) {
    let that = this;
    this.chargeService.deleteInvoiceInfo(data.id)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.getInfo();
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

  // 设为默认信息
  setDefaultInfo(data) {
    let that = this;
    that.getInfo();
  }


  // 提交
  save() {

    let that = this;
    if (this.showAddAddr || this.newAddr) {
      this.newAddress.location_id = this.locationId;
      this.newAddress.location_name = this.locationName  + this.newAddress.address;
    }

    console.log(this.selectedAddr);
    if (!this.selectedAddr || !this.selectedAddr.name || !this.selectedAddr.location_id || !this.selectedAddr.address
      || !this.selectedAddr.telephone) {
      Swal('请填写完整地址信息');
      return;
    }
    if (!this.selectedInfo || !this.selectedInfo.name || !this.selectedInfo.taxpayer || !this.selectedInfo.bank
      || !this.selectedInfo.account || !this.selectedInfo.address || !this.selectedInfo.phone) {
      Swal('请填写完整发票信息');
      return;
    }




    // name: this.defaultInfo.company,
    //   taxpayer: this.defaultInfo.taxpayer_id,
    //   bank: this.defaultInfo.bank_account,
    //   account: this.defaultInfo.open_account,
    //   address: this.defaultInfo.register_place,
    //   phone: this.defaultInfo.register_tel
    let post = {
      order_sn: [this.sn],
      name: this.selectedAddr.name,
      location_id: this.selectedAddr.location_id,
      location_name: this.selectedAddr.location_name,
      address: this.selectedAddr.address,
      tel: this.selectedAddr.telephone,
      address_add: this.checkAddr,
      company: this.selectedInfo.name,
      taxpayer_id: this.selectedInfo.taxpayer,
      bank_account: this.selectedInfo.bank,
      open_account: this.selectedInfo.account,
      register_place: this.selectedInfo.address,
      register_tel: this.selectedInfo.phone,
      invoiced_add: this.checkInfo
    };
    console.log(post);
    this.chargeService.submitInvoice(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        ).then(() => {
          that.closeW();
        });

      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

  closeW() {
    window.close();
  }

}
