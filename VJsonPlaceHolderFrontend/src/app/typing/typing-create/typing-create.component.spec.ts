import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingCreateComponent } from './typing-create.component';

describe('TypingCreateComponent', () => {
  let component: TypingCreateComponent;
  let fixture: ComponentFixture<TypingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
