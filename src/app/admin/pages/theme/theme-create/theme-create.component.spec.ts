import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCreateComponent } from './theme-create.component';

describe('ThemeCreateComponent', () => {
  let component: ThemeCreateComponent;
  let fixture: ComponentFixture<ThemeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeCreateComponent]
    });
    fixture = TestBed.createComponent(ThemeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
