import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../../../shared/maintain.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-account-disabled-f',
  templateUrl: './m-account-disabled-f.component.html',
  styleUrls: ['./m-account-disabled-f.component.css']
})
export class MAccountDisabledFComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  title;

  public reason = '非法操作';

  constructor(public activeModal: NgbActiveModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      status: 0,
      data: this.currentData,
      remark: this.reason
    };
    console.log(post);
    this.maintainService.updateUserStatus(post)
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
