import {Component, Input, OnInit} from '@angular/core';
import {ClusterService} from "../../../shared/cluster.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.css']
})
export class EditClusterComponent implements OnInit {

  @Input()
  currentData;

  public name;

  constructor(public activeModal: NgbActiveModal,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.name = this.currentData.Name;
  }

  save() {
    this.clusterService.editCluster({uid: this.currentData.Uid, name: this.name})
      .subscribe( val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });
  }

}
