import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../shared/register.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  public phone;
  public verifyCode;
  public password;
  public errMess;
  public getCodeMess = '获取短信验证码';
  public hideBtn = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }


  getCode() {
    if (!this.phone || this.phone.length !== 11) {
      Swal(
        '请输入11位手机号',
        '',
        'info'
      );
      return;
    }

    const post = {
      type: 2,
      telephone: this.phone
    };

    this.hideBtn = true;
    let time = 60;
    this.getCodeMess = `倒计时(${time}s)`;
    const interval = setInterval(() => {
      time--;
      if (time >= 0) {
        this.getCodeMess = `倒计时(${time}s)`;
      } else {
        clearInterval(interval);
        this.hideBtn = false;
        this.getCodeMess = '获取短信验证码';
      }
    }, 1000);

    this.registerService.getPhCode(post)
      .subscribe(val => {
        Swal(
          {
            title: '信息发送成功',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          }
        );
      }, err => {
        Swal(
          {
            title: '信息发送失败',
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          }
        );
      });
  }

  submit() {
    const post = {
      telephone: this.phone,
      password: this.password,
      sms_code: this.verifyCode
    };
    this.registerService.recoverPass(post)
      .subscribe(val => {
        let timerInterval;
        Swal({
          title: '密码重置成功',
          html: '<span></span>秒后自动关闭',
          showConfirmButton: false,
          timer: 3000,
          onBeforeOpen: () => {
            let seconds = 3;
            timerInterval = setInterval(() => {
              seconds--;
              Swal.getContent().querySelector('span')
                .textContent = '' + seconds;
            }, 1000);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          console.log(result);
        });
      }, err => {
        let timerInterval;
        Swal({
          title: '密码重置失败',
          html: `<div>提示信息：${err}</div><div style="color: #00a4ff;"><span>3</span>秒后自动关闭</div>`,
          showConfirmButton: false,
          timer: 3000,
          onBeforeOpen: () => {
            let seconds = 3;
            timerInterval = setInterval(() => {
              seconds--;
              Swal.getContent().querySelector('span')
                .textContent = '' + seconds;
            }, 1000);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          console.log(result);
        });
      });

  }

}
