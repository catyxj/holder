import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RuntimeService} from "../../../../../../shared/runtime.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cycle-add',
  templateUrl: './cycle-add.component.html',
  styleUrls: ['./cycle-add.component.css']
})
export class CycleAddComponent implements OnInit {
  @Input()
  uid;

  public name;
  public date;
  public period;
  public topic;

  constructor(public activeModal: NgbActiveModal,
              public runtimeService: RuntimeService) { }

  ngOnInit() {
  }


  // 选择日期
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  save() {
    let that = this;
    let post = {
      ept_id: this.uid,
      name: this.name,
      install_date: this.date,
      save_month: this.period,
      description: this.topic
    };
    console.log(post);
    this.runtimeService.addCompData(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
