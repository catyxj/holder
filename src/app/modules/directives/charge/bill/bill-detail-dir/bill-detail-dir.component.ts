import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-detail-dir',
  templateUrl: './bill-detail-dir.component.html',
  styleUrls: ['./bill-detail-dir.component.css']
})
export class BillDetailDirComponent implements OnInit {
  public year;
  public selectedValue;

  isSpinning = false;

  dataLists = [
    {
      key: '1',
      name: '物联网终端采购',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: '物联网终端采购',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
