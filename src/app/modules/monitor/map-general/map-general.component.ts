import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../shared/map.service';
import {Router} from '@angular/router';


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
  private markList = []; // 坐标
  private markers = []; // 显示的坐标
  private markCluster = [];
  public statusData;
  private status;
  public search;
  private markerClusterer;


  constructor(private mapService: MapService,
              private router: Router) { }

  ngOnInit() {

    // this.status = setInterval(() => { this.getStatus(); }, 60000);
    this.initMap();
    this.getStatus();
    // this.getLocation();

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
    this.markers = [];
    this.mapService.getMapCount()
      .subscribe( data => {
      this.statusData = data.count;
      this.markers = data.locInfo;
      for (let n = 0; n < this.markers.length; n++) {
        this.markList.push(this.markers[n]);
      }
      /*if (this.search) {
        this.markers = this.markers.filter(mark => mark.name === this.search);
      }*/

      this.mapCluster();
    });

  }

  // 初始化地图
  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

    let point = new BMap.Point(105.000, 38.000);
    map.centerAndZoom(point, 6);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    // 添加控件
    map.addControl(new BMap.OverviewMapControl());
    // map.addControl(new BMap.MapTypeControl());

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
      // offset: {
      //   width: 50,
      //   height: 100
      // }
    });
    map.addControl(navigationControl);

  }

  // 地图点集合
  mapCluster() {
    // 点聚合
    this.markCluster = [];
    if (!this.markers) {
      return;
    }

    for (let i = 0; i < this.markers.length; i++) {
      let pt = null;
      let mark = this.markers[i];
      let icon = null;
      if (mark.longitude === 0 || mark.latitude === 0) {
        continue;
      }

      switch (mark.status) {
        case 99:
          mark.text = '终端不在线';
          icon = new BMap.Icon('assets/icons/mapicon_gr.png', new BMap.Size(35, 35)); // 离线
          break;
        case 4:
          mark.text = '设备故障';
          icon = new BMap.Icon('assets/icons/mapicon_y.png', new BMap.Size(35, 35)); // 有故障
          break;
        case 3:
          mark.text = '设备告警';
          icon = new BMap.Icon('assets/icons/mapicon_o.png', new BMap.Size(35, 35)); // 有告警
          break;
        case 1:
          mark.text = '设备运行';
          icon = new BMap.Icon('assets/icons/mapicon_g.png', new BMap.Size(35, 35)); // 正常
          break;
        case 2:
          mark.text = '设备未运行';
          icon = new BMap.Icon('assets/icons/mapicon_r.png', new BMap.Size(35, 35)); // 未运行
          break;
      }

      let content = `<h6 class="text-info" style="font-size: 24px;"> ${mark.name} </h6>`;

      pt = new BMap.Point(mark.longitude, mark.latitude);
      let marker = new BMap.Marker(pt, {icon: icon});
      marker.setTitle(mark.name);
      this.addClickHandler(content, marker, mark);
      this.markCluster.push(marker);
    }
    this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: this.markCluster});
  }


  // 添加信息窗口
  addClickHandler(content, marker, mark) {
    let that = this;
    /*marker.addEventListener('mouseover', function(e) {
      let p = e.target;
      let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      let infoWindow = new BMap.InfoWindow(content, {
        width  : 0,             // 宽度
        height : 0,              // 高度
      });  // 创建信息窗口对象
      that.map.openInfoWindow(infoWindow, point); // 开启信息窗口
    });
    marker.addEventListener('mouseout', function(e) {
      that.map.closeInfoWindow(); // 关闭信息窗口
    });*/
    marker.addEventListener('click', function(e) {
      // console.log(mark);
      that.router.navigate(['/admin/runtime', mark.uid, mark.name]);
    });
  }

  // 搜索
  searchChange() {
    if (!this.search) {
      this.markers = this.markList;
    } else {
      this.markers = this.markList.filter(data => data.name.indexOf(this.search) !== -1 );
    }
    this.map.clearOverlays();
    this.markerClusterer.clearMarkers();
    this.mapCluster();
    // this.getStatus();
    /*for (let i = 0; i < this.markers.length; i++) {
      let mk = this.markers[i];
      if (this.search === mk.name ) {
        this.map.panTo(new BMap.Point(mk.longitude, mk.latitude));
      }
    }*/

  }

  ngOnDestroy() {
    // clearInterval(this.status);
  }


}
