import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-password-ord',
  templateUrl: './ac-password-ord.component.html',
  styleUrls: ['./ac-password-ord.component.css']
})
export class AcPasswordOrdComponent implements OnInit {
  public oldPass;
  public newPass;
  public confirmPass;
  public equal;

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  confirm() {
    console.log(this.newPass, this.confirmPass)
    if ( this.newPass === this.confirmPass) {
      this.equal = true;
    } else {
      this.equal = false;
    }
  }

  save() {
    let that = this;
    if (this.newPass !== this.confirmPass) {
      this.equal = false;
      return;
    }
    let post = {
      old_password: this.oldPass,
      new_password: this.newPass
    };
    this.accountService.changePassO(post)
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
