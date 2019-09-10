import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UploadFile} from "ng-zorro-antd/upload";

import Swal from 'sweetalert2';
import {TemplateService} from "../../../../../shared/template.service";

@Component({
  selector: 'app-template-add-ept',
  templateUrl: './template-add-ept.component.html',
  styleUrls: ['./template-add-ept.component.css']
})
export class TemplateAddEptComponent implements OnInit, OnChanges {

  public equip;
  imgUrl: string;
  public img;
  public headOption;

  @Output()
  next = new EventEmitter();
  @Output()
  changeUid = new EventEmitter();
  @Input()
  uid;

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };

    if (this.uid) {
      console.log(this.uid);
      this.getBasic();
    }
  }


  // 获取模板基本信息
  getBasic() {
    this.templateService.getEpt(this.uid)
      .subscribe(data => {
        let basic = data;
        this.equip = data.ept_name;
        if (basic && basic.ept_img) {
          this.imgUrl = basic.ept_img;
        }
      }, err => {

      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('uid:', this.uid);
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
        '图片大小不能超过200k',
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
    let post;
    if (this.img) {
      post = {
        name: this.equip,
        img: this.img.response.id,
        uid: this.uid
      };
    } else {
      post = {
        name: this.equip,
        uid: this.uid
      };
    }

    console.log(post);
    // this.next.emit(1);

    this.templateService.addEpt(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.uid = val.uid;
        console.log(this.uid);
        this.changeUid.emit(this.uid);
        this.next.emit(1);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });

    // this.next.emit(1);


  }

}
