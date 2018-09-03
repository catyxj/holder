import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../shared/boiler.service";
import {ClusterService} from "../../../shared/cluster.service";
import Swal from 'sweetalert2';

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
              private clusterService: ClusterService) { }

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
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
