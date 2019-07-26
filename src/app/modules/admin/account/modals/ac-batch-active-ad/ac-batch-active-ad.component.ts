import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-batch-active-ad',
  templateUrl: './ac-batch-active-ad.component.html',
  styleUrls: ['./ac-batch-active-ad.component.css']
})
export class AcBatchActiveAdComponent implements OnInit {
  @Input()
  currentData;

  public reason = '审核通过';

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      status: 1,
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
