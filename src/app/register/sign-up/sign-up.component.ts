import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterService} from '../../shared/register.service';
import {Router} from "@angular/router";

import Swal from 'sweetalert2';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();


  public orgName;
  public orgType;
  public phone;
  public password;
  public confirmPass;
  public verifyCode;
  public agreement;
  public errMess;
  public getCodeMess = '获取短信验证码';
  public hideBtn = false;
  public equal;
  public orgTypes: any[];

  constructor(private registerService: RegisterService,
              public router: Router) { }

  ngOnInit() {

  }


  pComfirm() {
    if (!this.password) {
      return;
    }
    if (this.password !== this.confirmPass) {
      this.equal = false;
      // this.errMess = '确认密码不一致，请重新输入';
    } else {
      this.equal = true;
      this.errMess = '';
    }
  }

  /*mobileValidator(control: FormControl): any {
    const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const result = mobileReg.test(control.value);
    return result ? null : { mobile: { info: '请输入正确的手机号' } };
  }*/

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
      type: 1,
      telephone: this.phone
    };

    this.registerService.getPhCode(post)
      .subscribe(val => {
        this.hideBtn = true;
        let time = 60;
        this.getCodeMess = `${time}s 后再次获取`;
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
    this.pComfirm();
    const post = {
      telephone: this.phone,
      password: this.password,
      code: this.verifyCode
    };
    this.registerService.signUp(post)
      .subscribe(val => {
        let timerInterval;
        Swal({
            title: '',
            html: '<div class="success_tip"><img src="assets/icons/icon_check.png"> 注册成功!</div>' +
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
            },
            onClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            console.log(result);
            that.goLogin();
            // this.router.navigate(['/login']);
        });
      }, err => {
        let timerInterval;
        Swal({
            title: '',
            html: '<div class="success_tip"> <img src="assets/icons/icon_fail.png"> 注册失败!</div>' +
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


  goLogin() {
    this.toggle.emit();
  }



}
