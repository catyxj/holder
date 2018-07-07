import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AdressService} from '../../../shared/adress.service';
import {BoilerService} from '../../../shared/boiler.service';

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  @Input()
  currentData: any;

  public address: any;
  public addrList: any;

  constructor(public activeModal: NgbActiveModal,
              public addressService: AdressService,
              public boilerService: BoilerService) { }


  ngOnInit() {
    console.log(this.currentData);
    this.address = {
      lng: this.currentData.Address ? this.currentData.Address.Longitude : 0, // 经度
      lat: this.currentData.Address ? this.currentData.Address.Latitude : 0, // 纬度
      location: this.currentData.Address ? this.currentData.Address.Location.LocationId : 0,
      address: this.currentData.Address ? this.currentData.Address.Address : ''
    };

    if (this.address.location !== 0) {

      if (this.address.location < 100) {
        this.address.location = this.address.location * 10000;
      } else if ( this.address.location < 10000) {
        this.address.location = this.address.location * 100;
      }

      this.address.aProvince = Math.floor(this.address.location / 10000);
      this.address.aCity = Math.floor(this.address.location / 100);
      this.address.aRegion = this.address.location;
    }

    this.getAddress();
    this.initMap();
  }

  // 获取地址列表
  getAddress() {
    this.addressService.getAddress()
      .subscribe( addr => {
        this.addrList = addr;
        console.log(this.addrList);
      });
  }

  // 地图
  initMap() {


  // 创建地图实例
    let map = new BMap.Map('container');

  // 创建点坐标
    console.log(this.address.lng, this.address.lat);
    let point = new BMap.Point(this.address.lng, this.address.lat);

    map.centerAndZoom(point, 15);

    if ( this.address.lng === 0 || this.address.lat === 0 ) {
      let that = this;
      // 获取当前定位
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          let mk = new BMap.Marker(r.point);
          that.address.lng = r.point.lng;
          that.address.lat = r.point.lat;
          map.addOverlay(mk);
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
          // alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
    }





    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放

    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('宁波'); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    // 添加定位控件
    let geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件
      let address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
      // alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);





  }

  save() {
    let addr = {
      uid: this.currentData.Uid,
      address: this.address.address,
      location_id: this.address.location,
      longitude: this.address.lng,
      latitude: this.address.lat
    };
    this.boilerService.updateAddress(addr)
      .subscribe();
  }


}
