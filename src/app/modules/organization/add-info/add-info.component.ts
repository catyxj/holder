import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import {AdressService} from "../../../shared/adress.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {

  @Input()
  currentData: any;
  currentUser: any;
  editing: boolean;
  // locations: any;

  public orgTypes: any[];
  public data: any ;
  public cities: any;
  public regions: any;
  public brandImg;
  public img;
  public errMes;
  public locations;
  public isLoading = false;



  constructor(public activeModal: NgbActiveModal,
              private orgService: OrganizationService,
              private addrService: AdressService) { }

  ngOnInit() {

    this.data = {
      name: '',
      typeId: null,
      aProvince: 0,
      aCity: 0,
      aRegion: 0,
      locationName: '全国',
      address: '',
      isSuper: false,
      showBrand: false,
      brandName: '',
      is_ept_ctl: false
    };

    this.getAddr();
    this.getOrgType();


  }


  // 获取地址
  getAddr() {
    this.addrService.getAddress()
      .subscribe(addr => {
        this.locations = addr;
      });
  }

  // 地址
  changeProvince() {
    for (let i = 0; i < this.locations.length; i++) {
      if ( parseInt(this.data.aProvince) === 0) {
        this.cities = [];
        this.regions = [];
        this.data.locationName = '全国';
        return;
      }
      if ( parseInt(this.data.aProvince) === this.locations[i].LocationId ) {
        this.cities = this.locations[i].cities;
        this.data.locationName = this.locations[i].LocationName;
      }
    }
    this.data.aCity = 0;
    this.data.aRegion = 0;
    this.data.location = parseInt(this.data.aProvince);
  }
  changeCities() {
    for (let i = 0; i < this.cities.length; i++) {
      if ( parseInt(this.data.aCity) === this.cities[i].LocationId ) {
        this.regions = this.cities[i].regions;
        this.data.locationName = this.cities[i].LocationName;
      }
    }
    this.data.location = parseInt(this.data.aCity);
  }

  changeRegion() {
    for (let i = 0; i < this.regions.length; i++) {
      if ( parseInt(this.data.aRegion) === this.regions[i].LocationId ) {
        this.data.locationName = this.regions[i].LocationName;
      }
    }
    this.data.location = parseInt(this.data.aRegion);
  }

  // 获取企业类型
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {this.orgTypes = types; });
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

      reader.onload = function() {
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
    console.log(this.data.typeId);

    if (this.currentUser.Role.Id <= 2) {
      postData.show_brand = this.data.showBrand;
      postData.brand_name = this.data.brandName;
      postData.is_ept_ctl = this.data.is_ept_ctl;
      if (this.img) {
        postData.brand_img = this.brandImg;
      }
      postData.is_super = this.data.isSuper;

    }

    // console.log(postData);
    this.isLoading = true;
    this.orgService.add(postData)
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
