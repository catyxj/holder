import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-range-config',
  templateUrl: './range-config.component.html',
  styleUrls: ['./range-config.component.css']
})
export class RangeConfigComponent implements OnInit {
  @Input()
  currentData: any;

  public isValid;
  public comment;
  public ranges;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.isValid = false;
    this.comment = '';
    this.ranges = this.currentData.Ranges.slice();
    let sortNumber = function (a, b) {
      return a.sort - b.sort;
    };
    this.ranges.sort(sortNumber);
    if (!this.ranges || this.ranges.length <= 0) {
      this.ranges = [];
      this.addNewRange();
      this.comment = '请完善相关信息';
    }
  }

  addNewRange() {
    this.ranges.push({});
    // console.log(this.ranges);
  }

  removeRange(index) {
    this.ranges.splice(index, 1);
  }

  rangeChanged() {
    for (let i = 0; i < this.ranges.length; i++) {
      let rg = this.ranges[i];
      if (!rg.min && typeof rg.min !== 'number' || rg.min < 0 || rg.min > 65535) {
        this.isValid = false;
        this.comment = '状态的范围低值不可为空，范围是 0-65535。';
        return;
      }

      if (!rg.max && typeof rg.max !== 'number' || rg.max < 0 || rg.max > 65535) {
        this.isValid = false;
        this.comment = '状态的范围高值不可为空，范围是 0-65535。';
        return;
      }

      if (rg.min > rg.max) {
        this.isValid = false;
        this.comment = '状态的范围高值需大于或等于范围低值。';
        return;
      }

      if (i > 0 && rg.min <= this.ranges[i - 1].max) {
        this.isValid = false;
        this.comment = '状态间不可有值的交叉，后一个状态的低值不可小于或等于前一个状态的高值。';
        return;
      }

      if (!rg.name || rg.name.length <= 0) {
        this.isValid = false;
        this.comment = '状态的名称不可为空。';
        return;
      }

      this.isValid = true;
      this.comment = '配置正确';
    }
  }


  save() {
    console.log(this.ranges);
    let ran = [];
    for (let i = 0; i < this.ranges.length; i++) {
      let rg = this.ranges[i];
      ran.push({
        sort: i + 1,
        name: rg.name,
        min: rg.min,
        max: rg.max
      });
    }
    this.activeModal.close(ran);
  }

  dismiss() {
    Swal({
      title: '是否保存？',
      showCancelButton: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.save();
      } else {
        this.activeModal.dismiss('close');
      }
    });
  }




}
