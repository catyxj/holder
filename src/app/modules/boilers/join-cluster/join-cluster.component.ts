import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../shared/boiler.service";
import {ClusterService} from "../../../shared/cluster.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-join-cluster',
  templateUrl: './join-cluster.component.html',
  styleUrls: ['./join-cluster.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JoinClusterComponent implements OnInit {

  @Input()
  equipList: any;

  public cluster = '';
  public clusters = [];

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private clusterService: ClusterService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.getClusters();
  }

  getClusters() {
    this.clusterService.getClustersAll()
      .subscribe( data => {
        this.clusters = data;
      });
  }

  save() {
    let data = {
      equipments: this.equipList,
      cluster: this.cluster
    };
    this.boilerService.addCluster(data)
      .subscribe(val => {
        alert('保存成功');
        this.activeModal.close('ok');
      }, err => {
        this.message.error(err);
      });
  }

}
