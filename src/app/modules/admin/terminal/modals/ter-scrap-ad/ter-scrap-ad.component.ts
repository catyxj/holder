import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ter-scrap-ad',
  templateUrl: './ter-scrap-ad.component.html',
  styleUrls: ['./ter-scrap-ad.component.css']
})
export class TerScrapAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    console.log(this.uid);
    this.terminalService.scrap(this.uid)
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
