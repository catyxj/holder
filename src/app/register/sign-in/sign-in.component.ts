import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {VerifyCodeService} from "../../shared/verify-code.service";
import Swal from 'sweetalert2';
import {RegisterService} from "../../shared/register.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public user = { username: '', password: '' , captcha: '', captcha_id: ''};
  public errMes: string ;
  public checkRemember = false;
  public vCode; // 验证码
  public codeImg; // 验证码图片
  public codeRight = false;
  public codeError = false;
  public codeId;

  constructor(public router: Router,
              private registerService: RegisterService,
              private vCodeService: VerifyCodeService) { }

  ngOnInit() {
    this.getCode();

    let getLocal = localStorage.getItem('holderUser');
    if (getLocal) {
      this.user.username = getLocal;
      this.checkRemember = true;
    } else {

    }
  }


  // 登录
  login(): void {
    let that = this;
    this.user.captcha = this.vCode;
    this.user.captcha_id = this.codeId;

    // console.log(this.user);
    if (this.checkRemember === true) {
      localStorage.setItem('holderUser', this.user.username);
    } else {
      localStorage.removeItem('holderUser');
    }

    this.registerService.login(this.user)
      .subscribe(
        res => {
          localStorage.setItem('user', 'true');
          localStorage.setItem('authToken', res.Auth);
          localStorage.setItem('roleId', res.roleId);


          let timerInterval;
          Swal({
            title: '',
            html: '<div class="success_tip"><img src="assets/icons/icon_check.png"> 登录成功!</div>' +
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
                that.goAdmin();
              });
            },
            onClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            that.goAdmin();
          });

          // this.router.navigate(['/admin/ad']);
        }, // success path
        error => {
          that.errMes = error.message;
          that.getCode();
          let timerInterval;
          Swal({
            title: '',
            html: '<div class="success_tip"> <img src="assets/icons/icon_fail.png"> 登录失败!</div>' +
            `<div class="success_tip_mes"> ${error.message || error} </div> <div class="success_tip_time"><a><span>3</span>秒后自动关闭</a></div>`,
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

          });
        } // error path
      );
  }


  // 获取验证码图片
  getCode() {
    this.vCodeService.getCodeId()
      .subscribe( data => {
        this.codeId = data.CaptchaID;
        this.codeImg = `/api/login/captcha?id=${this.codeId}`;
      }, err => {

      });
  }

  // 刷新验证码图片
  reloadCode() {
    this.codeImg = `/api/login/captcha?id=${this.codeId}&reload=true?${Math.random()}`;
  }



  goAdmin() {
    let roleId = localStorage.getItem('roleId');
    console.log(roleId);
    switch (roleId) {
      case '1':
        this.router.navigate(['/admin/ad']);
        break;
      case '10':
      case '11':
        this.router.navigate(['/admin/ordinary']);
        break;
      case '15':
        this.router.navigate(['/admin/service']);
        break;
      default:
        this.router.navigate(['/admin']);
    }



  }

  /*verify(vCode) {
    let that = this;
    if (vCode.length === 4) {
      let post = {
        captcha: vCode,
        captcha_id: this.codeId
      };
      this.vCodeService.sendCode(post)
        .subscribe( val => {
          if (val.checkResult === true) {
            this.codeRight = true;
            this.codeError = false;
          } else {
            this.codeRight = false;
            this.codeError = true;
          }
        }, err => {
          this.codeRight = false;
          this.codeError = true;
          this.getCode();
        });
    } else {
      this.codeRight = false;
      if (vCode.length > 4) {
        this.codeError = true;
      } else {
        this.codeError = false;
      }
    }
  }*/

  // 记住用户名
  /*remember() {
    console.log(this.checkRemember);
  }*/

  /*forgetPwd() {}

  getConfig(): any {
    const IP_JSON_URL = 'https://ipv4.myexternalip.com/json';
    return this.http.get(IP_JSON_URL);
  }*/

}
