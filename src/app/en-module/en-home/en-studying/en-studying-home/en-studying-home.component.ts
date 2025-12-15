import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';

@Component({
  selector: 'app-en-studying-home',
  templateUrl: './en-studying-home.component.html',
  styleUrl: './en-studying-home.component.scss',
})
export class EnStudyingHomeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,

    private titleService: Title,
    private lang: LangService
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
  ngOnInit(): void {
    this.removeExistingWebPageSchema();
    this.addWebSiteSchema();
    this.addReviewSchema();
    this.lang.setNumber(3);
    this.titleService.setTitle(
      'Online Trading Courses | Learn Trading from Scratch'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Online trading courses by Igor Arapov — trading and investment education from scratch, remotely and free. Learn technical and fundamental analysis, trading strategies, and risk management step by step.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'trading courses, online trading education, trading from scratch, remote learning, investments, trading strategies',
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
  }
  navigateToHomeWithId() {
    window.location.href = 'https://arapov.education/en/course-en/';
  }
  scrollToRegistration() {
    const element = document.getElementById('registrationEn');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  @ViewChild('programSection', { static: true }) section!: ElementRef;
  @ViewChild('timelineProgress', { static: true }) progress!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const section = this.section.nativeElement;
    const progress = this.progress.nativeElement;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // расстояние от верха страницы до секции
    const start = rect.top + window.scrollY - windowHeight;
    const end = rect.bottom + window.scrollY;
    const scrollPos = window.scrollY;

    // процент прокрутки блока
    const percent = Math.min(
      Math.max((scrollPos - start) / (end - start), 0),
      1
    );

    progress.style.height = `${percent * 100}%`;
  }

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'Course') {
          script.remove();
        }
        if (content['@type'] === 'WebSite') {
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
        return (
          json['@type'] === 'Course' &&
          json['name'] === 'Professional Trading Course'
        );
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
      '@type': 'Course',
      name: 'Professional Trading Course',
      description:
        'Individual trading education from scratch under the guidance of an experienced trader. Wyckoff Method, Volume Analysis, practice on live accounts.',
      url: 'https://arapov.trade/en/studying',
      instructor: {
        '@type': 'Person',
        name: 'Igor Arapov',
        jobTitle: 'Professional Trader',
        url: 'https://arapov.trade/en/',
      },
      provider: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
        name: 'Arapov Trade',
      url: 'https://arapov.trade'
      },
      educationalLevel: 'Beginner to Advanced',
      teaches: [
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Risk Management',
        'Market Psychology',
        'Smart Money Concepts',
      ],
      about: [
        {
          '@type': 'Thing',
          name: 'Stock Trading',
        },
        {
          '@type': 'Thing',
          name: 'Forex Trading',
        },
        {
          '@type': 'Thing',
          name: 'Cryptocurrency Trading',
        },
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'P4W',
         
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '50',
        reviewCount: '25',
      },
    });

    this.document.head.appendChild(script);
  }

  private addReviewSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'Review' &&
          json['name'] === 'Review of Arapov.Trade'
        );
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
      '@type': 'Review',
      name: 'Review of Arapov.Trade',

      author: {
        '@type': 'Person',
        name: 'Sergey Cheremisin',
      },
      datePublished: '2024-09-01',
      reviewBody:
        'After 11 months of trading, net profit was $6,237.14, which is 40% of the deposit amount. WinRate 67%, average monthly return — 3.57%. I use the Richard Wyckoff concept and false breakout trading system.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: {
        '@type': 'Course',
        name: 'Professional Trading Course',
        url: 'https://arapov.trade/en/studying',
      },
    });

    this.document.head.appendChild(script);
  }
}
