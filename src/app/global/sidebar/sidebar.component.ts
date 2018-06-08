import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public submenuShow: Array<boolean> = [true, true];
  constructor() { }

  ngOnInit() {

  }

  submenuToggle(n) {
    this.submenuShow[n] = !this.submenuShow[n];
  }

}
