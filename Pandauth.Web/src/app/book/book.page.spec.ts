import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPage } from './book.page';

describe('BookPage', () => {
  let component: BookPage;
  let fixture: ComponentFixture<BookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
