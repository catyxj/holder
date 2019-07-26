import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ter-add-ad',
  templateUrl: './ter-add-ad.component.html',
  styleUrls: ['./ter-add-ad.component.css']
})
export class TerAddAdComponent implements OnInit {
  public code;
  public version;
  public sim;
  public account;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      terminal_code: this.code,
      fw_ver: this.version,
      sms_code: this.sim,
      account: this.account
    };
    // console.log(post);
    this.terminalService.addData(post)
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
