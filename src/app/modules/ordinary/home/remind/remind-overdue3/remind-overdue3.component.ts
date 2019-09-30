import {Component, Input, OnInit} from '@angular/core';
import {BoilerService} from "../../../../../shared/boiler.service";
import {AlarmService} from "../../../../../shared/alarm.service";

@Component({
  selector: 'app-remind-overdue3',
  templateUrl: './remind-overdue3.component.html',
  styleUrls: ['./remind-overdue3.component.css']
})
export class RemindOverdue3Component implements OnInit {
  @Input()
  uid;
  public info;
  public user;

  constructor(private eptService: BoilerService,
              private alarmService: AlarmService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getData();
  }

  getData() {
    this.eptService.getRemindInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.alarmService.AlarmMission('a');
      }, err => {

      });
  }

}
