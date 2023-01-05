import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdialogComponent } from './subdialog.component';

describe('SubdialogComponent', () => {
  let component: SubdialogComponent;
  let fixture: ComponentFixture<SubdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
