import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TemplateService} from "../../../../../shared/template.service";
import {Router} from "@angular/router";

import Swal from 'sweetalert2';

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

  constructor(private templateService: TemplateService,
              private router: Router) { }

  ngOnInit() {
  }

  pre() {
    this.next.emit(-1);
  }

  save() {
    let that = this;
    let post;
    post = {
      uid: this.uid,
      name: this.name
    };

    console.log(post);
    // this.next.emit(0);

    this.templateService.addName(post)
      .subscribe(val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        that.router.navigate(['admin/formal/template/list']);
        // this.next.emit(0);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });


  }

}
