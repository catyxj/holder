import { Component, OnInit } from '@angular/core';
import {MaintainService} from '../../../shared/maintain.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {AlarmService} from "../../../shared/alarm.service";

@Component({
  selector: 'app-maintain-add',
  templateUrl: './maintain-add.component.html',
  styleUrls: ['./maintain-add.component.css']
})
export class MaintainAddComponent implements OnInit {
  public uid;
  public name;
  public viewList = [];

  constructor(private maintainService: MaintainService,
              private alarmService: AlarmService,
              private router: Router) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
  }

  add() {
    this.viewList.push({
      name: '',
      result: false,
      remark: ''
    });
  }

  check(data) {
    if (data.result) {
      data.result = false;
    } else {
      data.result = true;
    }
  }

  remove(index) {
    this.viewList.splice(index, 1);
  }

  save() {
    const dataList = [];
    for (let i = 0; i < this.viewList.length; i++) {
      const vl = this.viewList[i];
      if (!vl.name) {
        continue;
      }
      dataList.push(vl);
    }
    if (dataList.length <= 0) {
      alert('没有信息可以保存');
      return;
    }
    const post = {
      uid: this.uid,
      slice: dataList
    };

    this.maintainService.add(post)
      .subscribe(val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.alarmService.AlarmMission('ok');
        this.router.navigate(['/admin/runtime/' + this.uid + '/' + this.name + '/maintain/dashboard']);
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });

  }

}
