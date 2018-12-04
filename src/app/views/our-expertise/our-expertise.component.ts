import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-our-expertise',
    templateUrl: './our-expertise.component.html',
    styleUrls: ['./our-expertise.component.css']
})
export class OurExpertiseComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        $('#edge-2').collapse({
            toggle: false
        })
    }

}
