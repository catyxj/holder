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
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = { username: '', password: '' , ip: ''};
  public errMes: string ;


  constructor(public router: Router, public activatedRoute: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.getConfig()
      .subscribe(ipInfo => {this.user.ip = ipInfo.ip; });
  }

  forgetPwd() {}

  getConfig(): any {
    const IP_JSON_URL = 'http://ipv4.myexternalip.com/json';
    return this.http.get(IP_JSON_URL);
  }

  login(): void {
    // console.log(this.user);
    this.userService.login(this.user)
      .subscribe(
        user => {
          this.user = user;
          sessionStorage.user = true;
          this.router.navigate(['/admin']);
          }, // success path
        error => this.errMes = error // error path
         );
  }



}
