import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwsTopTenComponent } from './cws-top-ten.component';

describe('CwsTopTenComponent', () => {
  let component: CwsTopTenComponent;
  let fixture: ComponentFixture<CwsTopTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwsTopTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwsTopTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
