import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRoomsComponent } from './overview-rooms.component';

describe('OverviewRoomsComponent', () => {
  let component: OverviewRoomsComponent;
  let fixture: ComponentFixture<OverviewRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
