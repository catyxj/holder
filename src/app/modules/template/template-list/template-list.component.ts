import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateService} from "../../../shared/template.service";

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

  constructor(private modalService: NgbModal,
              private templateService: TemplateService) { }

  ngOnInit() {
    this.getTemplates();
  }


  // 获取集群列表
  getTemplates() {
    this.templateService.getTemplates(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.templates = data.params;
        this.totalItems = data.counts;
      });
  }

  // 删除
  delete(uid, name) {
    let cf = confirm(`确定删除模板[${name}]？`);
    if (cf === true) {
      this.templateService.deleteTemplate([uid])
        .subscribe( () => {
          this.pageChange();
        });
    }
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
          this.pageChange();
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