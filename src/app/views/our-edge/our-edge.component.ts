import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-our-edge',
  templateUrl: './our-edge.component.html',
  styleUrls: ['./our-edge.component.css']
})
export class OurEdgeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.showUnderline();
  }

  private showUnderline() {
    $('#edge-4')
      .on('show.bs.collapse', function () {
        $('#button-edge-4').addClass('underline');
      })
      .on('hide.bs.collapse', function () {
        $('#button-edge-4').removeClass('underline');
      });
  }

}