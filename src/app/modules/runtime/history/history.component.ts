import { Component, OnInit } from '@angular/core';
import {RuntimeService} from "../../../shared/runtime.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class RuntimeHistoryComponent implements OnInit {

  public page = 1;
  public pageSize = 10;
  public totalItems = 0;
  public rangeValue = 'today';
  public dateRange = [];
  private uid;
  public params = [];
  public history = [];
  public name;
  public termCode;
  public terminals;
  public isSpinning = false;

  constructor(private runtimeService: RuntimeService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.selectDate();
  }

  // 选择时间区间
  changeDate() {
    // console.log(this.dateRange);
    this.page = 1;
    this.refreshData();
  }

  selectDate() {
    let start = new Date();
    let end = new Date();
    switch (this.rangeValue) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        let d1 = start.getDate() - 7;
        start.setDate(d1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }

    this.dateRange = [start, end];
    // console.log(this.dateRange);
    this.page = 1;
    this.refreshData();
  }


  // 获取数据
  refreshData() {
    let postData = {
      uid: this.uid,
      startDate: this.dateRange[0],
      endDate: this.dateRange[1],
      page: this.page,
      pageSize: this.pageSize,
      code: this.termCode
    };
    this.isSpinning = true;
    this.runtimeService.getHistory(postData)
      .subscribe( data => {
        // console.log(data);
        this.isSpinning = false;
        this.totalItems = data.counts;
        let runtimes = data.params;
        this.terminals = runtimes.terminals; // 终端列表
        if (!this.termCode) {
          this.termCode = this.terminals[0].TerminalCode;
        }

        this.params = [];
        this.history = [];
        let param = runtimes.channel;
        let lists = runtimes.history;

        // 通道列表
        for ( let i = 0; i < param.length; i++) {
          let pa = param[i];
          let da = {
            id: '',
            Name: '',
            Unit: ''
          };
          da.id = pa.ChannelType + '_' + pa.ChannelNumber;
          da.Name = pa.Name;
          da.Unit = pa.Unit;
          this.params.push(da);
        }

        // 历史数据列表
        if (lists) {
          for (let i = 0; i < lists.length; i++) {
            let li = JSON.parse(lists[i].data);
            let his = {
              date: '',
              data: {}
            };
            his.date = lists[i].date;
            for (let j = 0; j < li.length; j++) {
              let dat = li[j];
              let id = dat.type + '_' + dat.number;
              his.data[id] = dat.value.toString();
            }
            this.history.push(his);
          }
        }

        // console.log(this.params, this.history);

      }, err => {
        this.isSpinning = false;
      });
  }

  pageChange() {
    this.refreshData();
  }

  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.refreshData();
  }


  // 选择终端
  changeTerm() {
    this.page = 1;
    if (typeof(this.termCode) !== 'number') {
      console.log('string');
      this.termCode = parseInt(this.termCode);
    }
    this.refreshData();
  }

  // 导出
  export() {
    let postData = {
      uid: this.uid,
      startDate: this.dateRange[0],
      endDate: this.dateRange[1],
      code: this.termCode
    };
    this.runtimeService.getHistoryExport(postData)
      .subscribe( data => {
        let totalItems = data.counts;
        let runtimes = data.params;

        let params = [];
        let history = [];
        let param = runtimes.channel;
        let lists = runtimes.history;



        // 通道列表
        for ( let i = 0; i < param.length; i++) {
          let pa = param[i];
          let da = {
            id: pa.ChannelType + '_' + pa.ChannelNumber,
            Name: pa.Name,
            Unit: pa.Unit
          };
          params.push(da);
        }

        // 历史数据列表
        if (lists) {
          for (let i = 0; i < lists.length; i++) {
            let li = JSON.parse(lists[i].data);
            let his = {
              date: lists[i].date,
              data: {}
            };
            for (let j = 0; j < li.length; j++) {
              let dat = li[j];
              let id = dat.type + '_' + dat.number;
              his.data[id] = dat.value.toString();
            }
            history.push(his);
          }
        }

        // console.log(history);

        // 导出表格
        let start = this.datePipe.transform(this.dateRange[0], 'yyyy.MM.dd');
        let end = this.datePipe.transform(this.dateRange[1], 'yyyy.MM.dd');

        let table = `<table><tr><td>设备：${this.name}</td><td>终端：${this.termCode}</td><td>时间： ${start}-${end}</td> </tr><tr><td>采样时间</td>`;

        // headers
        for (let i = 0; i < params.length; i++) {
          table += `<td>${params[i].Name} ${params[i].Unit}</td>`;
        }
        table += '</tr>';
        history.forEach((record) => {
          let date = this.datePipe.transform(record.date, 'yyyy-MM-dd HH:mm:ss');
          table += `<tr><td>${date}</td>`;
          for (let i = 0; i < params.length; i++) {
            table += `<td>${record.data[params[i].id] || '' }</td>`;
          }
          table += '</tr>';
        });
        table += '</table>';

        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        let html = "<html><head><meta charset='utf-8' /></head><body>" + table + "</body></html>";

        const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

        const fileName = `${this.name}(${start}-${end}).xlsx`;

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
