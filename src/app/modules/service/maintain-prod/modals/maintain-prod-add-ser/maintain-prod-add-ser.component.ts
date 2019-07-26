import { Component, OnInit } from '@angular/core';
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

  public dataList = [
    {
      description: '通风口是否正常',
      status: false,
      remark: '',
      imgList: []
    },
    {
      description: '点火器是否正常',
      status: false,
      remark: '',
      imgList: []
    },
    {
      description: '排风机是否正常',
      status: false,
      remark: '',
      imgList: []
    },
    {
      description: '风口是否干净',
      status: false,
      remark: '',
      imgList: []
    },
    {
      description: '炉排速度是否正常',
      status: false,
      remark: '',
      imgList: []
    }
  ];

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;


  constructor(public activeModal: NgbActiveModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
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
    /*this.maintainService.addData(post)
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
      });*/
  }

}
