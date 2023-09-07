import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingListComponent } from './typing-list.component';

describe('TypingListComponent', () => {
  let component: TypingListComponent;
  let fixture: ComponentFixture<TypingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
