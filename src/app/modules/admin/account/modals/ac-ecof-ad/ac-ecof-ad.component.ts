import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ac-ecof-ad',
  templateUrl: './ac-ecof-ad.component.html',
  styleUrls: ['./ac-ecof-ad.component.css']
})
export class AcEcofAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;


  public type;
  public expands = [];

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.type = this.currentData.account_type.toString();
    this.expands = this.currentData.privilege;
  }


  save() {
    let that = this;
    let exArr = '';

    for (let i = 0; i < this.expands.length; i++) {
      let ex = this.expands[i];
      if (this.type !== '10') {
        ex.status = false;
      }
      if (ex.status) {
        exArr += ex.Id + ',';
      }
    }
    let post = {
      uid: this.uid,
      role_id: parseInt(this.type),
      privilege: exArr
    };
    this.accountService.updateConfig(post)
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
