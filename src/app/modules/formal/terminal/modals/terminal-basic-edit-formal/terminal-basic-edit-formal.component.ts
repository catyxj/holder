import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal-basic-edit-formal',
  templateUrl: './terminal-basic-edit-formal.component.html',
  styleUrls: ['./terminal-basic-edit-formal.component.css']
})
export class TerminalBasicEditFormalComponent implements OnInit {
  public name;
  public equip;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
  }


  save() {
    let that = this;
    let post = {


    };
    // console.log(post);
    this.terminalService.updateBasic(post)
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
