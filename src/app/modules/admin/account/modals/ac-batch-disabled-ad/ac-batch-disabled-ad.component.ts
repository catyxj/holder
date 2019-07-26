import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-batch-disabled-ad',
  templateUrl: './ac-batch-disabled-ad.component.html',
  styleUrls: ['./ac-batch-disabled-ad.component.css']
})
export class AcBatchDisabledAdComponent implements OnInit {
  @Input()
  currentData;

  public reason = '非法操作';

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

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
    this.accountService.disableAccount(post)
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
