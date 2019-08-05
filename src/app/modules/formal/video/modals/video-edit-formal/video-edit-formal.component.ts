import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../../../../shared/video.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-edit-formal',
  templateUrl: './video-edit-formal.component.html',
  styleUrls: ['./video-edit-formal.component.css']
})
export class VideoEditFormalComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public cameraId;
  public cameraNum;
  public name;
  public code;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService) { }

  ngOnInit() {
    this.cameraId = this.currentData.serial_number;
    this.cameraNum = this.currentData.channel_number;
    this.name = this.currentData.name;
    this.code = this.currentData.terminal_code;
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      serial_number: this.cameraId,
      channel_number: this.cameraNum,
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
