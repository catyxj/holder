import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoilerService} from "../../../../../../shared/boiler.service";
import {ClusterService} from "../../../../../../shared/cluster.service";

@Component({
  selector: 'app-clu-add-finish',
  templateUrl: './clu-add-finish.component.html',
  styleUrls: ['./clu-add-finish.component.css']
})
export class CluAddFinishComponent implements OnInit {
  @Output()
  next = new EventEmitter();
  @Input()
  uid;

  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public status = '';
  public run = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];


  constructor(private clusterService: ClusterService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.clusterService.getClusEquipList(this.uid, this.page, this.pageSize, this.search, this.value, this.online, this.run, this.status)
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
    this.isAllChecked = false;
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

  pre() {
    this.next.emit(-1);
  }

  save() {
    this.next.emit(0);
  }


}
