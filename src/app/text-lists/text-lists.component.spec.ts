import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListsComponent } from './text-lists.component';

describe('TextListsComponent', () => {
  let component: TextListsComponent;
  let fixture: ComponentFixture<TextListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
