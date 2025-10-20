import {  AfterViewInit,
  ChangeDetectorRef,Inject,
  OnDestroy, Component, OnInit, ViewChild, Renderer2,
  RendererFactory2, ElementRef, HostListener } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../servises/articles.service';
import { PageEvent } from '@angular/material/paginator';
import { LangService } from '../../../../servises/lang.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
import { artickle } from '../../../../servises/articles.service';
@Component({
  selector: 'app-uk-blog-homepage',
  templateUrl: './uk-blog-homepage.component.html',
  styleUrl: './uk-blog-homepage.component.scss',
})
export class UkBlogHomepageComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  @ViewChild(MatPaginator) paginatorr!: MatPaginator;
  private renderer: Renderer2;
  
  constructor(
    private artickleServ: ArticlesService,
    private router: Router,
    private meta: Meta,
       private cdr:ChangeDetectorRef,
    private themeService:ThemeservService,
 private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private paginator: MatPaginatorIntl,
    private lang: LangService,private eRef: ElementRef
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
     
  }

  ngAfterViewInit() {
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 100
      });
    }
  }, 500); // Задержка 0.5s
}
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  } 
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;


  filteredArticles: any = [];
  ukrGroups: any = [];
  ngOnInit(): void {
      this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })


    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });



    this.paginator.itemsPerPageLabel = '';
    this.lang.setNumber(1);
    this.titleService.setTitle(
      'Безкоштовне навчання трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Безкоштовне навчання трейдингу від Ігоря Арапова —  онлайн-курс з нуля для тих, хто хоче впевнено розпочати шлях на фінансових ринках.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'Безкоштовне навчання трейдингу, навчання трейдингу з нуля безкоштовно, курси з трейдингу безкоштовно, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг з нуля',
    });

    this.filteredArticles = this.artickleServ.ukrainiansArticles();
    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updatePaginatedArticles();
    this.updateArticleCounts();
     this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticlesFive();
  }


hoveredIndex: number | null = null;

projects = [
  { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
  { title: 'Вступ до трейдингу', link: 'https://arapov.education/ua/reg-workshop-ua/' },
  { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
  { title: 'Базовий курс', link: 'https://arapov.trade/uk/freestudying/freeeducation' },
  { title: 'Копiтрейдинг', link: 'https://arapovcopytrade.com/ua/invest-ua/' },
];



  grr!: any;
  checkedGroup!: any;
  onGroupChange(event: Event) {
    // const checkbox = event.target as HTMLInputElement;
    // const value = checkbox.value;

    // if (checkbox.checked) {
    //   this.artickleServ.selectedGroups.push(value);
    //   this.filteredArticles = this.artickleServ.ukrainiansArticles();
    //   this.updatePaginatedArticles();
    // } else {
    //   this.artickleServ.selectedGroups =
    //     this.artickleServ.selectedGroups.filter((group) => group !== value);
    //   this.filteredArticles = this.artickleServ.ukrainiansArticles();
    //   this.updatePaginatedArticles();
    // }

    // this.paginatorr.firstPage();

     const checkbox = event.target as HTMLInputElement;
  const value = checkbox.value;

  // Если нажали на уже выбранную группу — сбрасываем фильтр (показываем все)
  if (this.artickleServ.selectedGroups.includes(value)) {
    this.artickleServ.selectedGroups = [];
  } else {
    // Иначе выбираем только одну группу
    this.artickleServ.selectedGroups = [value];
  }

  // Обновляем фильтрованные статьи
  this.filteredArticles = this.artickleServ.ukrainiansArticles();
  this.updatePaginatedArticles();

  // Возвращаем пагинацию на первую страницу
  this.paginatorr.firstPage();


  
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedArticles();
    // this.scrollToTop.nativeElement.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
    const topPosition = this.scrollToTop.nativeElement.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
    this.moveToTheTop()
  }
  updatePaginatedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
    this.checkedGroup = this.artickleServ.selectedGroups;
  }

  navigateToStudy() {
    this.router.navigateByUrl('/uk/studying');
  }
   private routerSubscription!: Subscription;
      private themeSubscription!: Subscription;
       ngOnDestroy() {
        // Отписка от подписок
        if (this.routerSubscription) {
          this.routerSubscription.unsubscribe();
        }
        if (this.themeSubscription) {
          this.themeSubscription.unsubscribe();
        }
      } 
      hovered: string | null = null;
      toggleTheme() {
      this.isDark = !this.isDark;
      this.themeService.setTheme(this.isDark)
       
       this.refreshAOS();
  
  
    }
  refreshAOS() {
      if (typeof AOS !== 'undefined') {
        setTimeout(() => {
          AOS.refresh(); // Обновление позиций AOS
          this.cdr.detectChanges(); // Принудительное обнаружение изменений
        }, 100); // Задержка для синхронизации
      } else {
        console.warn('AOS is not defined, refresh skipped');
      }
    }
     
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
    selectLang(lang: string) {
      this.currentLang = lang;
  
      this.dropdownOpen = false;
  
       
    }
    navigateTo(path: string) {
      this.router.navigate([path]);
    }



    articleCounts: { [key: string]: number } = {};
    updateArticleCounts() {
  this.articleCounts = {}; // очищаем

  this.artickleServ.ukrArtickles.forEach(article => {
    // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
    article.groupsUkr.forEach(group => {
      if (!this.articleCounts[group]) {
        this.articleCounts[group] = 1;
      } else {
        this.articleCounts[group]++;
      }
    });
  });
}
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }


isFocused = false;
displayedArticles: artickle[] = [];
maxResults = 5;
searchQuery: string = '';

onFocus() {
  this.isFocused = true;

  // Показываем 5 случайных статей при фокусе, если инпут пуст
  if (!this.searchQuery) {
    const shuffled = [...this.artickleServ.ukrArtickles].sort(() => Math.random() - 0.5);
    this.displayedArticles = shuffled.slice(0, this.maxResults);
  }
}

onBlur() {
  setTimeout(() => {
    this.isFocused = false;
  }, 150); // таймаут чтобы клик по статье сработал
}

onSearchChange() {
  // Логика асинхронного поиска
  const filtered = this.artickleServ.ukrArtickles.filter(a =>
    a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
  this.displayedArticles = filtered.slice(0, this.maxResults);
}

moveToTheTop(){
  const element = document.getElementById('scrollToTop');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

groupsMenuOpen = false;
   toggleGroupsMenu(event: Event) {
    
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }
   




}
