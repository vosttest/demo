import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurEdgeComponent } from './our-edge.component';

describe('OurEdgeComponent', () => {
  let component: OurEdgeComponent;
  let fixture: ComponentFixture<OurEdgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurEdgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
