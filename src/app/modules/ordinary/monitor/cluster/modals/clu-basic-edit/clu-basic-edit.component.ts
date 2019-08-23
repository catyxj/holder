import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClusterService} from "../../../../../../shared/cluster.service";
import {AdressService} from "../../../../../../shared/adress.service";
import {UploadFile} from "ng-zorro-antd/upload";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clu-basic-edit',
  templateUrl: './clu-basic-edit.component.html',
  styleUrls: ['./clu-basic-edit.component.css']
})
export class CluBasicEditComponent implements OnInit {
  @Input()
  uid;


  public info;
  imgUrl: string;
  public img;
  public name;
  public headOption;
  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName = '';
  public address;
  public addrList;
  public cities = [];
  public regions = [];

  constructor(public activeModal: NgbActiveModal,
              private clusterService: ClusterService,
              private addressService: AdressService) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };

    this.info = {
      id: 'hdahk',
      verify: 'asdf',
      use_org_name: 'asdfa',
      name: 'asdf',
      location_id: 120101
    };
    this.name = this.info.name;
    this.locationId = this.info.location_id;
    this.getAddress();

  }


  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
        this.initLocation();
      });
  }

  initLocation() {
    let location = this.info.location_id;
    // console.log(location);
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
      // this.locationId = this.addrList[0].LocationId;
      this.locationName = this.addrList[0].LocationName;
      return;
    }
    for (let i = 0; i < this.addrList.length; i++) {
      if ( aProvince === this.addrList[i].LocationId ) {
        this.cities = this.addrList[i].cities;
        this.selectedProvince = this.addrList[i];
        // this.locationId = this.addrList[i].LocationId;
        this.locationName = this.addrList[i].LocationName;
        if (aCity) {
          for (let j = 0; j < this.cities.length; j++) {
            if (aCity === this.cities[j].LocationId) {
              this.regions = this.cities[j].regions;
              this.selectedCity = this.cities[j];
              // this.locationId = this.cities[j].LocationId;
              this.locationName = this.cities[j].LocationName;
              if (aRegion) {
                for ( let n = 0; n < this.regions.length; n++) {
                  if (aRegion === this.regions[n].LocationId) {
                    this.selectedRegion = this.regions[n];
                    // this.locationId = this.regions[n].LocationId;
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

  }

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



  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJPG) {
      Swal(
        '请上传png,jpg,gif图片',
        '',
        'error'
      );
      return false;
    }
    const isLt2M = file.size / 1024  < 200;
    if (!isLt2M) {
      Swal(
        '图片大小不能超过200KB',
        '',
        'error'
      );
      return false;
    }
    return true;
  }

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }


  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        console.log(info);
        this.img = info.file;
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.imgUrl = img;
        });
        break;
      case 'error':
        Swal(
          '上传失败，请重试',
          info.file.message,
          'error'
        );
        break;
    }
  }


  save() {
    let that = this;
    let post;
    if (this.img) {
      post = {
        uid: this.uid,
        img: this.img.response.id
      };
    } else {
      post = {
        uid: this.uid
      };
    }

    console.log(this.locationId, this.locationName);
    this.clusterService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
