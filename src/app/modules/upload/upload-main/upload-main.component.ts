import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {AddFileComponent} from "../add-file/add-file.component";
import {UploadService} from "../../../shared/upload.service";

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.css']
})
export class UploadMainComponent implements OnInit {

  public fileLists = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private modalService: NgbModal,
              private uploadService: UploadService
  ) { }



  ngOnInit() {
  }


  getFiles() {
    this.uploadService.getFiles(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.fileLists = data.parms;
        this.totalItems = data.counts;
      });
  }


  // 批量选择
  checkDel(data): void {
    if ( data.checkDelete === true) {
      this.deleteList.push(data.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        let dl = this.deleteList[i];
        if (dl === data.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.fileLists.length; i++) {
        this.fileLists[i].checkDelete = true;
        this.deleteList.push(this.fileLists[i].Uid);
      }
    } else {
      for (let i = 0; i < this.fileLists.length; i++) {
        this.fileLists[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中文件 ？`);
    /*if (cf === true) {
      this.clusterService.deleteCluster(this.deleteList)
        .subscribe(() => {
          this.pageChange();
        });
    } else {

    }*/
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getFiles();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 添加
  addFile() {
    const modalRef = this.modalService.open(AddFileComponent);
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
