import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerSocketService} from "../../../shared/boiler-socket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RuntimeService} from "../../../shared/runtime.service";
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class RuntimeDashboardComponent implements OnInit, OnDestroy {

  public equipment;
  public analogues = [];
  public switchs = [];
  public ranges = [];
  private socket;
  public uid;

  constructor(private boilerWsService: BoilerSocketService,
              private route: ActivatedRoute,
              private router: Router,
              private runtimeService: RuntimeService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    console.log(this.uid);

    /*this.runtimeService.getInstants()
      .subscribe( data => {
        this.equipment = data;
        console.log(this.equipment);
        for (let i = 0; i < this.equipment.length; i++) {
          let eq = this.equipment[i];
          if ( eq.SequenceNumber === -1) {
              eq.SequenceNumber = eq.ChannelNumber;
          }
          if (eq.ChannelType === 1) {
            this.analogues.push(eq);
          }
          if (eq.ChannelType === 3) {
            this.switchs.push(eq);
          }
          if (eq.ChannelType === 5) {
            this.ranges.push(eq);
          }
        }

        this.order(this.analogues);
        this.order(this.switchs);
        this.order(this.ranges);

      }, err => {});*/

    this.initData();
  }

  initData() {
    let message = {
      uid: this.uid
    };
    const wsUrl = `ws://${window.location.host}/equipment_instant`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          // console.log(data);
          let equipment = JSON.parse(data);
          // console.log(equipment);
          this.equipment = equipment;
          let analogues = [];
          let switchs = [];
          let ranges = [];
          if (this.equipment) {
            for (let i = 0; i < this.equipment.length; i++) {
              let eq = this.equipment[i];
              if ( eq.SequenceNumber === -1) {
                eq.SequenceNumber = eq.ChannelNumber;
              }
              if (eq.ChannelType === 1) {
                analogues.push(eq);
              }
              if (eq.ChannelType === 3) {
                switchs.push(eq);
              }
              if (eq.ChannelType === 5) {
                ranges.push(eq);
              }
            }
            this.order(analogues);
            this.order(switchs);
            this.order(ranges);

            this.analogues = analogues;
            this.switchs = switchs;
            this.ranges = ranges;
          }


        },
        err => console.log(err),
        () => console.log('ws结束')
      );
  }


  order(arr) {
    arr.sort(function(a, b) {
      return a.SequenceNumber - b.SequenceNumber;
    });
  }

  goBack() {
    window.history.go(-1);
  }


  ngOnDestroy() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }

}
