import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../../shared/maintain.service";
import {UploadFile} from "ng-zorro-antd/upload";

import Swal from 'sweetalert2';



@Component({
  selector: 'app-maintain-prod-add-ser',
  templateUrl: './maintain-prod-add-ser.component.html',
  styleUrls: ['./maintain-prod-add-ser.component.css']
})
export class MaintainProdAddSerComponent implements OnInit {
  // public img;
  // public imgUrl;
  @Input()
  uid;

  public dataList = [];
  public termCode;
  public name;
  public tempLabel;
  public tempName;
  public headOption;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  public currentFile;


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
    /*this.dataList = [
      {
        name: '通风口是否正常',
        result: 'false',
        remark: '',
        imgList: []
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
      }
    ];*/

    this.maintainService.getProdInfo(this.uid)
      .subscribe(data => {
          this.termCode = data.terminal_code;
          this.name = data.name;
          this.tempLabel = data.template_label;
          this.tempName = data.template_name;

          this.dataList = [];
          let info = data.info;
          for (let i = 0; i < info.length; i++) {
            this.dataList.push({
              name: info[i],
              result: 'false',
              remark: '',
              imgList: []
            });
          }


      }, err => {

      });

  }


  //  上传图片
  /*imgChange(event) {
    let that = this;
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];


    const formData = new FormData();
    // formData.append('org', this.org);
    formData.set('file', file);



    that.img = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function() {
        // 显示图片
        that.imgUrl = this.result;
        // console.log(that.imgUrl);
      };
    } else {
      console.log('图片格式或大小错误');
    }

  }*/

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
    const isLt2M = file.size / 1024 < 200;
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
    console.log(file);
    this.previewImage = file.url || file.thumbUrl;
    this.currentFile = file;
    this.previewVisible = true;
  }

  deleteImg() {

  }




  save() {
    console.log(this.dataList);

    let that = this;
    let info = [];
    for (let i = 0; i < this.dataList.length; i++) {
      let da = this.dataList[i];
      let img = [];
      for (let j = 0; j < da.imgList.length; j++) {
        let im = da.imgList[j];
        if (im.status === 'done') {
          img.push(im.response.id.toString());
        }
      }
      info.push({
        name: da.name,
        result: da.result === 'true',
        remark: da.remark,
        img: img
      });
    }

    let post = {
      template_name:  this.tempName,
      template_label: this.tempLabel,
      ept_id: this.uid,
      ept_name: this.name,
      terminal_code: this.termCode,
      info: info
    };
    this.maintainService.addProdData(post)
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
