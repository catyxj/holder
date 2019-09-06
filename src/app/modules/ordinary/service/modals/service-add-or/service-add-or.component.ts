import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceService} from "../../../../../shared/service.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-add-or',
  templateUrl: './service-add-or.component.html',
  styleUrls: ['./service-add-or.component.css']
})
export class ServiceAddOrComponent implements OnInit {
  public type = '2';
  public content;
  public fileList = [];
  public typeList = [{id: '1', name: 'A类，帮助文档'}, {id: '2', name: 'B类，系统问题'}, {id: '3', name: 'C类，售后维保'}];
  public headOption;

  constructor(public activeModal: NgbActiveModal,
              private serviceService: ServiceService ) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };
  }

  // 文件上传前
  beforeUpload = (file: File) => {
    console.log(file);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Swal(
        '上传失败',
        '上传的文件不能超过2M，请重新上传',
        'error'
      );
      return false;
    }
    return true;
  }


  // 文件上传状态改变
  handleChange(info: any): void {
    console.log(info);
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.id = info.file.response.id;
    }
    if (info.file.status === 'error') {
      Swal(
        '网络错误，请检查网络',
        info.file.message,
        'error'
      );
      // return;
    }
    // 3. filter successfully uploaded files according to response from server

    this.fileList = fileList.filter((item: any) => {
      // if (item.response) {
      //   return item.response.status === 'success';
      // }
      /*if (item.status === 'error') {
        return false;
      } else {
        return true;
      }*/
      return true;

    });
  }

  // 提交
  save() {
    const that = this;
    console.log(this.fileList);
    let files = '';
    for (let i = 0; i < this.fileList.length; i++) {
      files += this.fileList[i].response.id + ',';
    }
    const post = {
      type: parseInt(this.type),
      value: this.content,
      attach: files
    };
    this.serviceService.addDataF(post)
      .subscribe(val => {
        Swal(
          '提交成功',
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
