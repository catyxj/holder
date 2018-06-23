import { Component, OnInit } from '@angular/core';
import {ControlAnchor, MarkerOptions, NavigationControlType, Point} from 'angular2-baidu-map';
import {MapOptions} from 'angular2-baidu-map';

declare var AMap: any;
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

    // 百度地图
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




    // 高德地图
    const map = new AMap.Map('container');
    map.plugin('AMap.Geolocation', () => {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
    });



    const infoWindow = new AMap.InfoWindow({ // 创建信息窗体
      isCustom: true,  // 使用自定义窗体
      content: ' <div> 信息窗体 </div> ', // 信息窗体的内容可以是任意html片段
      offset: new AMap.Pixel(16, -45)
    });
    const onMarkerClick  =  function(e) {
      infoWindow.open(map, e.target.getPosition()); // 打开信息窗体
      // e.target就是被点击的Marker
    }
    const marker = new AMap.Marker({
      position: [116.481181, 39.989792]
    })
    map.add(marker);
    marker.on('click', onMarkerClick); // 绑定click事件



  }




}
