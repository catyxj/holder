import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-terminal-delete-img',
  templateUrl: './terminal-delete-img.component.html',
  styleUrls: ['./terminal-delete-img.component.css']
})
export class TerminalDeleteImgComponent implements OnInit {
  @Input() imgList1: any;
  @Input() imgList2: any;
  @Input() imgList3: any;

  public img1;
  public img2;
  public img3;

  constructor() { }

  ngOnInit() {
    this.img1 = this.imgList1 ? this.imgList1.slice() : [];
    this.img2 = this.imgList2 ? this.imgList2.slice() : [];
    this.img3 = this.imgList3 ? this.imgList3.slice() : [];
  }

  check(img) {
    img.checked = !img.checked;
  }

}
