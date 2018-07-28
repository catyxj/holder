import { Component, OnInit } from '@angular/core';

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;

@Component({
  selector: 'app-map-batch',
  templateUrl: './map-batch.component.html',
  styleUrls: ['./map-batch.component.css']
})
export class MapBatchComponent implements OnInit {

  private map;
  private markers = [];
  public search;
  public page = 1;
  public pageSize = 10;
  public totalItems;

  constructor() { }

  ngOnInit() {
    this.initMap();
    this.addOverlay();
  }

  // 初始化地图
  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

    let point = new BMap.Point(121.000, 29.000);
    map.centerAndZoom(point, 10);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 添加带有定位的导航控件
    let navigationControl = new BMap.NavigationControl();
    map.addControl(navigationControl);

    // 定位
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // console.log(r.point);
      } else {
        console.log('failed' + this.getStatus());
      }
    });

  }

  // 添加标注
  addMarker(point) {
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
  }

  // 获取数据-添加覆盖物
  addOverlay() {
    this.markers = [
      {
        lng: 121,
        lat: 29,
        name: '122'
      },
      {
        lng: 121,
        lat: 28,
        name: 'daf'
      },
      {
        lng: 119,
        lat: 32,
        name: '11fer'
      },
      {
        lng: 119,
        lat: 29,
        name: 'dd2'
      },
      {
        lng: 121,
        lat: 32,
        name: '1adf'
      },
      {
        lng: 118,
        lat: 30,
        name: '1adf'
      },
      {
        lng: 118,
        lat: 31,
        name: '1adf'
      },
      {
        lng: 116,
        lat: 33,
        name: '1adf'
      },
      {
        lng: 116,
        lat: 31,
        name: '1adf'
      },
      {
        lng: 116,
        lat: 38,
        name: '1adf'
      }
    ];
    this.totalItems = 100;
    for (let i = 0; i < this.markers.length; i++) {
      let mark = this.markers[i];
      let point = new BMap.Point(mark.lng, mark.lat);
      this.addMarker(point);
    }
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.addOverlay();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


}
