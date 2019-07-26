import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../../shared/bluetooth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-add-ad',
  templateUrl: './blue-add-ad.component.html',
  styleUrls: ['./blue-add-ad.component.css']
})
export class BlueAddAdComponent implements OnInit {
  public mac;
  public name;
  public account;
  public terminal;

  constructor(public activeModal: NgbActiveModal,
              public blueService: BluetoothService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      mac: this.mac,
      name: this.name,
      username: this.account,
      terminal_code: this.terminal,
    };
    this.blueService.addData(post)
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
