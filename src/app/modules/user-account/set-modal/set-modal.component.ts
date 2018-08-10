import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserAccountService} from '../../../shared/user-account.service';

@Component({
  selector: 'app-set-modal',
  templateUrl: './set-modal.component.html',
  styleUrls: ['./set-modal.component.css']
})
export class SetModalComponent implements OnInit {

  @Input() currentData: any;
  currentUser: any;
  aroles: any;
  status: any;

  currentDataCopy: any;
  deleteList: string[] = [];

  editing = false;

  constructor(public activeModal: NgbActiveModal, private userAccountService: UserAccountService ) { }

  ngOnInit() {
    this.currentData.aPassword = '';
    this.currentDataCopy = {
      name : this.currentData.Name,
      role: this.currentData.Role.RoleId,
      status : this.currentData.Status
  };
    // this.currentDataCopy.org = this.currentData.Organization.Uid;
    // console.log(this.currentUser, this.currentData);
  }

  // 编辑
  edit() {
    if (!this.currentData) {
      return;
    }
    this.editing = true;
  }

  // 取消
  reset() {
    this.editing = false;
    this.currentData.Name = this.currentDataCopy.name;
    this.currentData.aPassword = '';
    this.currentData.resetPassowrd = false;
    this.currentData.Role.RoleId = this.currentDataCopy.role;
    this.currentData.Status = this.currentDataCopy.status;
    // this.currentData.aOrg = this.currentData.Organization ? this.currentData.Organization.Uid : "";
  }

  // 保存
  save() {
    let data = {
      uid: this.currentData.Uid,
      fullname: this.currentData.Name,
      role: parseInt(this.currentData.Role.RoleId),
      stat: parseInt(this.currentData.Status),
      org: this.currentData.Organization ? this.currentData.Organization.Uid : '',
      password_new: null
    };

    if (this.currentData.aPassword && this.currentData.aPassword.length > 0) {
      data.password_new = this.currentData.aPassword;
    }
    this.userAccountService.saveAccount(data)
      .subscribe(account => {alert('保存成功'); this.activeModal.close('ok'); });
  }

  // 激活
  active() {

  }

  // 删除
  deleteUser() {
    let cf = confirm(`确认删除用户 ${this.currentData.Username} ？`);
    // this.deleteList.push(this.currentData.Uid);
    if (cf === true) {
      this.userAccountService.deleteAccount([this.currentData.Uid])
        .subscribe(() => {this.activeModal.close('ok'); });
    } else {
      console.log('取消');
    }
  }

  // 重置密码
  resetPassword() {
    if (this.currentData) {
     this.currentData.resetPassword = true;
    }
  }

}
