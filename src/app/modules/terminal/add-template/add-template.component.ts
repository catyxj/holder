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
  public isLoading = false;

  constructor(public activeModal: NgbActiveModal,
              private templateService: TemplateService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.name = '';
  }

  save() {
    let data = this.currentData;
    data.Name = this.name;

    this.isLoading = true;
    this.templateService.add(data)
      .subscribe( val => {
        this.isLoading = false;
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        this.isLoading = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
