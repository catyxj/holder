import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import {BluetoothService} from '../../../shared/bluetooth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-add',
  templateUrl: './blue-add.component.html',
  styleUrls: ['./blue-add.component.css']
})
export class BlueAddComponent implements OnInit {
  public name;
  public mac;
  public org;
  public orgList;

  constructor(public activeModal: NgbActiveModal,
              private orgService: OrganizationService,
              private blueService: BluetoothService) { }

  ngOnInit() {
    this.getOrg();
  }

  getOrg() {
    this.orgService.getOrgList()
      .subscribe( data => {
        this.orgList = data;
      });
  }


  save() {
    const data = {
      name: this.name,
      orgUid: this.org,
      mac: this.mac
    };
    this.blueService.addData(data)
      .subscribe( val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );

      });
  }


}
