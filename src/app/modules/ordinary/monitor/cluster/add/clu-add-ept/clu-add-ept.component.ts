import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadFile} from "ng-zorro-antd/upload";

import Swal from 'sweetalert2';
import {AdressService} from "../../../../../../shared/adress.service";
import {ClusterService} from "../../../../../../shared/cluster.service";

@Component({
  selector: 'app-clu-add-ept',
  templateUrl: './clu-add-ept.component.html',
  styleUrls: ['./clu-add-ept.component.css']
})
export class CluAddEptComponent implements OnInit {
  @Output()
  next = new EventEmitter();
  @Output()
  changeUid = new EventEmitter();
  @Input()
  uid;

  imgUrl: string;
  public img;
  public name;
  public headOption;
  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName = '';
  public address = '';
  public addrList;
  public cities = [];
  public regions = [];

  public info;

  constructor(private addressService: AdressService,
              private clusterService: ClusterService) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };

    this.getAddress();
    if (this.uid) {
      this.getInfo();
    }
  }


  getInfo() {
    this.clusterService.getInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.name = data.name;
        this.address = data.address;
        this.imgUrl = data.img;
      }, err => {

      });
  }

  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
        if (this.uid) {
          this.initLocation();
        }
      });
  }

  initLocation() {
    let location = this.info.location;
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
    let post;
    if (this.img) {
      post = {
        uid: this.uid,
        name: this.name,
        location: this.locationId,
        location_name: this.locationName,
        address: this.address,
        img: this.img.response.id
      };
    } else {
      post = {
        uid: this.uid,
        name: this.name,
        location: this.locationId,
        location_name: this.locationName,
        address: this.address
      };
    }

    this.clusterService.addCluster(post)
      .subscribe( res => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.uid = res.uid;
        this.changeUid.emit(this.uid);
        this.next.emit(1);
      }, err => {
        Swal(
          '操作失败！',
          err.message || err,
          'error'
        );

      });


    // this.next.emit(1);

  }

}
