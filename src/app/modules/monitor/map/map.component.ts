import { Component, OnInit } from '@angular/core';
import {ControlAnchor, MarkerOptions, NavigationControlType, Point} from 'angular2-baidu-map';
import {MapOptions} from 'angular2-baidu-map';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public opts: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions }>;

  constructor() { }

  ngOnInit() {


    // 配置地图, 参考百度地图api
    this.opts = {
      // 地图中心坐标
      centerAndZoom: {     // 设置中心点和缩放级别
        lng: 120.62,   // 经度
        lat: 31.32,    // 纬度
        zoom: 15           // 缩放级别
      },
      minZoom: 3,  // 最小缩放级别的地图
      maxZoom: 19, // 最大缩放级别的地图
      enableHighResolution: true,  // 是否用高分辨率的地图，default：true
      enableAutoResize: true,  // 是否可以自动调整大小，default：true
      enableMapClick: true,  // 地图是否可以点击，default：true
      disableDragging: false, // 是否禁用地图拖动功能
      enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
      disableDoubleClickZoom: false, // 是否禁用双击缩放功能
      enableKeyboard: true,  // 是否启用键盘移动地图功能
      enableInertialDragging: false,     // 是否启用惯性阻力函数
      enableContinuousZoom: true,  // 是否启用连续缩放功能
      disablePinchToZoom: false,   // 是否禁用缩放功能的缩放
      cursor: '',         // 设置默认的光标样式,应该遵循CSS规范
      draggingCursor: '', // 设置默认的拖动光标样式，应该遵循CSS规范
      currentCity: '苏州市',   // 设置当前的城市

    };

    // 这是地图标记marker
    this.markers = [
      {
        options: {
          icon: {
            imageUrl: '/assets/1.jpg',
            size: {
              height: 60,
              width: 50
            }
          },
          title: 'asdkjgaslfkjasd'
        },
        point: {
          lng: 120.62,   // 经度
          lat: 31.32,    // 纬度
        }
      },
      {
        point: {
          lng: 120.63,   // 经度
          lat: 31.32,    // 纬度
        }
      },
      {
        point: {
          lng: 120.63,   // 经度
          lat: 31.31,    // 纬度
        }
      }
    ];



  }




}
