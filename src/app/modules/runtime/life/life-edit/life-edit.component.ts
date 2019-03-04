import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LifeService} from "../../../../shared/life.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-life-edit',
  templateUrl: './life-edit.component.html',
  styleUrls: ['./life-edit.component.css']
})
export class LifeEditComponent implements OnInit {
  @Input()
  uid;
  currentData;

  public name;
  public date;
  public period;

  constructor(public activeModal: NgbActiveModal,
              private lifeService: LifeService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.name = this.currentData.Name;
    this.date = this.currentData.InstallationDate;
    this.period = this.currentData.SaveTime;
  }


  numberVal() {
    if (! /^\d+$/.test(this.period)) {
      this.period = 0;
    }
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  save() {
    this.date.setHours(0, 0, 0, 0);
    const post = {
      uid: this.currentData.Uid,
      name: this.name,
      installDate: this.date,
      expireTime: this.period
    };
    console.log(post);
    this.lifeService.edit(post)
      .subscribe( val => {
        Swal(
          '更新成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '更新失败！',
          err,
          'error'
        );
      });
  }


}
