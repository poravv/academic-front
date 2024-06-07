import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnhoLectivoComponent } from './anho_lectivo.component';

describe('anho_lectivoComponent', () => {
  let component: AnhoLectivoComponent;
  let fixture: ComponentFixture<AnhoLectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnhoLectivoComponent]
    });
    fixture = TestBed.createComponent(AnhoLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
