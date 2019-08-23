import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clu-add-main',
  templateUrl: './clu-add-main.component.html',
  styleUrls: ['./clu-add-main.component.css']
})
export class CluAddMainComponent implements OnInit {
  public current = 0;
  public uid;

  constructor() { }

  ngOnInit() {
  }

  changeCurrent(n) {
    if (n === 0) {
      this.current = 0;
      this.uid = '';
      return;
    }
    this.current = this.current + n;
  }

  changeUid(data) {
    this.uid = data;
  }

}
