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

  public alarm = [];
  public compares;

  constructor(public activeModal: NgbActiveModal,
              private nzmodalService: NzModalService) { }

  ngOnInit() {
    this.compares = [
      '＜' , '＞'
    ];
    this.alarm = [
      {
        compareValue: '＜',
        warningValue: null,
        description: null,
        priority: false
      }
    ];
  }


  addAlarm() {
    this.alarm.push(
      {compareValue: '＞',
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
        case '＞':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) - 1;
          break;
        case '＜':
          this.alarm[i].normalValue = parseFloat(this.alarm[i].warningValue) + 1;
          break;
      }
      data.push({
        warningValue: this.alarm[i].warningValue,
        description: this.alarm[i].description,
        priority: this.alarm[i].priority,
        normalValue: this.alarm[i].normalValue
      });
    }

    this.nzmodalService.success({
      nzTitle: '保存成功',
      nzContent: ''
    });
    // alert('保存成功');
    this.activeModal.close(data);


  }

}
