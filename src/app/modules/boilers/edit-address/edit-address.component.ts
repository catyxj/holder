import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
  locations: any;


  public address: any;
  public cities: any[];
  public regions: any[];
  private map:any;

  constructor(public activeModal: NgbActiveModal,
              public boilerService: BoilerService) { }


  ngOnInit() {
    // console.log(this.currentData, this.locations);

    this.initAddress();
    this.initMap();
  }



  // 地址

  initAddress() {
    this.address = {
      lng: this.currentData.Address ? this.currentData.Address.Longitude : 0, // 经度
      lat: this.currentData.Address ? this.currentData.Address.Latitude : 0, // 纬度
      location: this.currentData.Address ? this.currentData.Address.Location.LocationId : 0, //  位置id
      address: this.currentData.Address ? this.currentData.Address.Address : ''  // 具体地址
    };

    if (this.address.location !== 0) {
      if (this.address.location < 100) {
        this.address.location = this.address.location * 10000;
      } else if ( this.address.location < 10000) {
        this.address.location = this.address.location * 100;
      }
    }
    this.address.aProvince = this.address.location ? Math.floor(this.address.location / 10000) : 0;
    this.address.aCity = this.address.location ? Math.floor(this.address.location / 100) : 0;
    this.address.aRegion = this.address.location ? this.address.location : 0;
    if (this.address.aProvince) {
      this.initProvince();
    }
    if (this.address.aCity) {
      this.changeCities();
    }
    if (this.address.aRegion) {
      this.changeRegion();
    }
  }

  initProvince() {
    for (let i = 0; i < this.locations.length; i++) {
      if ( parseInt(this.address.aProvince) === 0) {
        this.cities = [];
        this.regions = [];
        return;
      }
      if ( parseInt(this.address.aProvince) === this.locations[i].LocationId ) {
        this.cities = this.locations[i].cities;
      }
    }
    this.address.location = parseInt(this.address.aProvince);
  }

  changeProvince() {
    for (let i = 0; i < this.locations.length; i++) {
      if ( parseInt(this.address.aProvince) === 0) {
        this.cities = [];
        this.regions = [];
        break;
      }
      if ( parseInt(this.address.aProvince) === this.locations[i].LocationId ) {
        this.cities = this.locations[i].cities;
        this.address.locationName = this.locations[i].LocationName;
      }
    }
    this.address.aCity = 0;
    this.address.aRegion = 0;
    this.address.location = parseInt(this.address.aProvince);
  }
  changeCities() {
    for (let i = 0; i < this.cities.length; i++) {
      if ( parseInt(this.address.aCity) === this.cities[i].LocationId ) {
        this.regions = this.cities[i].regions;
        this.address.locationName = this.cities[i].LocationName;
      }
    }
    this.address.location = parseInt(this.address.aCity);
    // console.log(this.address);
  }

  changeRegion() {
    for (let i = 0; i < this.regions.length; i++) {
      if ( parseInt(this.address.aRegion) === this.regions[i].LocationId ) {
        this.address.locationName = this.regions[i].LocationName;
      }
    }
    this.address.location = parseInt(this.address.aRegion);
    // console.log(this.address);
  }


  // 地图
  initMap() {


  // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

  // 创建点坐标

    let point = new BMap.Point(this.address.lng, this.address.lat);

    map.centerAndZoom(point, 15);

    if ( this.address.lng === 0 || this.address.lat === 0 ) {
      let that = this;
      // 获取当前定位
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          let mk = new BMap.Marker(r.point);
          // that.address.lng = r.point.lng;
          // that.address.lat = r.point.lat;
          map.addOverlay(mk);
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
          // alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
    }


    console.log(this.address.lng, this.address.lat);


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

  // 城市切换
  changeCity() {
    this.map.centerAndZoom(this.address.locationName, 11);
  }

  // 地图坐标
  changeMap() {
    // 创建地址解析器实例
    let that = this;
    let myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(that.address.address, function(point) {
      if (point) {
        that.address.lng = point.lng;
        that.address.lat = point.lat;
        that.map.centerAndZoom(point, 16);
        that.map.addOverlay(new BMap.Marker(point));
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, this.address.location);
    // console.log(this.address);
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
      .subscribe(val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });
  }


}