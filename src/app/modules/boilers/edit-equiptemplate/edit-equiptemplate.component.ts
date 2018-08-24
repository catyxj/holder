import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../shared/boiler.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-edit-equiptemplate',
  templateUrl: './edit-equiptemplate.component.html',
  styleUrls: ['./edit-equiptemplate.component.css']
})
export class EditEquiptemplateComponent implements OnInit {

  @Input()
  currentData;

  public name;
  public img1;
  public img2;
  public errMes = '';
  public imgFile1;
  public imgFile2;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private message: NzMessageService) { }

  ngOnInit() {
    // console.log(this.currentData);
    this.name = this.currentData.Name;

    this.img1 = this.currentData.ImageRun ? this.currentData.ImageRun : 'assets/images/no_image.png';
    this.img2 = this.currentData.ImageStop ? this.currentData.ImageStop : 'assets/images/no_image.png';
  }

  //  上传图片
  imgChange1(event) {
    let that = this;
    console.log(event);
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
        console.log(this);
        // 显示图片
        that.img1 = this.result;
        that.errMes = ' ';
        // console.log(img);
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  imgChange2(event) {
    let that = this;
    console.log(event);
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.imgFile2 = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    // console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function() {
        console.log(this);
        // 显示图片
        that.img2 = this.result;
        that.errMes = ' ';
        // console.log(img);
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }


  save() {
    let data = {
      uid: this.currentData.Uid,
      name: this.name,
      imageRun: this.imgFile1 ? this.img1 : '',
      imageStop: this.imgFile2 ? this.img2 : ''
    };
    // console.log(data);
    this.boilerService.editTemplate(data)
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      }, err => {
        // this.message.error(err);
        alert(err);
      });
  }

}
