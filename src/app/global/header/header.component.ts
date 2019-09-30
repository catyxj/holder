import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs/index";
import {AlarmService} from "../../shared/alarm.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggle = new EventEmitter<void>();

  @Input()
  user: any;
  @Input()
  matches: any;
  @Input()
  btnShow: any;
  @Input()
  auth: any;

  public remindNum = 0;
  public noticeNum = 0;
  public totalNum = 0;
  public subscription: Subscription;
  public roleId;
  public picture = '';
  private status;


  constructor(private userService: UserService,
              private alarmService: AlarmService,
              private router: Router) {
    this.subscription = this.alarmService.alarmStatus$
      .subscribe( data => {
        this.getAlarm();
      });
  }

  ngOnInit() {
    // this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.roleId = localStorage.getItem('roleId');

    if (!this.user || !this.user.picture) {
      this.picture = 'assets/icons/anticon_user.png';
    }


    if (this.roleId === '10' || this.roleId === '11' ) {
      this.status = setInterval(() => { this.getAlarm(); }, 60000);
      this.getAlarm();
    }

    // console.log(this.user);
    // this.getUser();

  }


  // 权限
  checkAuth(data) {
    if (!this.auth) {
      return false;
    }
    return this.auth.indexOf(data) !== -1;
  }

  // 告警提醒数量
  getAlarm() {
    this.alarmService.getAlarmNum()
      .subscribe( data => {
        this.remindNum = data.import_alarm;
        this.noticeNum = data.notice_alarm;
        this.totalNum = this.remindNum + this.noticeNum;
      });
  }

  // 侧边栏显示隐藏
  onClick() {
    this.toggle.emit();
  }

  /*getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      });
    }*/

  viewAccount() {
    switch (this.roleId) {
      case '1':
        this.router.navigate(['/admin/ad/account']);
        break;
      case '10':
        this.router.navigate(['/admin/formal/account']);
        break;
      case '11':
        this.router.navigate(['/admin/ordinary/account']);
        break;
      case '15':
        this.router.navigate(['/admin/service/account']);
        break;
    }

  }

  // 退出登录
  logout() {
    this.userService.logout(this.user.Uid)
      .subscribe( val => {
        sessionStorage.user = false;
        this.router.navigate(['/login']);
      });

  }

  ngOnDestroy() {
    if (this.status) {
      clearInterval(this.status);
    }
  }

}
