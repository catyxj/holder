import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;

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
  private map: any;
  private address: any;


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

      this.address = this.info.Address;
      this.initMap();
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
        this.getInfo();
      });
  }

// 百度地图
  initMap() {
    // 创建地图实例
    let map = new BMap.Map('container');
    this.map = map;


    if (!this.address || this.address.Longitude === 0 || this.address.Latitude === 0 ) {
      let that = this;
      // 获取当前定位
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          // let mk = new BMap.Marker(r.point);
          // that.address.lng = r.point.lng;
          // that.address.lat = r.point.lat;
          // map.addOverlay(mk);
          map.centerAndZoom(r.point, 10);
        } else {
          // alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
    } else {
      // 创建点坐标
      let point = new BMap.Point(this.address.Longitude, this.address.Latitude);

      map.centerAndZoom(point, 10);
    }




    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放

    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('宁波'); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

    // 添加定位控件
    let geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件
      let address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
      // alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);


  }



  // 编辑锅炉信息模态框
  editBoiler() {
    const modalRef = this.modalService.open(EditBoilerComponent, { size: 'lg', backdropClass: 'modal_backdrop', windowClass: 'dark_modal' });
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
      terminal_code: ter.TerminalCode.toString()
    };
    let cf = confirm('确定删除终端');
    if (cf === true) {
      this.boilerService.unBind(data)
        .subscribe( val => {
          alert('解绑成功');
          this.getInfo();
        }, err => {
          alert(err);
        });
    }

  }

  // 删除
  delete() {
    let cf = confirm('确认删除当前设备？');
    if (cf === true) {
      this.boilerService.deleteBoiler([this.info.Uid])
        .subscribe(() => {
          this.router.navigate(['/admin/equipments']);
        }, err => {alert(err); });

    }

  }


  goBack() {
    window.history.go(-1);
  }

}
