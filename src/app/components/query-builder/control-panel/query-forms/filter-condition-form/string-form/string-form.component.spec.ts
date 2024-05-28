/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StringFormComponent } from './string-form.component';

describe('StringFormComponent', () => {
  let component: StringFormComponent;
  let fixture: ComponentFixture<StringFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
