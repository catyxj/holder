import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateService} from "../../../shared/template.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  public templates;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;

  constructor(private modalService: NgbModal,
              private templateService: TemplateService) { }

  ngOnInit() {

    this.getTemplates();
  }


  // 获取集群列表
  getTemplates() {
    this.isSpinning = true;
    this.templateService.getTemplates(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.isSpinning = false;
        this.templates = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  // 删除
  delete(uid, name) {

    let that = this;
    Swal({
      title: `确定删除模板[${name}]？`,
      text: '',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定删除！',
    }).then((result) => {
      if (result.value) {
        that.templateService.deleteTemplate([uid])
          .subscribe( () => {
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
      for (let i = 0; i < this.templates.length; i++) {
        this.templates[i].checkDelete = true;
        this.deleteList.push(this.templates[i].Uid);
      }
    } else {
      for (let i = 0; i < this.templates.length; i++) {
        this.templates[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中模板 ？`);
    if (cf === true) {
      this.templateService.deleteTemplate(this.deleteList)
        .subscribe(() => {
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          Swal(
            '删除失败！',
            err,
            'error'
          );
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
    this.getTemplates();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


}
