import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AceptacionInvitacionPage } from './aceptacion-invitacion.page';

describe('AceptacionInvitacionPage', () => {
  let component: AceptacionInvitacionPage;
  let fixture: ComponentFixture<AceptacionInvitacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptacionInvitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
