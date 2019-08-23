import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-template-main-formal',
  templateUrl: './template-main-formal.component.html',
  styleUrls: ['./template-main-formal.component.css']
})
export class TemplateMainFormalComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router);
  }

}
