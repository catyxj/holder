import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../shared/boiler.service";
import {AddEquiptemplateComponent} from "../add-equiptemplate/add-equiptemplate.component";
import {EditEquiptemplateComponent} from "../edit-equiptemplate/edit-equiptemplate.component";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class BoilerTemplatesComponent implements OnInit {

  public templates;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private boilerService: BoilerService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.boilerService.getTemplates()
      .subscribe( data => {
        this.templates = data;
        this.totalItems = this.templates.length;
      });
  }

  // 批量选择
  checkDel(template): void {
    if ( template.checkDelete === true) {
      this.deleteList.push(template.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        let dl = this.deleteList[i];
        if (dl === template.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
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
    const cf = confirm(`确认删除选中设备型态 ？`);
    if (cf === true) {
      console.log(this.deleteList);
      /*this.boilerService.deleteBoiler(this.deleteList)
        .subscribe(() => {
          this.pageChange();
        });*/
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

  // 添加设备型态
  newTemplate() {
    const modalRef = this.modalService.open(AddEquiptemplateComponent, { size: 'lg' });
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 编辑设备型态
  editTemplate(data) {
    const modalRef = this.modalService.open(EditEquiptemplateComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
