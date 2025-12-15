import {
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  RendererFactory2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../servises/articles.service';
import { LangService } from '../../../../servises/lang.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
import { artickle } from '../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-en-blog-homepage',
  templateUrl: './en-blog-homepage.component.html',
  styleUrl: './en-blog-homepage.component.scss',
})
export class EnBlogHomepageComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  @ViewChild(MatPaginator) paginatorr!: MatPaginator;
  private renderer: Renderer2;
  constructor(
    private activateRout: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private lang: LangService,
    private artickleServ: ArticlesService,
    private paginator: MatPaginatorIntl,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private rendererFactory: RendererFactory2,
    private router: Router,
    private meta: Meta,

    private titleService: Title
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: false,
          offset: 100,
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

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;

  filteredArticles: any = [];
  enGroups: any = [];
  ngOnInit(): void {
    this.activateRout.queryParams.subscribe((params) => {
      const selectedGroup = params['group'];
      if (selectedGroup) {
        this.artickleServ.selectedGroups = [selectedGroup];
        this.grr = [...this.artickleServ.selectedGroups];
        this.checkedGroup = [...this.artickleServ.selectedGroups];

        this.cdr.detectChanges();
        this.onGroupChangeFromEvent(selectedGroup);
      }
    });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
    this.removeExistingWebPageSchema();
    this.addWebSiteSchema();
    this.paginator.itemsPerPageLabel = '';
    this.lang.setNumber(3);
    this.titleService.setTitle(
      'Online Trading Training | Free Trading Courses from Igor Arapov'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'free trading education, trading from scratch, online trading courses, remote trading education, trading strategies, cryptocurrency trading, trading online',
    });
    this.meta.updateTag({
      name: 'description',
      content:
        'Free online trading education by Igor Arapov — complete step-by-step course from scratch, analysis of trading strategies, risk management, and practical exercises. Learn trading and cryptocurrencies remotely and for free.',
    });
    this.filteredArticles = this.artickleServ.englishArticles();
    this.enGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updatePaginatedArticles();
    this.updateArticleCounts();
    this.gerRandom();
  }
  onGroupChangeFromEvent(value: string) {
    // Обновляем фильтрованные статьи
    this.filteredArticles = this.artickleServ.ukrainiansArticles();
    this.updatePaginatedArticles();

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.moveToTheTop();
      }, 500); // Задержка для рендеринга DOM
    }
  }
  randomArticleEn: any = [];
  gerRandom() {
    this.randomArticleEn = this.artickleServ.getRandomUkArticlesFive();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Quick start', link: 'https://arapov.education/en/course-en/' },
    {
      title: 'Introduction to Trading',
      link: 'https://arapov.education/en/reg-workshop-en/',
    },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
    { title: 'Copy-trading', link: 'https://arapovcopytrade.com/en/home-en/' },
  ];

  grr!: any;
  checkedGroup!: any;
  onGroupChange(event: Event) {
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
    this.filteredArticles = this.artickleServ.englishArticles();
    this.updatePaginatedArticles();

    this.paginatorr.firstPage();
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedArticles();

    const topPosition = this.scrollToTop.nativeElement.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
    this.moveToTheTop();
  }

  updatePaginatedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  navigateToStudy() {
    this.router.navigateByUrl('/en/studying');
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
    this.themeService.setTheme(this.isDark);

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

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsEng.forEach((group) => {
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
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5
      );
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
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleEn.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'CollectionPage') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'CollectionPage' && json['name'] === 'Free Trading Education';
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Trading Education',
      description:
        'Over 150 free trading articles: Smart Money Concepts, Wyckoff Method, Technical Analysis, Crypto Trading. Complete course for beginners.',
      url: 'https://arapov.trade/en/freestudying',
      isPartOf: {
        '@id': 'https://arapov.trade/en/main#website',
      },
      author: {
        '@id': 'https://arapov.trade/en#person',
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Trading Education',
        },
        {
          '@type': 'Thing',
          name: 'Smart Money Concepts',
        },
        {
          '@type': 'Thing',
          name: 'Technical Analysis',
        },
      ],
      mainEntity: {
        '@type': 'ItemList',
        name: 'Main Trading Course Topics',
        numberOfItems: 150,
        itemListOrder: 'ItemListOrderDescending',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Smart Money Concepts',
            url: 'https://arapov.trade/en/freestudying/smartmoneyconceptsguide',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Wyckoff Method',
            url: 'https://arapov.trade/en/freestudying/wyckoffmethod',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Technical Analysis',
            url: 'https://arapov.trade/en/freestudying/technicalanalysis',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Trading Indicators',
            url: 'https://arapov.trade/en/freestudying/tradingindicators',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Cryptocurrency Trading',
            url: 'https://arapov.trade/en/freestudying/cryptocurrencytrading',
          },
        ],
      },
    });

    this.document.head.appendChild(script);
  }
}
