import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import {VerifyCodeService} from "../shared/verify-code.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = { username: '', password: '' , ip: ''};
  public errMes: string ;
  public checkRemember = false;
  public vCode; // 验证码
  public codeImg; // 验证码图片
  public codeRight = false;
  public codeError = false;
  public codeId;


  constructor(public router: Router,
              private userService: UserService,
              private vCodeService: VerifyCodeService,
              private http: HttpClient) { }

  ngOnInit() {

    this.getConfig()
      .subscribe(ipInfo => {this.user.ip = ipInfo.ip; });

    this.getCode();

    let getLocal = localStorage.getItem('holderUser');
    if (getLocal) {
      this.user.username = getLocal;
      this.checkRemember = true;
    } else {

    }

  }

  forgetPwd() {}

  getConfig(): any {
    const IP_JSON_URL = 'https://ipv4.myexternalip.com/json';
    return this.http.get(IP_JSON_URL);
  }

  login(): void {
    // console.log(this.user);
    if (this.checkRemember === true) {
      localStorage.setItem('holderUser', this.user.username);
    } else {
      localStorage.removeItem('holderUser');
    }

    this.userService.login(this.user)
      .subscribe(
        user => {
          this.user = user;
          sessionStorage.user = true;
          this.router.navigate(['/admin']);
          }, // success path
        error => this.errMes = error // error path
         );
  }

  // 获取验证码图片
  getCode() {
    this.vCodeService.getCode()
      .subscribe( data => {
        this.codeImg = data.img;
        this.codeId = data.captchaId;
      }, err => {

      });
  }

  verify(vCode) {
    if (vCode.length === 4) {
      let post = {
        captcha: vCode,
        captchaId: this.codeId
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
        });
    } else {
      this.codeRight = false;
      if (vCode.length > 0) {
        this.codeError = true;
      } else {
        this.codeError = false;
      }
    }
  }

  // 记住用户名
  /*remember() {
    console.log(this.checkRemember);
  }*/


}
