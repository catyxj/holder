import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../../../../shared/video.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-v-add-ad',
  templateUrl: './v-add-ad.component.html',
  styleUrls: ['./v-add-ad.component.css']
})
export class VAddAdComponent implements OnInit {
  public cameraId;
  public cameraNum;
  public cameraVerify;
  public account;
  public name;
  public code;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      serial_number: this.cameraId,
      channel_number: this.cameraNum,
      verify_code: this.cameraVerify,
      username: this.account,
      name: this.name,
      terminal_code: this.code
    };
    this.videoService.addData(post)
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
