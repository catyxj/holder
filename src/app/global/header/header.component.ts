import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from '../../shared/user.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs/index";
import {AlarmService} from "../../shared/alarm.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();

  @Input() user: any;
  @Input() isCollapsed: any;

  public alarmNum = 0;
  public malNum = 0;
  public noticeNum = 0;
  public totalNum = 0;
  public subscription: Subscription;

  constructor(private userService: UserService,
              private alarmService: AlarmService,
              private router: Router) {
    this.subscription = this.alarmService.alarmStatus$
      .subscribe( data => {
        this.getAlarm();
      });
  }

  ngOnInit() {
    // console.log(this.user);
    this.getAlarm();
    // this.getUser();
  }

  getAlarm() {
    this.alarmService.getAlarmNum()
      .subscribe( data => {
        this.alarmNum = data.alarmCount;
        this.malNum = data.mtCount;
        this.noticeNum = data.ntCount;
        this.totalNum = this.alarmNum + this.malNum + this.noticeNum;
      });
  }


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

  logout() {
    this.userService.logout(this.user.Uid)
      .subscribe();
    sessionStorage.user = false;
    this.router.navigate(['/login']);
  }

}
