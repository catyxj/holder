import {Component, Input, OnInit} from '@angular/core';
import {UserAccountService} from '../../../shared/user-account.service';
import {UserService} from '../../../shared/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SetModalComponent} from '../set-modal/set-modal.component';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css'],
  providers: [
    SetModalComponent
  ]
})
export class UserMainComponent implements OnInit {

  roles: any[];
  user: any = {};
  aroles: any[] = [];
  accounts: any[];
  page = 1;
  totalItems = 0;
  status = [
    {id: 0, name: '未激活', hidden: true},
    {id: 1, name: '通常'},
    {id: 2, name: '禁用'}
  ];
  search: string;
  deleteList = [];
  allDelete = false;
  pageSize = 10;

  constructor(private userAccountService: UserAccountService,
              private userService: UserService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getUser();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.log('param', params.get('name'));
       this.search = params.get('name');
       return (params.get('name') || []);
      })
    ).subscribe( );
    this.getUserAccount();
  }


  // 获取用户信息
  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.getUserRoles();
      });
  }

  // 获取用户角色
  getUserRoles(): void {
    this.userAccountService.getUserRoles()
      .subscribe(roles => {
        this.roles = roles;
        // console.log(this.roles);
        for ( let i = 0; i < this.roles.length; i++) {
          let d = this.roles[i];
          if (d.RoleId > this.user.Role.RoleId) {
            this.aroles.push({ id: d.RoleId, name: d.Name });
          }
        }
        // console.log(this.aroles);
      });
  }

  // 获取账号信息
  getUserAccount(): void {
    this.userAccountService.getAccounts(this.page, this.pageSize, this.search)
      .subscribe(account => {
        this.accounts = account.params;
        for (let i = 0; i < this.accounts.length; i++) {
          let acc = this.accounts[i];
          acc.stat = this.status[acc.Status];
          acc.checkDelete = false;
        }
        this.totalItems = account.counts;
        // console.log(this.page, this.search);
      });
  }

  // 批量选择
  checkDel(account): void {
    if ( account.checkDelete === true) {
      this.deleteList.push(account.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === account.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.accounts.length; i++) {
        this.accounts[i].checkDelete = true;
        this.deleteList.push(this.accounts[i].Uid);
      }
    } else {
      for (let i = 0; i < this.accounts.length; i++) {
        this.accounts[i].checkDelete = false;
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    this.userAccountService.deleteAccount({uids: this.deleteList})
      .subscribe(() => {this.getUserAccount(); });
    // console.log(this.deleteList);
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getUserAccount();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 打开设置模态框
  open(accout) {
    const modalRef = this.modalService.open(SetModalComponent);
    modalRef.componentInstance.currentData = accout;
    modalRef.componentInstance.currentUser = this.user;
    modalRef.componentInstance.aroles = this.aroles;
    modalRef.componentInstance.status = this.status;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.getUserAccount();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 添加
  /*new() {
    const modalRef = this.modalService.open(AddAccountComponent, { windowClass: 'dark-modal', size: 'lg' });
    modalRef.componentInstance.aroles = this.aroles;
  }*/

}


