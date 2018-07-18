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
    this.compares = [
      {id: 0, name: '＜'}, {id: 1, name: '＞'}
    ];

    if (this.currentData.alarm.length <= 0) {
      this.alarm = [
        {
          compareValue: 0,
          warningValue: null,
          description: null,
          priority: false
        }
      ];
    } else {
      this.alarm = this.currentData.alarm;
    }

  }


  addAlarm() {
    this.alarm.push(
      {compareValue: 1,
      warningValue: null,
      description: null,
      priority: false}
      );
  }

  save() {
    let data = [];
    for (let i = 0; i < this.alarm.length; i++) {
      if (!this.alarm[i].warningValue) {
        continue;
      }
      switch (this.alarm[i].compareValue) {
        case '1':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) - 1;
          this.alarm[i].compareValue = 1;
          break;
        case '0':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) + 1;
          this.alarm[i].compareValue = 0;
          break;
      }
      data.push({
        warningValue: this.alarm[i].warningValue,
        description: this.alarm[i].description,
        priority: this.alarm[i].priority,
        // normalValue: this.alarm[i].normalValue,
        compareValue: this.alarm[i].compareValue
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
