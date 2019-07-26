import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../../../../shared/video.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-v-scrap-ad',
  templateUrl: './v-scrap-ad.component.html',
  styleUrls: ['./v-scrap-ad.component.css']
})
export class VScrapAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService) { }

  ngOnInit() {
  }

  save() {
    let that = this;

    this.videoService.scrap(this.uid)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });
  }

}
