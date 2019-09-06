import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "../../shared/register.service";

@Component({
  selector: 'app-ruikong',
  templateUrl: './ruikong.component.html',
  styleUrls: ['./ruikong.component.css']
})
export class RuikongComponent implements OnInit {
  public user = { username: '', password: '' , ip: ''};
  public errMes: string ;
  public checkRemember = false;

  constructor(public router: Router,
              private registerService: RegisterService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getConfig()
      .subscribe(ipInfo => {this.user.ip = ipInfo.ip; });

    let getLocal = localStorage.getItem('holderUser');
    if (getLocal) {
      this.user.username = getLocal;
      this.checkRemember = true;
    } else {

    }
  }

  getConfig(): any {
    const IP_JSON_URL = 'https://ipv4.myexternalip.com/json';
    return this.http.get(IP_JSON_URL);
  }

  login(): void {
    // console.log(this.user);
    if (this.checkRemember === true) {
      localStorage.setItem('holderUser', this.user.username);
    } else {
      localStorage.removeItem('holderUser');
    }

    this.registerService.login(this.user)
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
