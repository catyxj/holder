import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-general-dir',
  templateUrl: './bill-general-dir.component.html',
  styleUrls: ['./bill-general-dir.component.css']
})
export class BillGeneralDirComponent implements OnInit {
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
