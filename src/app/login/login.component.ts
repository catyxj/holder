import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from '../shared/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = { userName: '', password: '' };
  private errMes: string ;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.getUser();
  }

  forgetPwd() {}

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        if ( this.user.userName === user.user && this.user.password === user. password)
        { this.router.navigate(['/admin']); } else {
          this.errMes = '账号密码错误';
        }
      });
  }

}
