import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RuntimeService} from '../../../../../shared/runtime.service';
import {BoilerService} from '../../../../../shared/boiler.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;
declare var BMapLib: any;

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.css']
})
export class MapDashboardComponent implements OnInit, OnDestroy {
  public search = 'name';
  public value = '';

  private map;
  private markList = []; // 坐标
  private markers = []; // 显示的坐标
  private markCluster = [];
  public statusData;
  private status;
  private markerClusterer;

  constructor(private eptService: BoilerService,
              private router: Router) { }

  ngOnInit() {
    this.initMap();
    this.getStatus();

    this.getLocation();
  }

  // 获取地图信息
  getLocation() {
    /*this.markers = [
      {
        longitude: 121,
        latitude: 29,
        status: 1,
        name: '11111',
        terminal_code: '123456'
      },
      {
        longitude: 121,
        latitude: 28,
        status: 2,
        name: '22222',
        terminal_code: '11111'
      },
      {
        longitude: 119,
        latitude: 32,
        status: 3,
        name: '111112',
        terminal_code: '11111'
      },
      {
        longitude: 119,
        latitude: 29,
        status: 4,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 121,
        latitude: 32,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 118,
        latitude: 30,
        status: 99,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 118,
        latitude: 31,
        status: 1,
        name: '11112',
        terminal_code: '11111'
      },
      {
        longitude: 116,
        latitude: 33,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 116,
        latitude: 31,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 116,
        latitude: 38,
        status: 1,
        name: '122222',
        terminal_code: '11111'
      },
      {
        longitude: 116,
        latitude: 39,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 112,
        lat: 33,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 113,
        latitude: 31,
        status: 2,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 106.268,
        latitude: 37.814,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 106.353,
        latitude: 36.29,
        status: 3,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 99.057,
        latitude: 30.704,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 99.066,
        latitude: 39.855,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 98.918,
        latitude: 37.314,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      },
      {
        longitude: 99.191,
        latitude: 32.206,
        status: 1,
        name: '11111',
        terminal_code: '11111'
      }
    ];
    this.markList = this.markers.slice();
    this.mapCluster();*/

    this.eptService.getMapDetail()
      .subscribe( data => {
        this.markers = data;
        for (let n = 0; n < this.markers.length; n++) {
          this.markList.push(this.markers[n]);
        }

        this.mapCluster();
      });
  }

  // 获取状态信息
  getStatus() {
    this.markers = [];
    this.eptService.getMonitor()
      .subscribe( data => {
        this.statusData = data;
        // this.markers = data.locInfo;
        // for (let n = 0; n < this.markers.length; n++) {
        //   this.markList.push(this.markers[n]);
        // }
        /*if (this.value) {
          this.markers = this.markers.filter(mark => mark.name === this.value);
        }*/

        // this.mapCluster();
      });

  }

