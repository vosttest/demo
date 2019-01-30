import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  hideLogo: String = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((rsp: any) => {
      const url: String = rsp.url;
      if (url != null) {
        if (url.includes('/news'))
          this.hideLogo = 'hide-logo';
        else
          this.hideLogo = null;
        return;
      }
    });
  }

}
