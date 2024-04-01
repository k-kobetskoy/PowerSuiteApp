/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FetchParentComponent } from './fetch-parent.component';

describe('FetchParentComponent', () => {
  let component: FetchParentComponent;
  let fixture: ComponentFixture<FetchParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
