/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FailedComponent } from './failed.component';

describe('FailedComponent', () => {
  let component: FailedComponent;
  let fixture: ComponentFixture<FailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
