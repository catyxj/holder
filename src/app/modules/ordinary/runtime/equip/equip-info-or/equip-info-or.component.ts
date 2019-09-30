import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from '../../../../../shared/boiler.service';
import {AdressService} from '../../../../../shared/adress.service';
import {EqBasicEditComponent} from '../modals/eq-basic-edit/eq-basic-edit.component';
import {EqAddressEditComponent} from '../modals/eq-address-edit/eq-address-edit.component';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

import Swal from 'sweetalert2';
import {add} from "ngx-bootstrap/chronos";

declare var BMap: any;
declare var BMAP_STATUS_SUCCESS: any;
declare var BMap_Symbol_SHAPE_CIRCLE: any;

@Component({
  selector: 'app-equip-info-or',
  templateUrl: './equip-info-or.component.html',
  styleUrls: ['./equip-info-or.component.css']
})
export class EquipInfoOrComponent implements OnInit {
  public uid;
  public address;
  private map;
  public info;
  public terminal;
  public province = '';
  public city = '';
  public region = '';
  public orgList = [];
  public infoList = [];
  public roleId;


  tplModal: NzModalRef;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private eptService: BoilerService,
              private addrService: AdressService,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getInfo();

  }


  // 获取设备信息
  getInfo() {
    this.eptService.getInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.orgList = this.info.org_link ? this.info.org_link : [];
        this.infoList = this.info.info ? this.info.info : [];
        this.initLocation();
        this.initMap();
      }, err => {

      });

    // 关联终端信息
    this.eptService.getTermInfo(this.uid)
      .subscribe(data => {
        this.terminal = data;
      }, err => {

      });

    /*this.info = {
      name: '123351',
      location: 330101,
      longitude: 121.55740307253974,
      latitude: 29.86572070836559
    }*/

    this.initMap();
  }

  initLocation() {
    let loc = this.info.location;
    this.province = '';
    this.city = '';
    this.region = '';
    if (loc === 0) {
      this.province = '全国';
      return;
    }

    this.addrService.getAddress()
      .subscribe(data => {
        let addrList = data;
        loc = loc.toString();
        let prov = loc.slice(0, 2);
        for (let i = 0; i < addrList.length; i++) {
          let ad = addrList[i];
          if (parseInt(prov) === ad.LocationId) {
            this.province = ad.Name;
            let cities = ad.cities;
            let city = loc.slice(0, 4);
            console.log(city);
            if (city.length >= 4) {
              for (let j = 0; j < cities.length; j++) {
                let ct = cities[j];
                if (parseInt(city) === ct.LocationId) {
                  this.city = ct.Name;
                  let regions = ct.regions;
                  let region = loc;
                  if (region.length >= 6) {
                    for (let n = 0; n < regions.length; n++) {
                      if (parseInt(region) === regions[n].LocationId) {
                        this.region = regions[n].Name;
                        break;
                      }
                    }
                  }
                  break;
                }
              }
            }
            break;
          }
        }


      });



  }


  // 百度地图
  initMap() {
    // 创建地图实例
    const map = new BMap.Map('container');
    this.map = map;

    /*let point0 = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point0, 6);*/



    if (!this.info || this.info.longitude === 0 || this.info.latitude === 0 ) {
      const that = this;
      // 获取当前定位
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          const mk = new BMap.Marker(r.point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
            scale: 5,
            strokeWeight: 2.5,
            strokeColor: '#ffffff',
            rotation: 0, // 顺时针旋转30度
            fillColor: '#369BFF',
            fillOpacity: 1
          })
          });
          that.info.lng = r.point.lng;
          that.info.lat = r.point.lat;
          map.addOverlay(mk);
          map.centerAndZoom(r.point, 6);
          map.setMapStyleV2({
            styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
          });
        } else {
          const point0 = new BMap.Point(118, 39.897445);
          map.centerAndZoom(point0, 6);
          map.setMapStyleV2({
            styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
          });
          // alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
    } else {
      // 创建点坐标
      const point = new BMap.Point(this.info.longitude, this.info.latitude);
      const mk = new BMap.Marker(point, {icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
          scale: 5,
          strokeWeight: 2.5,
          strokeColor: '#ffffff',
          rotation: 0, // 顺时针旋转30度
          fillColor: '#369BFF',
          fillOpacity: 1
        })
      });
      map.addOverlay(mk);
      map.centerAndZoom(point, 6);
      map.setMapStyleV2({
        styleId: 'cf1b221650f5b1e206f6f4ef215edd5a'
      });
    }

    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放


    /*map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 添加定位控件
    const geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener('locationSuccess', function(e) {
      // 定位成功事件
      // let address = '';
      // address += e.addressComponent.province;
      // address += e.addressComponent.city;
      // address += e.addressComponent.district;
      // address += e.addressComponent.street;
      // address += e.addressComponent.streetNumber;
      // alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener('locationError', function(e) {
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);*/

  }



  // 编辑常规信息模态框
  editBasic() {
    const that = this;
    const modalRef = this.modalService.open(EqBasicEditComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.info;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
       that.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 编辑地址信息模态框
  editAddr() {
    const that = this;
    const modalRef = this.modalService.open(EqAddressEditComponent, {windowClass: 'modal_m2', centered: true});
    modalRef.componentInstance.currentData = this.info;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 删除
  deleteData() {
    const that = this;
    const title = '确认要删除此设备吗？';
    const subtitle = '';
    this.creatModal(title, subtitle, () => {
      // this.checkBatch( [this.uid]);
      let post = {
        data: [this.uid]
      };
      this.eptService.deleteData(post)
        .subscribe( val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
         that.router.navigate(['/admin/ordinary/graphic/dashborad']);
        }, err => {
          Swal(
            err.message || err,
            '',
            'error'
          );
        });
    });
  }

  // 禁用/激活
  disableData() {
    const that = this;
    let title = '';
    const subtitle = '';
    let post;
    switch (this.info.status) {
      case 1:
        title = '确认要激活此设备吗？';
        post = {
          type: 0,
          data: [this.uid]
        };
        break;
      case 0:
        title = '确认要禁用此设备吗？';
        post = {
          type: 1,
          data: [this.uid]
        };
        break;
    }

    this.creatModal(title, subtitle, () => {
      // this.checkBatch( [this.uid]);

      this.eptService.disableData(post)
        .subscribe( val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getInfo();
        }, err => {
          Swal(
            err.message || err,
            '',
            'error'
          );
        });
    });
  }

  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: subtitle,
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }



  goBack() {
    window.history.go(-1);
  }

}
