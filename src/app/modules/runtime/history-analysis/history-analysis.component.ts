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
    /*this.isSpinning = true;
    this.runtimeService.getAnalysis(this.page, this.pageSize)
      .subscribe( data => {
        this.isSpinning = false;
        this.dataList = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });*/

    this.dataList = [
      {
        date: '2020-5-5',
        data: '111'
      },
      {
        date: '2020-5-6',
        data: '111'
      }
    ];
    this.totalItems = 11;

  }



  export() {

  }



  // 每页数量
 /* pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }*/

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
