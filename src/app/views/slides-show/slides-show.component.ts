import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-slides-show',
    templateUrl: './slides-show.component.html',
    styleUrls: ['./slides-show.component.css']
})
export class SlidesShowComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

    onScrollDown(): void {
        $('#expertise-content')[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
