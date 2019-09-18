import { Component, OnInit } from '@angular/core';
import {UserListService} from "../../../../shared/user-list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail-formal',
  templateUrl: './user-detail-formal.component.html',
  styleUrls: ['./user-detail-formal.component.css']
})
export class UserDetailFormalComponent implements OnInit {
  public uid;
  public info;
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public status = '';
  public online = '';
  public run = '';
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  public listPage;

  constructor(private usersService: UserListService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    this.getInfo();
    this.getList();
  }

  getInfo() {

    // this.info = {"address":"","email":"zhangsan@124.com","name":"zd","org_name":"测试企业","org_tag":1,"username":"17855846864","location_name":"浙江省宁波市鄞州区南部商务区1号"};

    this.usersService.getBasic(this.uid)
      .subscribe(data => {
        this.info = data;
      }, err => {

      });
  }

  // 获取列表
  getList() {
    /*let tdata = {"count":2,"data":[{"location_name":"","name":"cc锅炉","online":true,"run":4,"status":2,"terminal_code":"685257","uid":"4b3941e8-b3fb-11e9-a701-7cd30abeae02","use_org":"测试企业","use_username":"17855846864"},{"location_name":"","name":"aaa锅炉","online":false,"run":0,"status":1,"terminal_code":"685272","uid":"4ee34a9b-b2ac-11e9-a701-7cd30abeae02","use_org":"测试企业","use_username":"17855846864"}]};
    this.dataLists = tdata.data;
    this.totalItems = tdata.count;*/


    this.loading = true;
    this.usersService.getEptLists(this.uid, this.page, this.pageSize, this.search, this.value, this.online, this.run, this.status)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
      }, err => {
        this.loading = false;
      });
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getList();
  }

  // 页码跳转
  goPage() {
    let totalPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.pageNum > totalPage) {
      return;
    }
    this.page = this.pageNum;
    this.pageChange();
  }

  // 搜索
  searchChange() {
    console.log(this.search);
    this.page = 1;
    this.pageChange();
  }
  searchEnter(event) {
    if (event.keyCode === 13) {
      this.searchChange();
    }
  }

  searchOnline(n?) {
    this.online = n;
    this.searchChange();
  }
  searchRun(n?) {
    this.run = n;
    this.searchChange();
  }
  searchStatus(n?) {
    this.status = n;
    this.searchChange();
  }





}
