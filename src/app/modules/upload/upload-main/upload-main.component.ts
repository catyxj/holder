import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddFileComponent} from "../add-file/add-file.component";
import {UploadService} from "../../../shared/upload.service";
import Swal from 'sweetalert2';


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
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private uploadService: UploadService
  ) { }



  ngOnInit() {
    this.getFiles();
  }


  getFiles() {
    this.uploadService.getFiles(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.fileLists = data.params;
        this.totalItems = data.counts;
      });
  }

  delete(data) {
    let that = this;
    Swal({
      title: `确定删除 ${data} 吗？`,
      text: '',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定删除！',
    }).then((result) => {
      if (result.value) {
        that.uploadService.deleteFile([data])
          .subscribe( val => {
            Swal(
              '删除成功！',
              '',
              'success'
            );
            that.pageChange();
          }, err => {
            Swal(
              '删除失败！',
              err,
              'error'
            );
          });
      }
    });

  }

  // 批量选择
  checkDel(data): void {
    if ( data.checkDelete === true) {
      this.deleteList.push(data.Name);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        let dl = this.deleteList[i];
        if (dl === data.Name) {
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
        this.deleteList.push(this.fileLists[i].Name);
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
    if (cf === true) {
      this.isLoading = true;
      this.uploadService.deleteFile(this.deleteList)
        .subscribe(() => {
          this.isLoading = false;
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading = false;
          Swal(
            '删除失败！',
            err,
            'error'
          );
        });
    } else {

    }
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
