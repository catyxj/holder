import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClusterService} from "../../../shared/cluster.service";

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.css']
})
export class AddClusterComponent implements OnInit {

  public name;

  constructor(public activeModal: NgbActiveModal,
              private clusterService: ClusterService) { }

  ngOnInit() {

  }

  save() {
    this.clusterService.addCluster({name: this.name})
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });
  }

}
