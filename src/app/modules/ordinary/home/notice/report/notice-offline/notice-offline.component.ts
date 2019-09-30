import {Component, Input, OnInit} from '@angular/core';
import {BoilerService} from "../../../../../../shared/boiler.service";
import {AlarmService} from "../../../../../../shared/alarm.service";

@Component({
  selector: 'app-notice-offline',
  templateUrl: './notice-offline.component.html',
  styleUrls: ['./notice-offline.component.css']
})
export class NoticeOfflineComponent implements OnInit {
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
    this.eptService.getNoticeInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.alarmService.AlarmMission('a');
      }, err => {

      });
  }

}
