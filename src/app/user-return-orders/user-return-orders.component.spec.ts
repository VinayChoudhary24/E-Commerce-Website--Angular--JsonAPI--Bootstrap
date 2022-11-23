import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReturnOrdersComponent } from './user-return-orders.component';

describe('UserReturnOrdersComponent', () => {
  let component: UserReturnOrdersComponent;
  let fixture: ComponentFixture<UserReturnOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReturnOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReturnOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
