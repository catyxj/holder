import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-alarm-rule',
  templateUrl: './alarm-rule.component.html',
  styleUrls: ['./alarm-rule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlarmRuleComponent implements OnInit {

  @Input()
  currentData: any;

  public alarm;
  public compares;

  constructor(public activeModal: NgbActiveModal,
              private nzmodalService: NzModalService) { }

  ngOnInit() {
    /*this.compares = [
      {id: 0, name: '＜'}, {id: 1, name: '＞'}
    ];*/

    // console.log(this.currentData);
    if (!this.currentData.alarm) {
      this.alarm = [
        /*{
          minValue: null,
          maxValue: null,
          description: null,
          priority: false
        }*/
      ];
    } else {
      this.alarm = [];
      for (let i = 0; i < this.currentData.alarm.length; i++) {
        let al = this.currentData.alarm[i];
        this.alarm.push({
          minValue: al.AlarmMin,
          maxValue: al.AlarmMax,
          description: al.Description,
          priority: al.Priority
        });
      }
    }

  }


  addAlarm() {
    this.alarm.push(
      {minValue: null,
      maxValue: null,
      description: null,
      priority: false}
      );
  }

  removeAlarm(index) {
    this.alarm.splice(index, 1);
  }

  save() {
    let data = [];
    for (let i = 0; i < this.alarm.length; i++) {
      if ((!this.alarm[i].minValue && this.alarm[i].minValue !== 0) || (!this.alarm[i].maxValue && this.alarm[i].maxValue !== 0) ) {
        continue;
      }
      /*switch (this.alarm[i].compareValue) {
        case '1':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) - 1;
          this.alarm[i].compareValue = 1;
          break;
        case '0':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) + 1;
          this.alarm[i].compareValue = 0;
          break;
      }*/
      data.push({
        AlarmMax: this.alarm[i].maxValue,
        Description: this.alarm[i].description,
        Priority: this.alarm[i].priority,
        // normalValue: this.alarm[i].normalValue,
        AlarmMin: this.alarm[i].minValue
      });
    }

    console.log(data);
    this.nzmodalService.success({
      nzTitle: '保存成功',
      nzContent: ''
    });
    // alert('保存成功');
    this.activeModal.close(data);


  }

}
