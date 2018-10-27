import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../shared/map.service";


declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;
declare var BMapLib: any;

@Component({
  selector: 'app-map-general',
  templateUrl: './map-general.component.html',
  styleUrls: ['./map-general.component.css']
})
export class MapGeneralComponent implements OnInit, OnDestroy {

  private map;
  private markers = [];
  private markCluster = [];
  public statusData;
  private status;


  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.getStatus();
    this.status = setInterval(() => {this.getStatus(); }, 60000);
    this.initMap();
    this.getLocation();

    /*this.markers = [
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
    this.initMap();*/
  }

  // 获取地图信息
  getLocation() {
    this.mapService.getMapAll()
      .subscribe( data => {
        this.markers = data;
        this.mapCluster();
      });
  }

  // 获取状态信息
  getStatus() {
    this.mapService.getMapCount()
      .subscribe( data => {
      this.statusData = data;
    });

  }

  // 初始化地图
  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

    let point = new BMap.Point(105.000, 38.000);
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    // 添加控件
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
    let navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      // anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      // LARGE类型
      // type: BMAP_NAVIGATION_CONTROL_ZOOM,
      // 启用显示定位
      enableGeolocation: true,
      offset: {
        width: 50,
        height: 100
      }
    });
    map.addControl(navigationControl);

  }

  // 地图点集合
  mapCluster() {
    // 点聚合
    if (!this.markers) {
      return;
    }
    for (let i = 0; i < this.markers.length; i++) {
      let pt = null;
      if (this.markers[i].longitude === 0 || this.markers[i].latitude === 0){
        continue;
      }
      pt = new BMap.Point(this.markers[i].longitude, this.markers[i].latitude);
      this.markCluster.push(new BMap.Marker(pt));
    }
    let markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: this.markCluster});
  }

  ngOnDestroy() {
    clearInterval(this.status);
  }


}
