import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {UserService} from '../shared/user.service';
import {VideoService} from '../shared/video.service';
import Swal from 'sweetalert2';

declare var EZUIPlayer: any;

@Component({
  selector: 'app-v-view',
  templateUrl: './v-view.component.html',
  styleUrls: ['./v-view.component.css']
})
export class VViewComponent implements OnInit, OnDestroy {
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
              private userService: UserService,
              private router: Router,
              private videoService: VideoService) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });
  }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.name = this.route.snapshot.paramMap.get('name');
    this.num = this.route.snapshot.paramMap.get('num');
    this.serialName = this.route.snapshot.paramMap.get('serialName');
    this.serialNumber = this.route.snapshot.paramMap.get('serialNumber');
    this.isControl = this.route.snapshot.paramMap.get('consoleOn') === 'true';
    console.log(this.isControl);
    setTimeout( () => {
      this.player = new EZUIPlayer('myPlayer');
    }, 500);
    this.getUser();

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




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
