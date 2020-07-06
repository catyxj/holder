import { Component, OnInit } from '@angular/core';
import {RuntimeService} from '../../../shared/runtime.service';
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

@Component({
  selector: 'app-history-analysis',
  templateUrl: './history-analysis.component.html',
  styleUrls: ['./history-analysis.component.css']
})
export class HistoryAnalysisComponent implements OnInit {
  public page = 1;
  public pageSize = 10;
  public totalItems = 0;
  private uid;
  public name;
  public dataList = [];
  public isSpinning = false;
  public newPage;

  constructor(private runtimeService: RuntimeService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');

    this.getData();
  }

  getData() {
    this.isSpinning = true;
    this.runtimeService.getAnalysis(this.page, this.pageSize, this.uid)
      .subscribe( data => {
        this.isSpinning = false;
        this.dataList = data.data;
        this.totalItems = data.count;
      }, err => {
        this.isSpinning = false;
      });

    /*this.dataList = [
      {
        date: '2020-5-5',
        data: '111'
      },
      {
        date: '2020-5-6',
        data: '111'
      }
    ];
    this.totalItems = 11;*/

  }



  export() {

    this.runtimeService.getAnalysisExport(this.uid)
      .subscribe( data => {
        // let totalItems = data.counts;
        let lists = data.data;

        // 导出表格

        let table = `<table><tr><td>设备：</td><td>${this.name}</td></tr><tr><td>时间</td><td>运行时长(小时)</td><td>启炉次数(次)</td><td> 当日最高排烟温度(℃)</td><td>当日平均排烟温度(℃)</td><td>预估当日燃气消耗量(m³)</td></tr>`;

        lists.forEach((item) => {
          table += `<tr><td>${item.date}</td><td>${item.runtime}</td><td>${item.start_count}</td><td>${item.max_temper}</td><td>${item.aver_temper}</td><td>${item.fuel_consumer}</td></tr>`;
        });

        table += '</table>';

        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        let html = "<html><head><meta charset='utf-8' /></head><body>" + table + "</body></html>";

        const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

        const fileName = `历史运行分析报告-${this.name}.xlsx`;

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





    /*let url;
    url = `/api/formal/ept/runtime/history/export`;

    const objectUrl = `${url}?uid=${this.uid}`;
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display:none');
    link.setAttribute('href', objectUrl);
    // link.setAttribute('download', '历史数据');
    link.target = '_blank';
    link.click();
    document.body.removeChild(link);*/
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
    this.getData();
  }

  // 页码跳转
  handlePage() {
    console.log(this.newPage);
    if (parseFloat(this.newPage).toString() === 'NaN') {
      alert('请输入数字')
      return false;
    }

    const totalPage = Math.ceil(this.totalItems / this.pageSize);
    if ( this.newPage <= 0 || this.newPage > totalPage) {
      this.newPage = null;
      return;
    }
    this.page = this.newPage;
    this.getData();
  }

  goBack() {
    window.history.go(-1);
  }

}
