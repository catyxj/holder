import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateService} from "../../../../../shared/template.service";
import {TempAddCalc1Component} from "../modals/temp-add-calc1/temp-add-calc1.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-add-calculate',
  templateUrl: './template-add-calculate.component.html',
  styleUrls: ['./template-add-calculate.component.css']
})
export class TemplateAddCalculateComponent implements OnInit {
  @Output()
  next = new EventEmitter();
  @Input()
  uid;

  constructor(private modalService: NgbModal,
              private templateService: TemplateService) { }

  ngOnInit() {
  }


  calc1() {
    let that = this;
    const modalRef = this.modalService.open(TempAddCalc1Component, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {

      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }



  pre() {
    this.next.emit(-1);
  }

  goNext() {
    this.next.emit(1);
  }

  save() {
    let that = this;
    let post;
    post = {

    };
    console.log(post);
    // this.next.emit(1);

    this.templateService.addCalc(post)
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
      });


  }

}
