import { Component, OnInit } from '@angular/core';
import {BoilerService} from "../../../../../../shared/boiler.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eq-list-link',
  templateUrl: './eq-list-link.component.html',
  styleUrls: ['./eq-list-link.component.css']
})
export class EqListLinkComponent implements OnInit {
  public code;
  public verify;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      terminal_code: this.code,
      secret_key: this.verify
    };
    // console.log(post);
    this.boilerService.addEptLink(post)
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
