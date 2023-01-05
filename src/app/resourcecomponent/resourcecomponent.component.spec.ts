import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcecomponentComponent } from './resourcecomponent.component';

describe('ResourcecomponentComponent', () => {
  let component: ResourcecomponentComponent;
  let fixture: ComponentFixture<ResourcecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcecomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
