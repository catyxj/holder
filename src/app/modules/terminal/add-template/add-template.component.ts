import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateService} from "../../../shared/template.service";
import {NzMessageService} from "ng-zorro-antd";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {

  @Input()
  currentData;

  public name;

  constructor(public activeModal: NgbActiveModal,
              private templateService: TemplateService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.name = '';
  }

  save() {
    let data = this.currentData;
    data.Name = this.name;

    this.templateService.add(data)
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
