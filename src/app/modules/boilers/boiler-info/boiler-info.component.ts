import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {BoilerService} from '../../../shared/boiler.service';
import {NgbAccordionConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ControlAnchor,
  GeolocationControlOptions,
  MapOptions, MapTypeControlOptions, MapTypeControlType, MarkerOptions, NavigationControlOptions, NavigationControlType,
  OverviewMapControlOptions,
  Point, ScaleControlOptions
} from 'angular2-baidu-map';
import {EditBoilerComponent} from '../edit-boiler/edit-boiler.component';
import {OrganizationService} from '../../../shared/organization.service';
import {EditAddressComponent} from '../edit-address/edit-address.component';
import {EditMaintainComponent} from '../edit-maintain/edit-maintain.component';
import {AdressService} from '../../../shared/adress.service';
import {TerBindComponent} from "../ter-bind/ter-bind.component";


@Component({
  selector: 'app-boiler-info',
  templateUrl: './boiler-info.component.html',
  styleUrls: ['./boiler-info.component.css']
})
export class BoilerInfoComponent implements OnInit {

  public panel = [];
  public info;
  public lists;
  public user;
  public orgTypes;
  public addrList;
  public opts: MapOptions; // 百度地图参数
  public markers: Array<{ point: Point; options?: MarkerOptions }>;
  public controlOpts: NavigationControlOptions;
  public overviewmapOpts: OverviewMapControlOptions;
  public scaleOpts: ScaleControlOptions;
  public mapTypeOpts: MapTypeControlOptions;
  public geolocationOpts: GeolocationControlOptions;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private boilerService: BoilerService,
              private modalService: NgbModal,
              private orgService: OrganizationService,
              public addressService: AdressService) {

  }

  ngOnInit() {
    this.panel = [{open: true}, {open: true}, {open: true}, {open: true}];
    this.getOrgType();
    this.getInfo();

    this.lists = [
      {title: 'dddd', value: 'dafdaf'},
      {title: '2222', value: 'dasgewdaf'},
      {title: 'rffg', value: 'vsxc'},
    ];
    this.initMap();
    this.getAddress();
  }


  // 获取设备信息
  getInfo() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.boilerService.getBoiler(params.get('uid'));
      })
    ).subscribe( boiler => {
      this.info = boiler;
      if (this.info.OrganizationsLinked) {
        for (let i = 0; i < this.info.OrganizationsLinked.length; i++) {
          let or = this.info.OrganizationsLinked[i];
          for (let j = 0; j < this.orgTypes.length; j++) {
            if (or.Type.TypeId === this.orgTypes[j].TypeId) {
              or.type = this.orgTypes[j].Name;
            }
          }
        }
      }
      this.info.InspectInnerDateNext = new Date(this.info.InspectInnerDateNext);
      this.info.InspectValveDateNext = new Date(this.info.InspectInnerDateNext);
      this.info.InspectOuterDateNext = new Date(this.info.InspectInnerDateNext);
      this.info.InspectGaugeDateNext = new Date(this.info.InspectInnerDateNext);
      console.log(this.info);
    });
  }

// 获取地址列表
  getAddress() {
    this.addressService.getAddress()
      .subscribe( addr => {
        this.addrList = addr;
      });
  }

  //  获取企业类型列表
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {
        this.orgTypes = types;
      });
  }

// 百度地图
  initMap() {
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
      currentCity: '宁波市',   // 设置当前的城市

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
          lat: 31.33,    // 纬度
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

    // 这是控件control
    this.controlOpts = {         // 导航控件
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,      // 显示的控件的位置
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,   // 用来描述它是什么样的导航
      offset: {                                        // 控件的大小
        width: 30,
        height: 30
      },
      showZoomInfo: true,                             // 是否展示当前的信息
      enableGeolocation: true                         // 是否启用地理定位功能
    };
    this.overviewmapOpts = {    // 地图全景控件
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,  // 显示的控件的位置
      isOpen: true                                    // whf 。。官网里没有说明？？
    };
    this.scaleOpts = {          // 比例尺控件
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    };
    this.mapTypeOpts = {        // 地图类型
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
    };
    // Geolocation 和Panorama 没有属性




  }



  // 编辑锅炉信息模态框
  editBoiler() {
    const modalRef = this.modalService.open(EditBoilerComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = this.info;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 终端绑定模态框
  terBind(event) {
    event.stopPropagation();
    const modalRef = this.modalService.open(TerBindComponent);
    modalRef.componentInstance.currentData = this.info;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 编辑地址信息模态框
  editAddress() {
    const modalRef = this.modalService.open(EditAddressComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = this.info;
    modalRef.componentInstance.locations = this.addrList;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 编辑维护信息模态框
  editMaintain() {
    const modalRef = this.modalService.open(EditMaintainComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = this.info;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 终端解绑
  unBind(ter) {
    let data = {
      equipment_id: this.info.Uid,
      terminal_code: ter.TerminalCode
    };
    let cf = confirm('确定删除终端');
    if (cf === true) {
      this.boilerService.unBind(data)
        .subscribe( val => {
          alert('解绑成功');
          this.getInfo();
        }, err => {
          alert('解绑失败');
        });
    }

  }

  // 删除
  delete() {

    let cf = confirm('确认删除当前设备？');
    if (cf === true) {
      this.boilerService.deleteBoiler([this.info.Uid])
        .subscribe();
      this.router.navigate(['/admin/equipments']);
    }

  }


  goBack() {
    window.history.go(-1);
  }

}
