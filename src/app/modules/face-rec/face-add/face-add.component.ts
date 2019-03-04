import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FaceService} from "../../../shared/face.service";
import Swal from 'sweetalert2';
import {UserAccountService} from "../../../shared/user-account.service";


@Component({
  selector: 'app-face-add',
  templateUrl: './face-add.component.html',
  styleUrls: ['./face-add.component.css']
})
export class FaceAddComponent implements OnInit {
  public account;
  public name;
  public sex;
  public type;
  public phone;
  public sexList = [{id: 1, name: '男'}, {id: 2, name: '女'}];
  public typeList = [{id: 1, name: '普通用户'}, {id: 2, name: 'VIP用户'}];
  public accountList = [];
  public imgUrl: any = '' ;
  public img: any;
  public errMes = '';

  constructor(public activeModal: NgbActiveModal,
              private faceService: FaceService,
              private accountService: UserAccountService) { }

  ngOnInit() {
    this.imgUrl = 'assets/images/no_image.png';
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccountAll()
      .subscribe( data => {
        this.accountList = data;
      });

    /*this.accountList = [
      {
        Uid: 'asdfasf',
        Name: 'asdfasdfasf'
      },
      {
        Uid: 'asdfasdfsadasf',
        Name: 'asdfasdfasfw3qer32'
      }
    ];*/

  }


  //  上传图片
  imgChange(event) {
    const that = this;
    if (!event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];
    that.img = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' ) && isLt200k < 1024) {
      const reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function() {
        // 显示图片
        that.imgUrl = this.result;
        that.errMes = ' ';
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  save() {
    const data = {
      userUid: this.account,
      name: this.name,
      sex: parseInt(this.sex),
      type: parseInt(this.type),
      telephone: this.phone,
      image: this.imgUrl
    };
    this.faceService.addData(data)
      .subscribe(val => {
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
