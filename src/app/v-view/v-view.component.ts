import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

declare var EZUIPlayer: any;

@Component({
  selector: 'app-v-view',
  templateUrl: './v-view.component.html',
  styleUrls: ['./v-view.component.css']
})
export class VViewComponent implements OnInit {
  public player;
  public url;
  public name;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.name = this.route.snapshot.paramMap.get('name');
    setTimeout( () => {
      this.player = new EZUIPlayer('myPlayer');
    }, 500);

  }

}
