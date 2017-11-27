/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DummieDataComponent } from './dummie-data.component';

describe('DummieDataComponent', () => {
  let component: DummieDataComponent;
  let fixture: ComponentFixture<DummieDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummieDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
