import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../../../shared/boiler.service";
import {AdressService} from "../../../../../shared/adress.service";

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;

@Component({
  selector: 'app-equip-info-or',
  templateUrl: './equip-info-or.component.html',
  styleUrls: ['./equip-info-or.component.css']
})
export class EquipInfoOrComponent implements OnInit {
  public uid;
  public address;
  private map;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private eptService: BoilerService,
              private addrService: AdressService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.address = {
      Longitude: 0,
      Latitude: 0
    };
    this.initMap();
  }



  // 百度地图
  initMap() {
    // 创建地图实例
    const map = new BMap.Map('container');
    this.map = map;

    let point0 = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point0, 10);


    map.setMapStyleV2({
      styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
    });

    if (!this.address || this.address.Longitude === 0 || this.address.Latitude === 0 ) {
      const that = this;
      // 获取当前定位
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          let mk = new BMap.Marker(r.point);
          that.address.lng = r.point.lng;
          that.address.lat = r.point.lat;
          map.addOverlay(mk);
          map.panTo(r.point);

        } else {
          // alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
    } else {
      // 创建点坐标
      const point = new BMap.Point(this.address.Longitude, this.address.Latitude);

      map.panTo(point);
    }

    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放











    // map.addControl(new BMap.NavigationControl());
    // map.addControl(new BMap.ScaleControl());
    // map.addControl(new BMap.OverviewMapControl());
    // map.addControl(new BMap.MapTypeControl());

    // 添加定位控件
    /*const geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener('locationSuccess', function(e) {
      // 定位成功事件
      // let address = '';
      // address += e.addressComponent.province;
      // address += e.addressComponent.city;
      // address += e.addressComponent.district;
      // address += e.addressComponent.street;
      // address += e.addressComponent.streetNumber;
      // alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener('locationError', function(e) {
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);*/



  }



  goBack() {
    window.history.go(-1);
  }

}
