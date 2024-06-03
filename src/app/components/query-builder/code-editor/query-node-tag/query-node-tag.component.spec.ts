/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryNodeTagComponent } from './query-node-tag.component';

describe('QueryNodeTagComponent', () => {
  let component: QueryNodeTagComponent;
  let fixture: ComponentFixture<QueryNodeTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNodeTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNodeTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
