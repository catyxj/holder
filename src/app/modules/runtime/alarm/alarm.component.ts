import { Component, OnInit } from '@angular/core';
import {AlarmService} from '../../../shared/alarm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class RuntimeAlarmComponent implements OnInit {

  public alarmSubscribe = false;
  public uid;
  public name;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.getSubscribe();

  }

  getSubscribe() {
    this.alarmService.getSubscribe(this.uid)
      .subscribe( data => {
        this.alarmSubscribe = data;
      });
  }

  setSubscribe() {
    this.alarmService.setsubscribe({uid: this.uid, subscribe: this.alarmSubscribe})
      .subscribe( val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }


}
