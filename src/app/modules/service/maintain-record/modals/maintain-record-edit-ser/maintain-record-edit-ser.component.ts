import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../../shared/maintain.service";
import {UploadFile} from "ng-zorro-antd/upload";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintain-record-edit-ser',
  templateUrl: './maintain-record-edit-ser.component.html',
  styleUrls: ['./maintain-record-edit-ser.component.css']
})
export class MaintainRecordEditSerComponent implements OnInit {
  @Input()
  uid;


  public dataList = [];
  public termCode;
  public name;
  public tempLabel;
  public tempName;
  public headOption;

  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(public activeModal: NgbActiveModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };

    this.getInfo();

  }

  getInfo() {
    this.dataList = [
      {
        name: '通风口是否正常',
        result: 'false',
        remark: '',
        imgList: [
          {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          }
        ]
      },
      {
        name: '点火器是否正常',
        result: 'false',
        remark: '',
        imgList: []
      },
      {
        name: '排风机是否正常',
        result: 'false',
        remark: '',
        imgList: []
      },
      {
        name: '风口是否干净',
        result: 'false',
        remark: '',
        imgList: []
      },
      {
        description: '炉排速度是否正常',
        result: 'false',
        remark: '',
        imgList: []
      }
    ];

    this.maintainService.getLogInfo(this.uid)
      .subscribe(data => {
        this.termCode = data.terminal_code;
        this.name = data.ept_name;
        this.tempLabel = data.template_label;
        this.tempName = data.template_name;

        this.dataList = [];
        let info = data.info;
        for (let i = 0; i < info.length; i++) {
          let imgList = [];
          for (let j = 0; j < info[i].img.length; j++) {
            let im = info[i].img[j];
            imgList.push({
              uid: im.id,
              name: im.name,
              status: 'done',
              url: im.oss_path
            });
          }
          this.dataList.push({
            name: info[i].name,
            result: info[i].result,
            remark: info[i].remark,
            imgList: imgList
          });

        }

      }, err => {

      });

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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Swal(
        '图片大小不能超过2M',
        '',
        'error'
      );
      return false;
    }
    return true;
  }

  handleChange(info: { file: UploadFile }): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
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


  // 缩略图
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }



  save() {
    console.log(this.dataList);


    let that = this;
    let post = {

    };
    this.maintainService.addData(post)
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
