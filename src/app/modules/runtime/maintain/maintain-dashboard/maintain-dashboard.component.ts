import { Component, OnInit } from '@angular/core';

import {DatePipe} from '@angular/common';
import {MaintainService} from '../../../../shared/maintain.service';


@Component({
  selector: 'app-maintain-dashboard',
  templateUrl: './maintain-dashboard.component.html',
  styleUrls: ['./maintain-dashboard.component.css']
})
export class MaintainDashboardComponent implements OnInit {
  public uid;
  public name;
  public maintains;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;

  constructor(private maintainService: MaintainService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.getList();
  }

  getList() {
    /*this.maintains = [
      {
        Uid: 'asdfas3155',
        Name: 'asdfasd',
        Result: true,
        Date: '2018-01-01'
      },
      {
        Uid: 'asdfasasdfasdf',
        Name: '112344',
        Result: true,
        Date: '2018-01-01'
      },
      {
        Uid: 'asdf235543t5',
        Name: '24677',
        Result: true,
        Date: '2018-01-01'
      },
      {
        Uid: 'asdfasdfe5435',
        Name: 'asdfasf',
        Result: false,
        Date: '2018-01-01'
      },
    ];
    this.totalItems = 11;*/

    this.maintainService.getLists(this.page, this.pageSize, this.uid)
      .subscribe(data => {
        this.maintains = data.params;
        this.totalItems = data.counts;
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

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 导出
  export() {
    const that = this;
    this.maintainService.exports(this.uid)
      .subscribe( data => {
        const exportData = data.params;
        const count = data.counts;

        // 导出表格
        let table = `<table><tr>${that.name}</tr><tr><td>上传时间</td><td>创建者</td><td>维保状态</td></tr>`;

        exportData.forEach((record) => {
          const date = this.datePipe.transform(record.CreatedDate, 'yyyy-MM-dd HH:mm:ss');
          const status = record.Status ? '异常' : '正常';
          table += `<tr><td>${date}</td><td>${record.CreatedBy.Name}</td><td>${status}</td>`;
          table += '</tr>';
        });
        table += '</table>';

        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        const html = '<html><head><meta charset=\'utf-8\' /></head><body>' + table + '</body></html>';

        const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

        const fileName = `维保记录-${that.name}.xlsx`;

        if (window.navigator.msSaveOrOpenBlob) { // IE浏览器
          navigator.msSaveOrOpenBlob(blob,  fileName);
        } else { //  其他浏览器
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.setAttribute('style', 'display:none');
          link.setAttribute('href', objectUrl);
          link.setAttribute('download', fileName);
          link.click();
          document.body.removeChild(link);
          // 释放URL地址
          URL.revokeObjectURL(objectUrl);
        }

      });





  }


}
