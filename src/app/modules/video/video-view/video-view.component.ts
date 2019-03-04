import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

declare var EZUIPlayer: any;

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy {
  @Input ()
  currentData;

  public name;
  public code;
  public url;
  public player;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.player = new EZUIPlayer('myPlayer');
    }, 500);
  }

  ngOnDestroy() {
    console.log('close');
    this.player = null;
  }


}
