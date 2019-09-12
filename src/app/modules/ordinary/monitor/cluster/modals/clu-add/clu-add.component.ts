import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClusterService} from "../../../../../../shared/cluster.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clu-add',
  templateUrl: './clu-add.component.html',
  styleUrls: ['./clu-add.component.css']
})
export class CluAddComponent implements OnInit {
  public label;
  public secretKey;

  constructor(public activeModal: NgbActiveModal,
              private clusterService: ClusterService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      label: this.label,
      secret_key: this.secretKey
    };
    this.clusterService.addClu(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
