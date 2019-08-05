import {Component, Input, OnInit} from '@angular/core';
import {UserAccountService} from '../../../shared/user-account.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  @Input()
  currentData: any;
  currentUser: any;

  public data: any;
  public isValid: boolean;
  public roles: any[];
  public aroles = [];

  constructor( private userAccountService: UserAccountService,
               public activeModal: NgbActiveModal,
               private orgService: OrganizationService) { }

  ngOnInit() {
    this.getUserRoles();
    this.data = {
      username: '',
      password: '',
      fullname: '',
      role: 0,
      org: this.currentData
    };
  }


  // 获取用户角色
  getUserRoles(): void {
    this.userAccountService.getUserRoles()
      .subscribe(roles => {
        this.roles = roles;
        // console.log(this.roles);
        for ( let i = 0; i < this.roles.length; i++) {
          let d = this.roles[i];
          if (d.RoleId > this.currentUser.Role.RoleId) {
            this.aroles.push({ id: d.RoleId, name: d.Name });
          }
        }
        console.log(this.aroles);
      });
  }


  dataChanged () {
    if (this.data.username.length < 6 || this.data.username.length > 16 ||
      this.data.password.length < 6 || this.data.username.length > 16 ||
      !this.data.role ||
      this.data.role <= this.currentUser.Role.RoleId ||
      (this.data.role > 1 && !this.data.org)) {
        this.isValid = false;
        return;
      }
      this.isValid = true;
    }


  //  提交
  commit() {
    let data = {
      username: this.data.username,
      password: this.data.password,
      fullname: this.data.fullname,
      role: parseInt(this.data.role),
      org: this.data.org.Uid,
    };

    this.userAccountService.addAccount(data)
      .subscribe(account => {
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


  cancel() {
    this.activeModal.dismiss('close');
  }

}
