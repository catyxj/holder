import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-config-ser',
  templateUrl: './ac-config-ser.component.html',
  styleUrls: ['./ac-config-ser.component.css']
})
export class AcConfigSerComponent implements OnInit {
  @Input()
  currentData;

  public username;
  public email;

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      username: this.username,
      email: this.email
    };
    this.accountService.setInfo(post)
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
