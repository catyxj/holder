import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-template-add-finish',
  templateUrl: './template-add-finish.component.html',
  styleUrls: ['./template-add-finish.component.css']
})
export class TemplateAddFinishComponent implements OnInit {
  @Output()
  next = new EventEmitter();
  @Input()
  uid;

  public name;

  constructor() { }

  ngOnInit() {
  }

  pre() {
    this.next.emit(-1);
  }

  save() {
    let that = this;
    let post;

    console.log(post);
    this.next.emit(0);

    /*this.templateService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.next.emit(1);
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });*/


  }

}
