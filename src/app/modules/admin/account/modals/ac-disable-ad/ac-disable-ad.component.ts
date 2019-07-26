import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-disable-ad',
  templateUrl: './ac-disable-ad.component.html',
  styleUrls: ['./ac-disable-ad.component.css']
})
export class AcDisableAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;
  @Input()
  basic;

  public status;

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

  ngOnInit() {
    this.status = this.currentData.account_status.toString();
  }

  save() {
    let that = this;
    let post = {
      status: parseInt(this.status),
      data: [this.uid]
    };
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
          err.message,
          '',
          'error'
        );
      });
  }

}
