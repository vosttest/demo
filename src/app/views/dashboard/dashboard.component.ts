import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @ViewChild('structure') public structure:ElementRef;

    constructor() { }

    ngOnInit() {
    }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    ngAfterViewInit() {
        // $('body').on('mousewheel', function(e, delta) {
        //     if (delta > 0) {
        //         console.log('len');
        //     }
        //     // else if ($("#slider .carousel-item:last").hasClass("active")) {
        //     //     // e.stopPropagation();
        //     //     $('#slider').off('mousewheel');
        //     // }
        //     else {
        //         e.preventDefault();
        //         console.log('xuong');
        //         $('#expertise-content')[0].scrollIntoView({
        //             behavior: "smooth",
        //             block: "start"
        //         });
        //     }
        // });
    }
}
