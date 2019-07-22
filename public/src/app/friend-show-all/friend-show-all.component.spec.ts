import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendShowAllComponent } from './friend-show-all.component';

describe('FriendShowAllComponent', () => {
  let component: FriendShowAllComponent;
  let fixture: ComponentFixture<FriendShowAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendShowAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
