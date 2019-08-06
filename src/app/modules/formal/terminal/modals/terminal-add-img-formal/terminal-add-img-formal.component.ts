import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-terminal-add-img-formal',
  templateUrl: './terminal-add-img-formal.component.html',
  styleUrls: ['./terminal-add-img-formal.component.css']
})
export class TerminalAddImgFormalComponent implements OnInit {
  // @Input() title: string;
  // @Input() subtitle: string;

  public name; // 组件名称
  public type = '1'; // 组件类型
  public chan; // 通道
  public img; // 单形态图片
  public imgs; // 多形态图片列表
  public imgFile1;
  public imgFiles = [];
  public errMes;
  public isValid = true;

  constructor(private modal: NzModalRef) { }

  ngOnInit() {
    this.img = 'assets/images/photo.png';
    this.imgs = [
      {
        num: 1,
        imgUrl: 'assets/images/photo.png',
        min: 0,
        max: 0,
      },
      {
        num: 2,
        imgUrl: 'assets/images/photo.png',
        min: 0,
        max: 0,
      }
    ];
  }

  typeChange(type) {
    if (type === '1') {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }


  // ------------图片上传------------
  imgChange1(event) {
    let that = this;
    // console.log(event);
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.imgFile1 = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 显示图片
        that.img = this.result;
        that.errMes = ' ';
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  imgChange2(event, n) {
    let that = this;
    // console.log(event);
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.imgFiles[n] = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 显示图片
        that.imgs[n].imgUrl = this.result;
        that.errMes = ' ';
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  // 区间验证
  checkNumber() {

    if (this.imgs[0].min > this.imgs[0].max || this.imgs[1].min > this.imgs[1].max) {
      this.isValid = false;
      this.errMes = '范围需后者大于前者';
      return;
    }
    if (this.imgs[1].min <= this.imgs[0].max ) {
      this.isValid = false;
      this.errMes = '第二个图片范围必须大于第一个';
      return;
    }

    this.isValid = true;
    this.errMes = '配置正确';
  }

}
