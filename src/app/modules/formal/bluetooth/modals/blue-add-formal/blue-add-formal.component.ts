import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../../shared/bluetooth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-add-formal',
  templateUrl: './blue-add-formal.component.html',
  styleUrls: ['./blue-add-formal.component.css']
})
export class BlueAddFormalComponent implements OnInit {
  public mac;
  public name;
  public terminal;
  public verify;

  constructor(public activeModal: NgbActiveModal,
              public blueService: BluetoothService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      mac: this.mac,
      name: this.name,
      verify: this.verify,
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
