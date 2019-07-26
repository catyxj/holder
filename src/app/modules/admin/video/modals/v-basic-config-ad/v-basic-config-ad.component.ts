import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../../../../shared/video.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-v-basic-config-ad',
  templateUrl: './v-basic-config-ad.component.html',
  styleUrls: ['./v-basic-config-ad.component.css']
})
export class VBasicConfigAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public cameraId;
  public cameraNum;
  public account;
  public name;
  public code;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService) { }

  ngOnInit() {
    this.cameraId = this.currentData.serial_number;
    this.cameraNum = this.currentData.channel_number;
    this.account = this.currentData.username;
    this.name = this.currentData.name;
    this.code = this.currentData.terminal_code;
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      serial_number: this.cameraId,
      channel_number: this.cameraNum,
      username: this.account,
      name: this.name,
      terminal_code: this.code
    };
    this.videoService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
