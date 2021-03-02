import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapBooksComponent } from './scrap-books.component';

describe('ScrapBooksComponent', () => {
  let component: ScrapBooksComponent;
  let fixture: ComponentFixture<ScrapBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
