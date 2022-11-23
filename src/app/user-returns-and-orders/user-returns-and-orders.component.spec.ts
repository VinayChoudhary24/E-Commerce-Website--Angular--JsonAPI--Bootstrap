import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReturnsAndOrdersComponent } from './user-returns-and-orders.component';

describe('UserReturnsAndOrdersComponent', () => {
  let component: UserReturnsAndOrdersComponent;
  let fixture: ComponentFixture<UserReturnsAndOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReturnsAndOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReturnsAndOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
