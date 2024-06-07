import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AptitudMilitarComponent } from './aptitud_militar.component';

describe('aptitud_militarComponent', () => {
  let component: AptitudMilitarComponent;
  let fixture: ComponentFixture<AptitudMilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AptitudMilitarComponent]
    });
    fixture = TestBed.createComponent(AptitudMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
