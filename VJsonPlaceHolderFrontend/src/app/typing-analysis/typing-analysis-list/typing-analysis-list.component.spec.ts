import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingAnalysisListComponent } from './typing-analysis-list.component';

describe('TypingAnalysisListComponent', () => {
  let component: TypingAnalysisListComponent;
  let fixture: ComponentFixture<TypingAnalysisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingAnalysisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
