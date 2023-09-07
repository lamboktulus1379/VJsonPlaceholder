import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingDetailsComponent } from './typing-details.component';

describe('TypingDetailsComponent', () => {
  let component: TypingDetailsComponent;
  let fixture: ComponentFixture<TypingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
