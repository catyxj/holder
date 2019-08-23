import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';
import {TerminalService} from "../../../../../../shared/terminal.service";
import {TemplateService} from "../../../../../../shared/template.service";

@Component({
  selector: 'app-eq-list-add',
  templateUrl: './eq-list-add.component.html',
  styleUrls: ['./eq-list-add.component.css']
})
export class EqListAddComponent implements OnInit {
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
      template_id: this.template
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
