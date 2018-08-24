import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {BoilerService} from '../../../shared/boiler.service';
import {NzMessageService} from "ng-zorro-antd";

const I18N_VALUES = {
  'fr': {
    weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}


@Component({
  selector: 'app-edit-maintain',
  templateUrl: './edit-maintain.component.html',
  styleUrls: ['./edit-maintain.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class EditMaintainComponent implements OnInit {

  @Input()
  currentData: any;

  public date;
  public contact;

  constructor(public activeModal: NgbActiveModal,
              private datePipe: DatePipe,
              private boilerService: BoilerService,
              private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.contact = {
      contact: this.currentData.Contact ? this.currentData.Contact.Name : '',
      phoneNumber: this.currentData.Contact ? this.currentData.Contact.PhoneNumber : '',
      mobileNumber: this.currentData.Contact ? this.currentData.Contact.MobileNumber : '',
      email: this.currentData.Contact ? this.currentData.Contact.Email : '',
    };

    this.initDate();
    console.log(this.date);
  }


  initDate() {
    let gaugeStr: string = this.datePipe.transform(new Date(this.currentData.InspectGaugeDateNext), 'yyyy-MM-dd');
    let outerStr: string = this.datePipe.transform(new Date(this.currentData.InspectOuterDateNext), 'yyyy-MM-dd');
    let innerStr: string = this.datePipe.transform(new Date(this.currentData.InspectInnerDateNext), 'yyyy-MM-dd');
    let valveStr: string = this.datePipe.transform(new Date(this.currentData.InspectValveDateNext), 'yyyy-MM-dd');

    this.date = {
      gauge: {
        year: parseInt(gaugeStr.slice(0, 4)),
        month: parseInt(gaugeStr.slice(5, 7)),
        day: parseInt(gaugeStr.slice(8, 10))
      },
      outer: {
        year: parseInt(outerStr.slice(0, 4)),
        month: parseInt(outerStr.slice(5, 7)),
        day: parseInt(outerStr.slice(8, 10))
      },
      inner: {
        year: parseInt(innerStr.slice(0, 4)),
        month: parseInt(innerStr.slice(5, 7)),
        day: parseInt(innerStr.slice(8, 10))
      },
      valve : {
        year: parseInt(valveStr.slice(0, 4)),
        month: parseInt(valveStr.slice(5, 7)),
        day: parseInt(valveStr.slice(8, 10))
      }
    };
    // console.log(gaugeStr);
  }


  open(dp1, dp2, dp3, dp4) {
    dp2.close();
    dp3.close();
    dp4.close();
    dp1.toggle();
  }

  save() {
    let inner = `${this.date.inner.year}-${this.date.inner.month}-${this.date.inner.day}`;
    let outer = `${this.date.outer.year}-${this.date.outer.month}-${this.date.outer.day}`;
    let valve = `${this.date.valve.year}-${this.date.valve.month}-${this.date.valve.day}`;
    let gauge = `${this.date.valve.year}-${this.date.valve.month}-${this.date.valve.day}`;

    let data = {
      uid: this.currentData.Uid,
      contact: this.contact.contact,
      phoneNumber: this.contact.phoneNumber,
      mobileNumber: this.contact.mobileNumber,
      email: this.contact.email,
      inspectDate: {
        inner: this.datePipe.transform(new Date(inner), 'yyyy-MM-dd'),
        outer: this.datePipe.transform(new Date(outer), 'yyyy-MM-dd'),
        valve: this.datePipe.transform(new Date(valve), 'yyyy-MM-dd'),
        gauge: this.datePipe.transform(new Date(gauge), 'yyyy-MM-dd'),
      }
    };
    this.boilerService.updateMaintain(data)
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      }, err => {
        // this.message.error(err);
        alert(err);
      });
  }

}
