import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../shared/profile.service';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  public profile = {
    password: '' ,
    password_new: '',
    password_new_confirm: ''
  };

  constructor(private profileService: ProfileService,
              private message: NzMessageService) { }

  ngOnInit() {
  }

  updateUserPassword(): void {
    this.profileService.changePassword({password: this.profile.password, password_new: this.profile.password_new})
      .subscribe(password => {
        this.message.success('修改成功');
      }, err => {
        this.message.error(err);
      });
  }

}
