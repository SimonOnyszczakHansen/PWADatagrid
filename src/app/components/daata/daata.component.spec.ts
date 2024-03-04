import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaataComponent } from './daata.component';

describe('DaataComponent', () => {
  let component: DaataComponent;
  let fixture: ComponentFixture<DaataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