  // 初始化地图
  initMap() {
    // 创建地图实例
    const map = new BMap.Map('container');
    this.map = map;

    const point = new BMap.Point(105.000, 38.000);
    map.centerAndZoom(point, 6);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放


    map.setMapStyleV2({    // 地图样式
      styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
    });


    /*const province = ['天津市', '上海', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'];
    const bdary = new BMap.Boundary();
    bdary.get('北京市', function (rs) {       // 获取行政区域
      // map.clearOverlays();        // 清除地图覆盖物

      // 网上查了下，东西经南北纬的范围
      const EN_JW = '180, 90;';         // 东北角
      const NW_JW = '-180,  90;';       // 西北角
      const WS_JW = '-180, -90;';       // 西南角
      const SE_JW = '180, -90;';        // 东南角
      // 4.添加环形遮罩层
      const ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, { strokeColor: 'none', fillColor: '#505050', fillOpacity: 1, strokeOpacity: 0.5 }); // 建立多边形覆盖物

      map.addOverlay(ply1);
      // 5. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
      const ply = new BMap.Polygon(rs.boundaries[0], { strokeWeight: 1, strokeColor: '#818181', fillColor: '' });
      map.addOverlay(ply);
      // map.setViewport(ply.getPath());    // 调整视野
    });
    for (let i = 0; i < province.length; i++) {
      bdary.get(province[i], function (rs) {       // 获取行政区域
        const ply = new BMap.Polygon(rs.boundaries[0], { strokeWeight: 1, strokeColor: '#818181', fillColor: '#818181' });
        map.addOverlay(ply);
      });
    }*/
    /*bdary.get('新疆', function (rs) {       // 获取行政区域
      const ply = new BMap.Polygon(rs.boundaries[0], { strokeWeight: 1, strokeColor: '#818181', fillColor: '#818181' });
      map.addOverlay(ply);
    });
    bdary.get('西藏', function (rs) {       // 获取行政区域
      const ply = new BMap.Polygon(rs.boundaries[0], { strokeWeight: 1, strokeColor: '#818181', fillColor: '#818181' });
      map.addOverlay(ply);
    });*/



    // 添加控件
    // map.addControl(new BMap.OverviewMapControl());
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
      const mark = this.markers[i];
      let icon = null;
      if (mark.longitude === 0 || mark.latitude === 0) {
        continue;
      }

      if (!mark.online) {
        mark.text = '设备离线';
        icon = new BMap.Icon('assets/icons/map/mapicon_gr.png', new BMap.Size(35, 35)); // 离线
      } else if (mark.malfunction) {
        mark.text = '设备故障';
        icon = new BMap.Icon('assets/icons/map/mapicon_o.png', new BMap.Size(35, 35)); // 有故障
      } else if (mark.alarm_count > 0) {
        mark.text = '设备告警';
        icon = new BMap.Icon('assets/icons/map/mapicon_r.png', new BMap.Size(35, 35)); // 有告警
      } else if (mark.run) {
        mark.text = '设备运行';
        icon = new BMap.Icon('assets/icons/map/mapicon_g.png', new BMap.Size(35, 35)); // 正常
      } else {
        mark.text = '设备未运行';
        icon = new BMap.Icon('assets/icons/map/mapicon_gr.png', new BMap.Size(35, 35)); // 未运行
      }
      // console.log(mark);
      /*switch (mark.status) {
        case 99:
          mark.text = '终端不在线';
          icon = new BMap.Icon('assets/icons/map/mapicon_gr.png', new BMap.Size(35, 35)); // 离线
          break;
        case 4:
          mark.text = '设备故障';
          icon = new BMap.Icon('assets/icons/map/mapicon_o.png', new BMap.Size(35, 35)); // 有故障
          break;
        case 3:
          mark.text = '设备告警';
          icon = new BMap.Icon('assets/icons/map/mapicon_r.png', new BMap.Size(35, 35)); // 有告警
          break;
        case 1:
          mark.text = '设备运行';
          icon = new BMap.Icon('assets/icons/map/mapicon_g.png', new BMap.Size(35, 35)); // 正常
          break;
        case 2:
          mark.text = '设备未运行';
          icon = new BMap.Icon('assets/icons/map/mapicon_gr.png', new BMap.Size(35, 35)); // 未运行
          break;
      }*/

      const content = `<h6 class="text-info" style="font-size: 24px;"> ${mark.name} </h6>`;

      pt = new BMap.Point(mark.longitude, mark.latitude);
      const marker = new BMap.Marker(pt, {icon: icon});
      marker.setTitle(mark.name);
      this.addClickHandler(content, marker, mark);
      this.markCluster.push(marker);
    }
    this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: this.markCluster});
  }


  // 添加信息窗口
  addClickHandler(content, marker, mark) {
    const that = this;
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
      that.router.navigate(['/admin/ordinary/runtime', mark.uid]);
    });
  }

  // 搜索
  searchChange() {
    console.log(this.value, this.search);
    if (!this.value) {
      this.markers = this.markList.slice();
    } else {
      this.markers = this.markList.filter(data => data[this.search].indexOf(this.value) !== -1 );
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

  // 重置
  resetData() {
    this.search = 'name';
    this.value = '';
    const point = new BMap.Point(105.000, 38.000);
    this.map.centerAndZoom(point, 6);
    this.markers = this.markList.slice();
    this.map.clearOverlays();
    this.markerClusterer.clearMarkers();
    this.mapCluster();
  }

  ngOnDestroy() {
    // clearInterval(this.status);
  }

}
