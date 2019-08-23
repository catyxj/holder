import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';
import {UploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-terminal-basic-edit-formal',
  templateUrl: './terminal-basic-edit-formal.component.html',
  styleUrls: ['./terminal-basic-edit-formal.component.css']
})
export class TerminalBasicEditFormalComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public name;
  public equip;
  imgUrl: string;
  public img;
  public headOption;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };


    this.name = this.currentData ? this.currentData.template_name : '';
    this.equip = this.currentData ? this.currentData.ept_name : '';
    this.imgUrl = this.currentData && this.currentData.ept_img ? this.currentData.ept_img : '';
  }


  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJPG) {
      Swal(
        '请上传png,jpg,gif图片',
        '',
        'error'
      );
      return false;
    }
    const isLt2M = file.size / 1024  < 200;
    if (!isLt2M) {
      Swal(
        '图片大小不能超过200KB',
        '',
        'error'
      );
      return false;
    }
    return true;
  }

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }


  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        console.log(info);
        this.img = info.file;
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.imgUrl = img;
        });
        break;
      case 'error':
        Swal(
          '上传失败，请重试',
          info.file.message,
          'error'
        );
        break;
    }
  }






  save() {
    let that = this;
    // console.log(this.img);
    let post;
    if (this.img) {
      post = {
        terminal_id: this.uid,
        template_name: this.name.trim(),
        ept_name: this.equip.trim(),
        img: this.img.response.id
      };
    } else {
      post = {
        terminal_id: this.uid,
        template_name: this.name.trim(),
        ept_name: this.equip.trim()
      };
    }

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
