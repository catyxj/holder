import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../shared/boiler.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-equiptemplate',
  templateUrl: './add-equiptemplate.component.html',
  styleUrls: ['./add-equiptemplate.component.css']
})
export class AddEquiptemplateComponent implements OnInit {

  public name = '';
  public img1;
  public img2;
  public errMes = '';
  public imgFile1;
  public imgFile2;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService) { }

  ngOnInit() {
    this.img1 = 'assets/images/no_image.png';
    this.img2 = 'assets/images/no_image.png';
  }

//  上传图片
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
        // console.log(this);
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
    // console.log(event);
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
        // console.log(this);
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
      name: this.name,
      imageRun: this.imgFile1 ? this.img1 : '',
      imageStop: this.imgFile2 ? this.img2 : ''
    };
    // console.log(data);
    this.boilerService.addTemplate(data)
      .subscribe( val => {
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
