import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AptitudMilitarCreateComponent } from './aptitud_militar-create.component';



describe('aptitud_militarCreateComponent', () => {
  let component: AptitudMilitarCreateComponent;
  let fixture: ComponentFixture<AptitudMilitarCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AptitudMilitarCreateComponent]
    });
    fixture = TestBed.createComponent(AptitudMilitarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
