import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ServiceService} from '../../../shared/service.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ser-add',
  templateUrl: './ser-add.component.html',
  styleUrls: ['./ser-add.component.css']
})
export class SerAddComponent implements OnInit {
  @Input()
  typeName;
  id;

  public title;
  public class;

  constructor(public activeModal: NgbActiveModal,
              private serviceService: ServiceService,
              private router: Router ) { }

  ngOnInit() {

  }

  save() {
    const post = {
      typeId: this.id,
      topic: this.title
    };
    this.serviceService.addComment(post)
      .subscribe( () => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }




}
