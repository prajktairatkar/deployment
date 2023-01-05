import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogresourceComponent } from './dialogresource.component';

describe('DialogresourceComponent', () => {
  let component: DialogresourceComponent;
  let fixture: ComponentFixture<DialogresourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogresourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
