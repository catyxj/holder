import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot
} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = { userName: '', password: '' };

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/admin']);
  }

  forgetPwd() {}

}
