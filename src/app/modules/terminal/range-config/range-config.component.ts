import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
    this.comment = '请完善相关信息';
    this.ranges = [];
    if (this.ranges.length <= 0) {
      this.addNewRange();
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
      if (!rg.Min && typeof rg.Min !== 'number' || rg.Min < 0 || rg.Min > 65535) {
        this.isValid = false;
        this.comment = '状态的范围低值不可为空，范围是 0-65535。';
        return;
      }

      if (!rg.Max && typeof rg.Max !== 'number' || rg.Max < 0 || rg.Max > 65535) {
        this.isValid = false;
        this.comment = '状态的范围高值不可为空，范围是 0-65535。';
        return;
      }

      if (rg.Min > rg.Max) {
        this.isValid = false;
        this.comment = '状态的范围高值需大于或等于范围低值。';
        return;
      }

      if (i > 0 && rg.Min <= this.ranges[i - 1].Max) {
        this.isValid = false;
        this.comment = '状态间不可有值的交叉，后一个状态的低值不可小于或等于前一个状态的高值。';
        return;
      }

      if (!rg.Name || rg.Name.length <= 0) {
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
    for (let i = 0; i < this.ranges.length; i++){
      this.ranges[i].Value = i;
    }
    this.activeModal.close(this.ranges);
  }

}
