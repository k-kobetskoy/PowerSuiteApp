/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterEditorComponent } from './filter-editor.component';

describe('FilterEditorComponent', () => {
  let component: FilterEditorComponent;
  let fixture: ComponentFixture<FilterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
