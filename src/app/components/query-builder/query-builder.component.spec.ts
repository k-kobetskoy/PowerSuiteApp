/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryBuilder } from './query-builder.component';

describe('FetchParentComponent', () => {
  let component: QueryBuilder;
  let fixture: ComponentFixture<QueryBuilder>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
