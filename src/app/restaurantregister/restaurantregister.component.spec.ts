import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantregisterComponent } from './restaurantregister.component';

describe('RestaurantregisterComponent', () => {
  let component: RestaurantregisterComponent;
  let fixture: ComponentFixture<RestaurantregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
