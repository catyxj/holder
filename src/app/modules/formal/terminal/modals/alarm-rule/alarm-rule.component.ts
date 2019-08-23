import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-alarm-rule',
  templateUrl: './alarm-rule.component.html',
  styleUrls: ['./alarm-rule.component.css']
})
export class AlarmRuleComponent implements OnInit {
  @Input()
  currentData: any;

  public alarm;

  constructor(public activeModal: NgbActiveModal,
              private nzmodalService: NzModalService) { }

  ngOnInit() {
    if (!this.currentData.alarm) {
      this.alarm = [];
    } else {
      this.alarm = [];
      for (let i = 0; i < this.currentData.alarm.length; i++) {
        const al = this.currentData.alarm[i];
        this.alarm.push({
          minValue: al.alarm_min,
          maxValue: al.alarm_max,
          description: al.desc,
          priority: al.priority,
          sort: al.sort
        });
      }
    }
  }



  addAlarm() {
    this.alarm.push(
      {
        minValue: null,
        maxValue: null,
        description: null,
        priority: false
      }
    );
  }

  removeAlarm(index) {
    this.alarm.splice(index, 1);
  }

  save() {
    const data = [];
    for (let i = 0; i < this.alarm.length; i++) {
      /*if ((!this.alarm[i].minValue && this.alarm[i].minValue !== 0) && (!this.alarm[i].maxValue && this.alarm[i].maxValue !== 0) ) {
        continue;
      }
      if (!this.alarm[i].minValue && this.alarm[i].minValue !== 0 && this.alarm[i].maxValue) {
        this.alarm[i].minValue = -32768;
      }
      if (!this.alarm[i].maxValue && this.alarm[i].maxValue !== 0 && this.alarm[i].minValue) {
        this.alarm[i].maxValue = 32768;
      }*/
      if (!this.alarm[i].minValue && !this.alarm[i].maxValue ) {
        continue;
      }
      data.push({
        alarm_min: this.alarm[i].minValue,
        alarm_max: this.alarm[i].maxValue,
        desc: this.alarm[i].description,
        priority: this.alarm[i].priority,
        sort: i + 1
      });
    }

    console.log(data);
    this.nzmodalService.success({
      nzTitle: '保存成功',
      nzContent: ''
    });
    this.activeModal.close(data);


  }

}
