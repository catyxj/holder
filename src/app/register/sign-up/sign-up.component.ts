import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../shared/register.service';
import {OrganizationService} from "../../shared/organization.service";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
              private orgService: OrganizationService) { }

  ngOnInit() {
    this.getOrgType();
  }

  //  获取企业类型列表
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {
        this.orgTypes = types;
        // console.log(this.orgTypes);
      });
  }

  pComfirm() {
    if (this.password !== this.confirmPass) {
      this.equal = false;
      this.errMess = '确认密码不一致，请重新输入';
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
      type: 'register',
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

    this.registerService.getCode(post)
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
    this.pComfirm();
    const post = {
      org_name: this.orgName,
      org_type: this.orgType,
      telephone: this.phone,
      password: this.password,
      code: this.verifyCode
    };
    this.registerService.signUp(post)
      .subscribe(val => {
        let timerInterval;
        Swal({
            title: '注册成功',
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
            title: '注册失败',
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
