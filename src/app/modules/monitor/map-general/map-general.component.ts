import { Component, OnInit } from '@angular/core';


declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;
declare var BMapLib: any;

@Component({
  selector: 'app-map-general',
  templateUrl: './map-general.component.html',
  styleUrls: ['./map-general.component.css']
})
export class MapGeneralComponent implements OnInit {

  private map;
  private markers = [];
  private markCluster = [];


  constructor() { }

  ngOnInit() {
    this.markers = [
      {
        lng: 121,
        lat: 29
      },
      {
        lng: 121,
        lat: 28
      },
      {
        lng: 119,
        lat: 32
      },
      {
        lng: 119,
        lat: 29
      },
      {
        lng: 121,
        lat: 32
      },
      {
        lng: 118,
        lat: 30
      },
      {
        lng: 118,
        lat: 31
      },
      {
        lng: 116,
        lat: 33
      },
      {
        lng: 116,
        lat: 31
      },
      {
        lng: 116,
        lat: 38
      },
      {
        lng: 116,
        lat: 39
      },
      {
        lng: 112,
        lat: 33
      },
      {
        lng: 113,
        lat: 31
      },
      {
        lng: 106.268,
        lat: 37.814
      },
      {
        lng: 106.353,
        lat: 36.29
      },
      {
        lng: 99.057,
        lat: 30.704
      },
      {
        lng: 99.066,
        lat: 39.855
      },
      {
        lng: 98.918,
        lat: 37.314
      },
      {
        lng: 99.191,
        lat: 32.206
      }
    ];
    this.initMap();
  }

  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

    let point = new BMap.Point(105.000, 38.000);
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 定位
    /*let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        console.log(r.point);
      } else {
        console.log('failed' + this.getStatus());
      }
    });*/

    // 添加带有定位的导航控件
    let navigationControl = new BMap.NavigationControl();
    map.addControl(navigationControl);


    // 点聚合
    for (let i = 0; i < this.markers.length; i++) {
      let pt = null;
      pt = new BMap.Point(this.markers[i].lng , this.markers[i].lat);
      this.markCluster.push(new BMap.Marker(pt));
    }
    let markerClusterer = new BMapLib.MarkerClusterer(map, {markers: this.markCluster});

  }

}
