import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdressService} from "../../../../../../shared/adress.service";
import {BoilerService} from "../../../../../../shared/boiler.service";

import Swal from 'sweetalert2';
import {UploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-eq-basic-edit',
  templateUrl: './eq-basic-edit.component.html',
  styleUrls: ['./eq-basic-edit.component.css']
})
export class EqBasicEditComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  imgUrl: string;
  public img;
  public name;
  public infoList = [];
  public headOption;


  constructor(public activeModal: NgbActiveModal,
              private addrService: AdressService,
              private eptService: BoilerService) { }

  ngOnInit() {
    this.name = this.currentData.name;
    this.imgUrl = this.currentData.img;
    this.infoList = JSON.parse(JSON.stringify(this.currentData.info));

    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };

    /*this.infoList = [
      {
        name: 'aaaa',
        value: 'aaa111'
      }
    ];*/
  }


  addData() {
    this.infoList.push({
      name: '',
      value: ''
    });
  }

  delData(n) {
    this.infoList.splice(n, 1);
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
    /*if (!this.imgUrl) {
      Swal(
        '请上传图片',
        '',
        'info'
      );
      return;
    }*/

    let infoL = [];
    for (let i = 0 ; i < this.infoList.length; i++) {
      let inf = this.infoList[i];
      if (!inf.name) {
        Swal(
          '信息类型不能为空',
          '',
          'info'
        );
        return;
      }
      if (!inf.value) {
        Swal(
          '信息内容不能为空',
          '',
          'info'
        );
        return;
      }
      if (inf.name && inf.value) {
        infoL.push(inf);
      }
    }

    let post;
    if (this.img) {
      post = {
        uid: this.uid,
        name: this.name,
        info: infoL,
        img: this.img.response.id
      };
    } else {
      post = {
        uid: this.uid,
        name: this.name,
        info: infoL
      };
    }

    this.eptService.updateBasic(post)
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
