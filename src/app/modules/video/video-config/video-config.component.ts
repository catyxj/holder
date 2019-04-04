import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VideoService} from '../../../shared/video.service';

import Swal from 'sweetalert2';
import {OrganizationService} from "../../../shared/organization.service";
import {BoilerService} from "../../../shared/boiler.service";

@Component({
  selector: 'app-video-config',
  templateUrl: './video-config.component.html',
  styleUrls: ['./video-config.component.css']
})
export class VideoConfigComponent implements OnInit {
  @Input ()
  currentData;
  currentUser;

  public name;
  public cameraId;
  public cameraNum;
  public cameraWay;
  public videoAdress;
  public equipment;
  public eptList;
  public isIdentify;
  public isCtrl;
  public org = '';
  public orgList;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService,
              private orgService: OrganizationService,
              private boilerService: BoilerService) { }

  ngOnInit() {
    this.getOrg();
    this.getEpt();
    this.name = this.currentData.Name;
    this.cameraId = this.currentData.Remark;
    this.cameraNum = this.currentData.SerialName;
    this.cameraWay = this.currentData.SerialNumber;
    this.videoAdress = this.currentData.LiveAddress;
    this.org = this.currentData.Organization ? this.currentData.Organization.Uid : '';
    this.equipment = this.currentData.Equipment ? this.currentData.Equipment.Uid : '';
    this.isIdentify = this.currentData.CheckOn;
    this.isCtrl = this.currentData.ConsoleOn;
  }

  getOrg() {
    this.orgService.getOrgList()
      .subscribe( data => {
        this.orgList = data;
      });
  }

  getEpt() {
    this.boilerService.getBoilerAll()
      .subscribe( data => {
        this.eptList = data;
      });
  }

  save() {
    const data = {
      uid: this.currentData.Uid,
      name: this.name,
      eptUid: this.equipment,
      remark: this.cameraId,
      serialName: this.cameraNum,
      serialNumber: this.cameraWay,
      checkOn: this.isIdentify,
      liveAddress: this.videoAdress,
      orgUid: this.org,
      consoleOn: this.isCtrl,
    };
    console.log(data);
    this.videoService.editData(data)
      .subscribe(val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
