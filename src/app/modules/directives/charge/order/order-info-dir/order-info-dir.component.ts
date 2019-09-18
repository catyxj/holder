import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-info-dir',
  templateUrl: './order-info-dir.component.html',
  styleUrls: ['./order-info-dir.component.css']
})
export class OrderInfoDirComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  goBack() {
    window.history.go(-1);
  }

}
