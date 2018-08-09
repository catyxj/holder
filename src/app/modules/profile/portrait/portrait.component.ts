import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {ProfileService} from '../../../shared/profile.service';





@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.css']
})
export class PortraitComponent implements OnInit {


  public imgUrl: any = '' ;
  public img: any;
  public errMes: string;

  constructor(private userService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.imgUrl = user.Picture;
    if ( !this.imgUrl) {
      this.imgUrl = 'assets/images/no_image.png';
    }
  }


  /*getUser() {
    this.userService.getUser()
      .subscribe(user => {
        this.imgUrl = user.Picture;
        if ( !this.imgUrl) {
          this.imgUrl = 'assets/images/no_image.png';
        }
      });
  }*/


  imgChange(event) {
    let that = this;
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    that.img = file;
    const isPNG = file.type;      // === 'image/png';
    const isLt200k = file.size / 1024;
    console.log(isPNG, isLt200k);
    if (!!file && (isPNG === 'image/jpeg' || isPNG === 'image/png' || isPNG === 'image/gif') && isLt200k < 200) {
      let reader = new FileReader();
      // 图片文件转换为base64
      reader.readAsDataURL(file);

      reader.onload = function() {
        // 显示图片
        that.imgUrl = this.result;
        that.errMes = ' ';
        // console.log(that.imgUrl);
      };
    } else {
      that.errMes = '图片格式或大小错误';
    }

  }

  uploadImg(): void {
    this.profileService.updateImg(this.imgUrl)
      .subscribe(res => {
        alert('上传成功');
        this.userService.ChangeMission('changed');
      });


  }


}
