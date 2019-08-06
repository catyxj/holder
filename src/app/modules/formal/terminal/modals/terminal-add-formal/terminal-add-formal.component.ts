import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';
import {TemplateService} from "../../../../../shared/template.service";

@Component({
  selector: 'app-terminal-add-formal',
  templateUrl: './terminal-add-formal.component.html',
  styleUrls: ['./terminal-add-formal.component.css']
})
export class TerminalAddFormalComponent implements OnInit {
  public code;
  public verify;
  public template;
  public templateList = [];

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService,
              private templateService: TemplateService) { }

  ngOnInit() {
    this.getTemplates();
  }

  // 获取模板
  getTemplates() {
    this.templateService.getTemplateAll()
      .subscribe(data => {
        this.templateList = data;
      }, err => {

      });
  }


  save() {
    let that = this;
    let post = {
      terminal_code: this.code,
      verify: this.verify,
      template: this.template
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
