import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import {AdressService} from "../../../shared/adress.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @Input()
  currentData: any;
  currentUser: any;
  editing: boolean;
  // locations: any;

  public orgTypes: any[];
  public data: any;
  public cities: any = [];
  public regions: any;
  public brandImg;
  public img;
  public errMes;
  public locations;
  public isLoading = false;


  constructor(public activeModal: NgbActiveModal,
              private orgService: OrganizationService,
              private addrService: AdressService) {
  }

  ngOnInit() {
    // console.log(this.currentUser, this.currentData);
    this.data = {
      name: this.currentData.Name,
      typeId: this.currentData.Type__Type,
      aProvince: 0,
      aCity: 0,
      aRegion: 0,
      address: this.currentData.Address,
      isSuper: this.currentData.IsSupervisor,
      showBrand: this.currentData.ShowBrand,
      brandName: this.currentData.BrandName,
      is_ept_ctl: this.currentData.IsEptCtl,
      locationName: this.currentData.location_name,
    };

    this.brandImg = this.currentData.BrandImageUrl;

    this.getOrgType();
    this.getAddr();

  }


  // 获取地址
  getAddr() {
    this.addrService.getAddress()
      .subscribe(addr => {
        this.locations = addr;

        let location;
        if (this.currentData.Location) {
          let locationId = this.currentData.Location ? this.currentData.Location : 0;
          if (locationId < 100) {
            location = locationId * 10000;
          } else if (locationId < 10000) {
            location = locationId * 100;
          } else {
            location = locationId;
          }
        }

        this.data.aProvince = this.currentData.Location ? Math.floor(location / 10000) : 0;
        this.data.aCity = this.currentData.Location ? Math.floor(location / 100) : 0;
        this.data.aRegion = this.currentData.Location ? location : 0;

        // console.log(this.currentData, this.data);
        // console.log(this.data.aProvince, this.data.aCity, this.data.aRegion);

        if (this.data.aProvince) {
          this.initProvince();
        }
        if (this.data.aCity) {
          this.changeCities();
        }
        if (this.data.aRegion) {
          this.changeRegion();
        }

      });
  }


  // 地址
  initProvince() {
    if (typeof(this.data.aProvince) !== 'number') {
      this.data.aProvince = parseInt(this.data.aProvince);
    }
    for (let i = 0; i < this.locations.length; i++) {
      if (this.data.aProvince === 0) {
        this.cities = [];
        this.regions = [];
        return;
      }
      if (this.data.aProvince === this.locations[i].LocationId) {
        this.cities = this.locations[i].cities;
      }
    }
    this.data.location = this.data.aProvince;
  }

  changeProvince() {
    if (typeof(this.data.aProvince) !== 'number') {
      this.data.aProvince = parseInt(this.data.aProvince);
    }
    if (this.data.aProvince === 0) {
      this.cities = [];
      this.regions = [];
      this.data.locationName = '全国';
    } else {
      for (let i = 0; i < this.locations.length; i++) {
        if (this.data.aProvince === this.locations[i].LocationId) {
          this.cities = this.locations[i].cities;
          this.data.locationName = this.locations[i].LocationName;
        }
      }
    }
    this.data.aCity = 0;
    this.data.aRegion = 0;
    this.data.location = this.data.aProvince;
  }

  changeCities() {
    if (typeof(this.data.aCity) !== 'number') {
      this.data.aCity = parseInt(this.data.aCity);
    }
    for (let i = 0; i < this.cities.length; i++) {
      if (this.data.aCity === this.cities[i].LocationId) {
        this.regions = this.cities[i].regions;
        this.data.locationName = this.cities[i].LocationName;
      }
    }
    this.data.location = this.data.aCity;
  }

  changeRegion() {
    if (typeof(this.data.aRegion) !== 'number') {
      this.data.aRegion = parseInt(this.data.aRegion);
    }
    for (let i = 0; i < this.regions.length; i++) {
      if ( this.data.aRegion === this.regions[i].LocationId ) {
        this.data.locationName = this.regions[i].LocationName;
      }
    }
    this.data.location = this.data.aRegion;
  }

  // 获取企业类型
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {
        this.orgTypes = types;
      });
  }


  //  上传图片
  imgChange(event) {
    let that = this;
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.img = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function () {
        // 显示图片
        that.brandImg = this.result;
        that.errMes = ' ';

      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }


  // 删除图片
  removeImg() {
    let that = this;
    that.brandImg = '';
  }


  // 保存
  save() {
    let postData = {
      uid: this.currentData.Uid,
      name: this.data.name,
      type: parseInt(this.data.typeId),
      address: this.data.address,
      location: this.data.location,
      location_name : this.data.locationName,
      show_brand: null,
      brand_name: null,
      is_super: null,
      brand_img: '',
      is_ept_ctl: false
    };
    if (this.currentUser.Role.Id <= 2) {
      postData.show_brand = this.data.showBrand;
      postData.brand_name = this.data.brandName;
      postData.is_ept_ctl = this.data.is_ept_ctl;
      if (this.img) {
        postData.brand_img = this.brandImg;
      }
      postData.is_super = this.data.isSuper;
    }

    this.isLoading = true;
    this.orgService.save(postData)
      .subscribe(val => {
        this.isLoading = false;
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        this.isLoading = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });


  }

  cancel() {
    this.activeModal.dismiss('close');
  }

}
