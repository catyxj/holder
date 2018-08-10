import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  user: any;

  public submenuShow: Array<boolean> = [true, true, true, false];

  constructor() { }

  ngOnInit() {

  }

  submenuToggle(n) {
    this.submenuShow[n] = !this.submenuShow[n];
  }

}
