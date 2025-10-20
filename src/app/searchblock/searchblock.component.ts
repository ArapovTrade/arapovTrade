// import {
//   ChangeDetectorRef,
//   Component,
//   OnChanges,
//   OnInit,
//   SimpleChanges,
//   DoCheck,
// } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
// import { EventEmitter, Output } from '@angular/core';
// import { SearchServiceService } from '../servises/search-service.service';
// import { artickle } from '../servises/articles.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-searchblock',
//   templateUrl: './searchblock.component.html',
//   styleUrl: './searchblock.component.scss',
// })
// export class SearchblockComponent implements OnInit {
//   constructor(
//     private searchservic: SearchServiceService,
//     private cdr: ChangeDetectorRef,
//     private router: Router,
//   ) {
//     this.searchControl.valueChanges
//       .pipe(debounceTime(300), distinctUntilChanged())
//       .subscribe((value) => {
//         this.language = this.searchservic.checkLange;
//         this.searchText = value || '';
//         this.searchservic.updateSearch(value || '');
//       });
//   }

//   @Output() closeBlockChild: EventEmitter<Event> = new EventEmitter();

//   language!: number;
//   searchText: string = '';
//   myForm!: FormGroup;
//   searchControl: FormControl = new FormControl('');
//   filteredArr: Observable<artickle[]> = this.searchservic.filteredArticles$;
//   placeholderText: string = 'ррррррр';
//   ngOnInit(): void {
//     this.myForm = new FormGroup({
//       searchControl: this.searchControl,
//     });
//   }

//   clearInp() {
//     this.searchControl.setValue('');
//   }
//   closeBtn() {
//     this.clearInp();
//     this.closeBlockChild.emit();
//   }

//   highlightText(title: string): string {
//     if (!this.searchText || !title) return title; // Если нет текста поиска или заголовка, возвращаем оригинал

//     const regex = new RegExp(this.searchText, 'gi'); // 'gi' - регистронезависимый поиск
//     return title.replace(regex, (match) => `<strong>${match}</strong>`); // Оборачиваем совпадения в <strong>
//   }

//   ngAfterViewChecked() {
//     this.placeholderText =
//       this.searchservic.checkLange == 1
//         ? 'Наприклад :  "Рівні Фібоначчі"'
//         : this.searchservic.checkLange == 2
//         ? 'Например : "Метод Вайкоффа"'
//         : 'For example : "Smart Money"';
//     this.cdr.detectChanges();
//   }


//   navigateToArticle(path: any) {
    
//     this.router.navigate([path]);
//   }
  
// }
import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchServiceService } from '../servises/search-service.service';
import { artickle } from '../servises/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchblock',
  templateUrl: './searchblock.component.html',
  styleUrls: ['./searchblock.component.scss'],
})
export class SearchblockComponent implements OnInit {
  @Output() closeBlockChild: EventEmitter<void> = new EventEmitter();
  @Output() focusEvent: EventEmitter<void> = new EventEmitter();
   @Input() maxResults: number = 5; // теперь Angular будет знать про этот input
  searchControl: FormControl = new FormControl('');
  myForm!: FormGroup;
  searchText: string = '';
  language!: number;
  displayedArticles: artickle[] = [];
 

  constructor(
    private searchservic: SearchServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      searchControl: this.searchControl,
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.language = this.searchservic.checkLange;
        this.searchText = value || '';
        this.searchservic.updateSearch(value || '');

        this.searchservic.filteredArticles$.subscribe((res) => {
          this.displayedArticles = res.slice(0, this.maxResults);
        });

        // если поле пустое — показываем 5 случайных статей
        if (!value) {
          const shuffled = [...this.searchservic.artikles].sort(
            () => Math.random() - 0.5
          );
          this.displayedArticles = shuffled.slice(0, this.maxResults);
        }
      });
  }

  onFocus() {
    this.focusEvent.emit();
    // при фокусе если поле пустое — показываем 5 случайных статей
    if (!this.searchControl.value) {
      const shuffled = [...this.searchservic.artikles].sort(
        () => Math.random() - 0.5
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.closeBlockChild.emit();
    }, 150);
  }

  clearInp() {
    this.searchControl.setValue('');
  }

  navigateToArticle(path: string) {
    this.router.navigate([path]);
    this.clearInp();
  }

  highlightText(title: string): string {
    if (!this.searchText || !title) return title;
    const regex = new RegExp(this.searchText, 'gi');
    return title.replace(regex, (match) => `<strong>${match}</strong>`);
  }
}
