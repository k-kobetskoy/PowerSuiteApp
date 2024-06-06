/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RootFormComponent } from './root-form.component';

describe('RootFormComponent', () => {
  let component: RootFormComponent;
  let fixture: ComponentFixture<RootFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
