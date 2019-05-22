import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserAccountService} from '../../../shared/user-account.service';
import Swal from 'sweetalert2';

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

  constructor(public activeModal: NgbActiveModal,
              private userAccountService: UserAccountService) { }

  ngOnInit() {
    // console.log(this.currentData, this.currentUser, this.aroles, this.status);
    this.currentData.aPassword = '';
    this.currentDataCopy = JSON.parse(JSON.stringify(this.currentData));
    // this.currentDataCopy.org = this.currentData.Organization.Uid;
    // console.log(this.currentUser, this.currentData);
  }

  // 编辑
  edit() {
    if (!this.currentDataCopy) {
      return;
    }
    this.editing = true;
  }

  // 取消
  reset() {
    this.editing = false;
    this.currentDataCopy.Name = this.currentData.Name;
    this.currentDataCopy.aPassword = '';
    this.currentDataCopy.resetPassowrd = false;
    this.currentDataCopy.Role__Id = this.currentData.Role__Id;
    this.currentDataCopy.Status = this.currentData.Status;
    // this.currentData.aOrg = this.currentData.Organization ? this.currentData.Organization.Uid : "";
  }

  // 保存
  save() {
    let data = {
      uid: this.currentDataCopy.Uid,
      name: this.currentDataCopy.Name,
      role: parseInt(this.currentDataCopy.Role__Id),
      status: parseInt(this.currentDataCopy.Status),
      // org: this.currentData.Org ? this.currentData.Org.Uid : '',
      password_new: null
    };

    if (this.currentDataCopy.aPassword && this.currentDataCopy.aPassword.length > 0) {
      data.password_new = this.currentDataCopy.aPassword;
    }
    this.userAccountService.saveAccount(data)
      .subscribe(val => {
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

  // 激活
  active() {

  }

  // 删除
  deleteUser() {
    let cf = confirm(`确认删除用户 ${this.currentDataCopy.Username} ？`);
    // this.deleteList.push(this.currentData.Uid);
    if (cf === true) {
      this.userAccountService.deleteAccount([this.currentDataCopy.Uid])
        .subscribe(
          () => {
            Swal(
              '删除成功！',
              '',
              'success'
            );
            this.activeModal.close('ok');
            },
          err => {
            Swal(
              '删除失败！',
              err,
              'error'
            );
        });
    } else {
      console.log('取消');
    }
  }

  // 重置密码
  resetPassword() {
    if (this.currentDataCopy) {
     this.currentDataCopy.resetPassword = true;
    }
  }

}
