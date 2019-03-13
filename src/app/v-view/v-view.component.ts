import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {UserService} from "../shared/user.service";

declare var EZUIPlayer: any;

@Component({
  selector: 'app-v-view',
  templateUrl: './v-view.component.html',
  styleUrls: ['./v-view.component.css']
})
export class VViewComponent implements OnInit, OnDestroy {
  public player;
  public url;
  public name;
  public num;
  public user;
  public subscription: Subscription;
  public sideshow;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });
  }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.name = this.route.snapshot.paramMap.get('name');
    this.num = this.route.snapshot.paramMap.get('num');
    setTimeout( () => {
      this.player = new EZUIPlayer('myPlayer');
    }, 500);
    this.getUser();
  }

  getUser(): void {

    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.userService.StatusMission(this.user);
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
