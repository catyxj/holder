import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VideoService} from '../../../shared/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-bind',
  templateUrl: './video-bind.component.html',
  styleUrls: ['./video-bind.component.css']
})
export class VideoBindComponent implements OnInit {
  @Input()
  currentData: any;

  public name;
  public cameraId;
  public videoAdress;

  constructor(public activeModal: NgbActiveModal,
              private videoService: VideoService) { }

  ngOnInit() {

  }



  save() {
    const data = {
      equipment_id: this.currentData.Uid,
      camrea_id: this.cameraId,
      address: this.videoAdress,
      name: this.name
    };
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
