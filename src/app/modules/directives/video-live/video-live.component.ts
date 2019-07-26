import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../../shared/video.service";

import Swal from 'sweetalert2';
import {UserService} from "../../../shared/user.service";
import {Subscription} from "rxjs/index";
import {DomSanitizer} from "@angular/platform-browser";
declare var EZUIPlayer: any;

@Component({
  selector: 'app-video-live',
  templateUrl: './video-live.component.html',
  styleUrls: ['./video-live.component.css']
})
export class VideoLiveComponent implements OnInit {
  public uid;
  public player;
  public url;
  public video;
  public user;
  public sideshow;
  public isControl;
  public subscription: Subscription;



  public ctrlImgs = [
    {
      img0: 'assets/images/video/ctrl_up0.png',
      img1: 'assets/images/video/ctrl_up.png',
    },
    {
      img0: 'assets/images/video/ctrl_down0.png',
      img1: 'assets/images/video/ctrl_down.png',
    },
    {
      img0: 'assets/images/video/ctrl_left0.png',
      img1: 'assets/images/video/ctrl_left.png',
    },
    {
      img0: 'assets/images/video/ctrl_right0.png',
      img1: 'assets/images/video/ctrl_right.png',
    },
  ];
  public ctrls = [];
  public cNum;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private videoService: VideoService,
              private userService: UserService,
              private sanitizer: DomSanitizer) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    // this.player = new EZUIPlayer('myPlayer');
    // this.isControl = true;

    for (let i = 0; i < this.ctrlImgs.length; i++) {
      this.ctrls[i] = this.ctrlImgs[i].img0;
    }

    this.getLive();
    this.getUser();
    this.getVideoInfo();
  }

  getVideoInfo() {
    this.videoService.getBasic(this.uid)
      .subscribe(data => {
        this.video = data;
      }, err => {

      });
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.userService.StatusMission(this.user);
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      });
  }

  getLive() {
    this.videoService.live(this.uid)
      .subscribe(data => {
        this.isControl = data.console;
        this.url = this.sanitizer.bypassSecurityTrustUrl(data.rtmp);
        console.log(this.url);
        setTimeout( () => {
          this.player = new EZUIPlayer('myPlayer');
        }, 1000);
      }, err => {

      });
  }


  // 控制开始
  startCtrl(data) {
    console.log('start:', data);

    this.cNum = data;
    if (data <= 4) {
      this.ctrls[data] = this.ctrlImgs[data].img1;
    }

    const post = {
      serial_number: this.video.serial_number,
      channel_number: parseInt(this.video.channel_number),
      direction: data
    };
    this.videoService.startCtrl(post)
      .subscribe(val => {

      }, err => {
        Swal(
          '',
          err.message || err,
          'error'
        );
      });
  }


  // 控制结束
  endCtrl(data?) {
    console.log('end:', data);


    if (this.cNum <= 4) {
      this.ctrls[this.cNum] = this.ctrlImgs[this.cNum].img0;
    }

    let post = {
      serial_number: this.video.serial_number,
      channel_number: parseInt(this.video.channel_number),
      direction: data
    };
    this.videoService.endCtrl(post)
      .subscribe(val => {

      }, err => {
        Swal(
          '',
          err.message || err,
          'error'
        );
      });
  }



}
