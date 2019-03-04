import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-face-view',
  templateUrl: './face-view.component.html',
  styleUrls: ['./face-view.component.css']
})
export class FaceViewComponent implements OnInit {
  @Input ()
  currentData;

  public sexList = [{id: 1, name: '男'}, {id: 2, name: '女'}];
  public imgUrl;

  constructor(public activeModal: NgbActiveModal,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.imgUrl = this.currentData.ImgPath ? this.currentData.ImgPath : 'assets/images/no_image.png';
    this.currentData.date = this.datePipe.transform(this.currentData.CreatedDate, 'yyyy-MM-dd HH:mm:ss');
    this.currentData.result = this.currentData.Result ? '匹配成功' : '匹配失败';
    this.currentData.sex = this.currentData.Sex === 1 ? '男' : '女';
  }



}
