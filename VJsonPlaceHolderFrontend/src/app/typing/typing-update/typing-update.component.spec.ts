import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingUpdateComponent } from './typing-update.component';

describe('TypingUpdateComponent', () => {
  let component: TypingUpdateComponent;
  let fixture: ComponentFixture<TypingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
