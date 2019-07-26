import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../../../shared/video.service";

import Swal from 'sweetalert2';
import {Subscription} from "rxjs/index";
declare var EZUIPlayer: any;

@Component({
  selector: 'app-video-live-ad',
  templateUrl: './video-live-ad.component.html',
  styleUrls: ['./video-live-ad.component.css']
})
export class VideoLiveAdComponent implements OnInit {
  public uid;
  public player;
  public url;
  public name;
  public num;
  public serialName;
  public serialNumber;
  public user;
  public subscription: Subscription;
  public sideshow;
  public isControl;

  constructor(private route: ActivatedRoute,
              private videoService: VideoService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getLive();
  }

  getLive() {
    this.videoService.live(this.uid)
      .subscribe(data => {
        this.url = data.hls;
        setTimeout( () => {
          this.player = new EZUIPlayer('myPlayer');
        }, 600);
      }, err => {

      });
  }


  // 控制开始
  startCtrl(data) {
    console.log('start:', data);
    const post = {
      serialNumber: this.serialName,
      channelNo: parseInt(this.serialNumber),
      direction: data
    };
    this.videoService.startCtrl(post)
      .subscribe(val => {

      }, err => {
        Swal(
          '',
          err,
          'error'
        );
      });
  }


  // 控制结束
  endCtrl(data) {
    console.log('end:', data);
    const post = {
      serialNumber: this.serialName,
      channelNo: parseInt(this.serialNumber),
      direction: data
    };
    this.videoService.endCtrl(post)
      .subscribe(val => {

      }, err => {
        Swal(
          '',
          err,
          'error'
        );
      });
  }





}
