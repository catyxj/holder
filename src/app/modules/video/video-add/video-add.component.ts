import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VideoService} from '../../../shared/video.service';
import {BoilerService} from '../../../shared/boiler.service';
import {OrganizationService} from '../../../shared/organization.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {
  @Input ()
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
              private boilerService: BoilerService,
              private orgService: OrganizationService) { }

  ngOnInit() {
    this.getOrg();
    this.getEpt();
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
      name: this.name,
      eptUid: this.equipment,
      remark: this.cameraId,
      serialName: this.cameraNum,
      serialNumber: this.cameraWay,
      checkOn: this.isIdentify,
      liveAddress: this.videoAdress,
      orgUid: this.org,
      consoleOn: this.isCtrl
    };
    console.log(data);
    this.videoService.addData(data)
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
