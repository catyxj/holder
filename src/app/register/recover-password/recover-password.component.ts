import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../shared/register.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

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

  constructor(private registerService: RegisterService,
              public router: Router) { }

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



    this.registerService.getPhCode(post)
      .subscribe(val => {
        this.hideBtn = true;
        let time = 60;
        this.getCodeMess = `${time}s后再次获取`;
        const interval = setInterval(() => {
          time--;
          if (time >= 0) {
            this.getCodeMess = `${time}s后再次获取`;
          } else {
            clearInterval(interval);
            this.hideBtn = false;
            this.getCodeMess = '获取短信验证码';
          }
        }, 1000);
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
            title: err.message || err,
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          }
        );
      });
  }

  submit() {
    let that = this;
    const post = {
      telephone: this.phone,
      password: this.password,
      sms_code: this.verifyCode
    };
    this.registerService.recoverPass(post)
      .subscribe(val => {
        let timerInterval;
        Swal({
          title: '',
          html: '<div class="success_tip"><img src="assets/icons/icon_check.png"> 密码重置成功!</div>' +
          ' <div class="success_tip_time">正在跳转， <span>3</span>秒后自动关闭</div>',
          showConfirmButton: false,
          timer: 3000,
          onBeforeOpen: () => {
            let seconds = 3;
            timerInterval = setInterval(() => {
              seconds--;
              if (seconds <= 0) {
                clearInterval(timerInterval);
              }
              Swal.getContent().querySelector('span')
                .textContent = '' + seconds;
            }, 1000);
            Swal.getContent().querySelector('.success_tip_time').addEventListener('click', () => {
              clearInterval(timerInterval);
              Swal.close();
              that.router.navigate(['/login']);
            });
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          console.log(result);
          this.router.navigate(['/login']);
        });
      }, err => {
        let timerInterval;
        Swal({
          title: '',
          html: '<div class="success_tip"> <img src="assets/icons/icon_fail.png"> 密码重置失败!</div>' +
          `<div class="success_tip_mes"> ${err.message || err} </div> <div class="success_tip_time"><a><span>3</span>秒后自动关闭</a></div>`,
          showConfirmButton: false,
          timer: 3000,
          onBeforeOpen: () => {
            let seconds = 3;
            timerInterval = setInterval(() => {
              seconds--;
              if (seconds <= 0) {
                clearInterval(timerInterval);
              }
              Swal.getContent().querySelector('span')
                .textContent = '' + seconds;
            }, 1000);
            Swal.getContent().querySelector('.success_tip_time').addEventListener('click', () => {
              clearInterval(timerInterval);
              Swal.close();
            });
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
