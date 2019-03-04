import { Component, OnInit } from '@angular/core';
import {BluetoothService} from '../../../shared/bluetooth.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-blue-bind-eq',
  templateUrl: './blue-bind-eq.component.html',
  styleUrls: ['./blue-bind-eq.component.css']
})
export class BlueBindEqComponent implements OnInit {
  public bluetooth;

  constructor(public activeModal: NgbActiveModal,
              private bluetoothService: BluetoothService) { }

  ngOnInit() {
  }

  save() {
    const data = this.bluetooth;

    this.activeModal.close(data);

    /*this.bluetoothService.bindBlueEq(data)
      .subscribe( val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close(data);
      }, err => {
        alert(err);
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });*/
  }

}
