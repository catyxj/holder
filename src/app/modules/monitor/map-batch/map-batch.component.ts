import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../shared/map.service";

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;

@Component({
  selector: 'app-map-batch',
  templateUrl: './map-batch.component.html',
  styleUrls: ['./map-batch.component.css']
})
export class MapBatchComponent implements OnInit {

  private map;
  public markers = [];
  public search;
  public page = 1;
  public pageSize = 10;
  public totalItems;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.initMap();
    this.addOverlay();
  }

  // 初始化地图
  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;

    let point = new BMap.Point(105.000, 38.000);
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 添加带有定位的导航控件
    let navigationControl = new BMap.NavigationControl();
    map.addControl(navigationControl);

    // 定位
    /*let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // console.log(r.point);
      } else {
        console.log('failed' + this.getStatus());
      }
    });*/

  }

  // 添加标注
  addMarker(point, icon, content) {
    let marker = new BMap.Marker(point, {icon: icon});
    this.map.addOverlay(marker);
    this.addClickHandler(content, marker);
  }

  // 获取数据-添加覆盖物
  addOverlay() {
    this.mapService.getMapBatch(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.markers = data.params;
        this.totalItems = data.counts;
        console.log(this.totalItems);
        // this.map.panTo(this.markers[0].longitude, this.markers[0].latitude);
        for (let i = 0; i < this.markers.length; i++) {
          let mark = this.markers[i];
          let icon = null;
          if (mark.termStatus === 0) {
            mark.online = '离线';
            mark.warn = '无告警';
            mark.isrunning = '未运行';
            icon = new BMap.Icon('assets/images/mapicon4.png', new BMap.Size(35, 35)); // 离线
          } else {
            mark.online = '在线';
            if (mark.eptStatus === 0) {
              mark.isrunning = '未运行';
              mark.warn = '无告警';
              icon = new BMap.Icon('assets/images/mapicon4.png', new BMap.Size(35, 35)); // 未运行
            } else {
              mark.isrunning = '运行';
              if (mark.alarmStatus) {
                mark.warn = '有告警';
                icon = new BMap.Icon('assets/images/mapicon1.png', new BMap.Size(35, 35)); // 有告警
              } else {
                mark.warn = '无告警';
                icon = new BMap.Icon('assets/images/mapicon2.png', new BMap.Size(35, 35)); // 正常
              }
            }
          }
          let content = `<h6 class="text-info"> ${mark.name} </h6>
                        <p>
                         <b>地址: </b> ${mark.address} <br/>
                         <b>终端状态：</b> ${mark.online} <br/>
                         <b>运行状态：</b> ${mark.isrunning} <br/>
                         <b>告警状态:</b> ${mark.warn}
                        </p>`;
          let point = new BMap.Point(mark.longitude, mark.latitude);
          this.addMarker(point, icon, content);
        }
      });


    /*this.markers = [
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
    this.totalItems = 100;*/

    // {"uid":"e9a7bd78-aad3-4950-b90c-da9561208622",
    //   "name":"ee",
    //   "longitude":0,
    //   "latitude":0,
    //   "address":"",
    //   "termStatus":1,
    //   "eptStatus":false,
    //   "alarmStatus":false}


  }



  // 添加信息窗口
  addClickHandler(content, marker) {
    marker.addEventListener('click', function(e) {
        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        let infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, point); // 开启信息窗口
    });
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
