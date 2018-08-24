import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {OrganizationService} from '../../../shared/organization.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditInfoComponent} from '../edit-info/edit-info.component';
import {AddAccountComponent} from '../add-account/add-account.component';
import {Router} from '@angular/router';
import {AdressService} from '../../../shared/adress.service';
import {AddInfoComponent} from '../add-info/add-info.component';

@Component({
  selector: 'app-org-main',
  templateUrl: './org-main.component.html',
  styleUrls: ['./org-main.component.css'],
  providers: [
    EditInfoComponent,
    AddAccountComponent,
    AddInfoComponent
  ]
})
export class OrgMainComponent implements OnInit {

  user: any = {};
  page = 1;
  totalItems = 0;
  organizations: any[];
  search: string;
  deleteList = [];
  allDelete = false;
  locations: any;
  pageSize = 10;

  constructor(private userService: UserService,
              private orgService: OrganizationService,
              private modalService: NgbModal,
              private router: Router,
              private addrService: AdressService) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    // this.getUser();
    this.getOrganization();
    this.getAddr();
  }


  // 获取用户信息
  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  // 获取企业信息
  getOrganization(): void {
    this.orgService.getOrganization(this.page, this.pageSize, this.search)
      .subscribe(organization => {
        this.totalItems = organization.counts;
        this.organizations = organization.params;
        if (this.organizations.length <= 0) {
          return;
        }
        for (let i = 0; i < this.organizations.length; i++) {
          let org = this.organizations[i];
          org.checkDelete = false;
        }

        // console.log(this.organizations);
      });
  }


  // 获取地址
  getAddr() {
    this.addrService.getAddress()
      .subscribe(addr => {
        this.locations = addr;
      });
  }


  // 删除
  deleteO(org) {
    const cf = confirm(`确认删除企业 ${org.Name} ？`);
    if (cf === true) {
      this.orgService.deleteOrg([org.Uid])
        .subscribe( val => {
          // alert('删除成功');
          this.getOrganization();
        }, err => {
          alert(err);
        });

    } else {

    }

  }

  // 批量选择
  checkDel(org): void {
    if ( org.checkDelete === true) {
      this.deleteList.push(org.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === org.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.organizations.length; i++) {
        this.organizations[i].checkDelete = true;
        this.deleteList.push(this.organizations[i].Uid);
      }
    } else {
      for (let i = 0; i < this.organizations.length; i++) {
        this.organizations[i].checkDelete = false;
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中企业 ？`);
    if (cf === true) {
      this.orgService.deleteOrg(this.deleteList)
        .subscribe( () => {
          this.pageChange();
        }, err => {
          alert(err);
        });
    } else {

    }

    // console.log(this.deleteList);
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getOrganization();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 编辑模态框
  edit(org) {
    const modalRef = this.modalService.open(EditInfoComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = org;
    modalRef.componentInstance.currentUser = this.user;
    modalRef.componentInstance.editing = true;
    // modalRef.componentInstance.locations = this.locations;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.getOrganization();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 查看模态框
  view(org) {
    const modalRef = this.modalService.open(EditInfoComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = org;
    modalRef.componentInstance.currentUser = this.user;
    modalRef.componentInstance.editing = false;
    // modalRef.componentInstance.locations = this.locations;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getOrganization();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 新增企业模态框
  newOrg() {
    const modalRef = this.modalService.open(AddInfoComponent, { size: 'lg' });
    modalRef.componentInstance.currentUser = this.user;
    modalRef.componentInstance.editing = true;
    // modalRef.componentInstance.locations = this.locations;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.getOrganization();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 添加账号模态框
  addAccount(org) {
    const modalRef = this.modalService.open(AddAccountComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = org;
    modalRef.componentInstance.currentUser = this.user;

    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
          // this.getOrganization();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 进入下级账号
  entry(org) {
    this.orgService.entryAccount(org.Uid)
      .subscribe( data => {
        window.location.reload();
      }, err => {
        alert(err);
      });
  }



  goAccount(name) {
    this.router.navigate(['/admin/user-account', { name: name}]);
  }





}
