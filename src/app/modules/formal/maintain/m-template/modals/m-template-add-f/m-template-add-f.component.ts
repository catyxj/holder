import { Component, OnInit } from '@angular/core';
import {MaintainService} from "../../../../../../shared/maintain.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-template-add-f',
  templateUrl: './m-template-add-f.component.html',
  styleUrls: ['./m-template-add-f.component.css']
})
export class MTemplateAddFComponent implements OnInit {
  public name;
  public tList = [];

  constructor(private maintainService: MaintainService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.tList = [''];
  }

  addItem() {
    this.tList.push('');
  }

  changeItem(data, i) {
    this.tList[i] = data;
  }

  save() {
    let that = this;
    let post = {
      name: this.name,
      info: this.tList
    };
    this.maintainService.addTempData(post)
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
