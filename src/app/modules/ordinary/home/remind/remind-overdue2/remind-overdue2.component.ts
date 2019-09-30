import {Component, Input, OnInit} from '@angular/core';
import {BoilerService} from "../../../../../shared/boiler.service";
import {AlarmService} from "../../../../../shared/alarm.service";

@Component({
  selector: 'app-remind-overdue2',
  templateUrl: './remind-overdue2.component.html',
  styleUrls: ['./remind-overdue2.component.css']
})
export class RemindOverdue2Component implements OnInit {
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
