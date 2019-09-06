import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdressService} from "../../../../../../shared/adress.service";

import Swal from 'sweetalert2';
import {BoilerService} from "../../../../../../shared/boiler.service";

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;
declare var BMap_Symbol_SHAPE_CIRCLE: any;


@Component({
  selector: 'app-eq-address-edit',
  templateUrl: './eq-address-edit.component.html',
  styleUrls: ['./eq-address-edit.component.css']
})
export class EqAddressEditComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName = '';
  public address;
  public lng;
  public lat;
  public addrList;
  public cities = [];
  public regions = [];
  private map: any;
  private marker;

  constructor(public activeModal: NgbActiveModal,
              private addressService: AdressService,
              private eptService: BoilerService) { }

  ngOnInit() {
    this.address = this.currentData.address;
    this.getAddress();
    this.initMap();
  }

  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
        this.initLocation();
      });
  }

  initLocation() {
    let location = this.currentData ? this.currentData.location : 0;
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

  // 地图
  initMap() {
    let that = this;
    // 创建地图实例
    let map = new BMap.Map('address');
    this.map = map;


    // 创建点坐标

    if ( !this.currentData || (this.currentData.longitude === 0 || this.currentData.latitude === 0)) {
      // 获取当前定位
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          console.log('BMAP_STATUS_SUCCESS');
          let mk = new BMap.Marker(r.point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
            scale: 5,
            strokeWeight: 2.5,
            strokeColor: '#ffffff',
            rotation: 0, // 顺时针旋转30度
            fillColor: '#369BFF',
            fillOpacity: 1
          })
          });
          that.marker = mk;
          that.lng = r.point.lng;
          that.lat = r.point.lat;

          // map.panTo(r.point);
          map.centerAndZoom(r.point, 6);
          map.addOverlay(mk);
          mk.enableDragging();           // 可拖拽
          map.setMapStyleV2({
            styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
          });
        } else {
          let point0 = new BMap.Point(105.000, 38.000);
          let mk = new BMap.Marker(point0, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
            scale: 5,
            strokeWeight: 2.5,
            strokeColor: '#ffffff',
            rotation: 0, // 顺时针旋转30度
            fillColor: '#369BFF',
            fillOpacity: 1
          })
          });
          that.marker = mk;
          map.addOverlay(mk);
          map.centerAndZoom(point0, 6);
          map.setMapStyleV2({
            styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
          });
          mk.enableDragging();           // 可拖拽
        }
      }, {enableHighAccuracy: true});
    } else {
      const point = new BMap.Point(this.currentData.longitude, this.currentData.latitude);
      const mk = new BMap.Marker(point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
          scale: 5,
          strokeWeight: 2.5,
          strokeColor: '#ffffff',
          rotation: 0, // 顺时针旋转30度
          fillColor: '#369BFF',
          fillOpacity: 1
        })
      });
      that.marker = mk;
      map.addOverlay(mk);
      map.centerAndZoom(point, 10);
      map.setMapStyleV2({
        styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
      });

      mk.enableDragging();           // 可拖拽
    }


    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    /*map.setMapStyleV2({
      styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
    });*/

    /*map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    // 添加定位控件
    let geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener('locationSuccess', function(e) {
      // 定位成功事件
      that.address.lng = e.point.lng;
      that.address.lat = e.point.lat;
    });
    geolocationControl.addEventListener('locationError', function(e) {
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);*/


  }

  // 城市切换
  changeCity(zoom) {

    /*this.map.centerAndZoom(this.locationName);
    let point = this.map.getCenter();

    console.log(point);
    this.marker.setPosition(point);*/

    /*let marker = new BMap.Marker(point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
      scale: 5,
      strokeWeight: 2.5,
      strokeColor: '#ffffff',
      rotation: 0, // 顺时针旋转30度
      fillColor: '#369BFF',
      fillOpacity: 1
    })
    });
    this.map.addOverlay(marker);
    marker.enableDragging();           // 可拖拽*/


    this.changeMap(this.locationName, zoom);
  }

  // 地图坐标
  changeMap(address, zoom) {
    // 创建地址解析器实例
    let that = this;
    let myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function(point) {
      if (point) {
        that.lng = point.lng;
        that.lat = point.lat;
        that.marker.setPosition(point);
        that.map.centerAndZoom(point, zoom);
      } else {
        alert('您选择地址没有解析到结果!');
      }
    }, this.locationName);
    // console.log(this.address);
  }


  save() {
    let point = this.marker.getPosition();
    console.log(point, this.locationId, this.locationName, this.address);

    let addr = {
      uid: this.uid,
      address: this.address,
      location: this.locationId,
      location_name: this.locationName + this.address,
      longitude: this.lng,
      latitude: this.lat
    };
    this.eptService.updateAddress(addr)
      .subscribe(val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }





}
