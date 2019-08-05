import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../../../../shared/video.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-add-formal',
  templateUrl: './video-add-formal.component.html',
  styleUrls: ['./video-add-formal.component.css']
})
export class VideoAddFormalComponent implements OnInit {
  public cameraId;
  public cameraNum;
  public cameraVerify;
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
