import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SeoService } from './seo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private seo: SeoService,
        private router: Router
    ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                var title = this.getTitle(router.routerState, router.routerState.root).join('-');
                var meta = this.getMeta(router.routerState, router.routerState.root).join('-');
                this.seo.generateTags({
                    title: title,
                    description: meta
                })
            }
        });
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    getMeta(state, parent) {
        var data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.meta) {
            data.push(parent.snapshot.data.meta);
        }

        if (state && parent) {
            data.push(... this.getMeta(state, state.firstChild(parent)));
        }
        return data;
    }

    getTitle(state, parent) {
        var data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(parent.snapshot.data.title);
        }

        if (state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }
        return data;
    }
}