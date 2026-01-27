import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
declare var AOS: any;
import { LangService } from '../../servises/lang.service';
import { ThemeservService } from '../../servises/themeserv.service';

@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private renderer: Renderer2;
  constructor(
    private meta: Meta,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private lang: LangService,
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

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();
    this.addPersoneSchema();
    this.addProfilePageSchema();
    this.titleService.setTitle(
      'Навчання трейдингу з нуля безкоштовно | Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Навчання трейдингу з нуля безкоштовно від Ігоря Арапова — курси трейдингу онлайн, технічний та фундаментальний аналіз, торгівля криптовалютами та валютними парами крок за кроком.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'навчання трейдингу, курси трейдингу, трейдинг онлайн, трейдинг з нуля, криптовалюти, валютні пари',
    });

    this.lang.setNumber(1);

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

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
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
  private addPersoneSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'Person' && json['name'] === 'Ігор Арапов';
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
      '@type': 'Person',
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: 'Igor Arapov',
      birthDate: '1990-09-30',
      givenName: 'Ігор',
      familyName: 'Арапов',
      jobTitle: 'Професійний трейдер',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Trader',
        description: 'Професійний трейдер на фінансових ринках з 2013 року',
        occupationLocation: {
          '@type': 'Country',
          name: 'Ukraine',
        },
        skills: [
          'Technical Analysis',
          'Volume Analysis',
          'Smart Money Concepts',
          'Wyckoff Method',
          'Risk Management',
        ],
      },
      nationality: {
        '@type': 'Country',
        name: 'Ukraine',
        alternateName: 'Украина',
      },
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
        { '@type': 'Language', name: 'Ukrainian', alternateName: 'uk' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      award: [
        'Кандидат у майстри спорту з шахів',
        'Вибір редакції TradingView',
        'Автор книги «Основы трейдинга» (ISBN 979-8-90243-075-9)',
        'Автор книги «Психология трейдинга» (ISBN 979-8-90243-081-0)',
        'Автор книги «Основы трейдинга Том 2» (ISBN 979-8-90243-078-0)',
        'Автор книги «Психологія трейдингу» (ISBN 979-8-90243-504-4)',
        'Автор книги «Trading Psychology» (ISBN 979-8-90243-138-1)',
      ],
      publishingPrinciples: 'https://arapov.trade/uk/freestudying',
      description:
        "Трейдер з 2013 року, автор безкоштовного курсу навчання трейдингу. Спеціалізація: Smart Money Concepts, метод Вайкоффа, об'ємний аналіз.",
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
      alumniOf: {
        '@type': 'Organization',
        name: 'Chess Federation',
        description: 'Кандидат у майстри спорту з шахів',
      },
      knowsAbout: [
        'Smart Money Concepts',
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Cryptocurrency Trading',
        'Risk Management',
        'Trading Psychology',
        'Market Structure',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Professional Trader',
          credentialCategory: 'Experience',
          dateCreated: '2013',
        },
      ],
      identifier: [
        {
          '@type': 'PropertyValue',
          propertyID: 'Google Knowledge Graph',
          value: 'kg:/g/11ysn_rm8l',
        },
        {
          '@type': 'PropertyValue',
          propertyID: 'ORCID',
          value: '0009-0003-0430-778X',
        },
        {
          '@type': 'PropertyValue',
          propertyID: 'Wikidata',
          value: 'Q137454477',
        },
      ],
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://orcid.org/0009-0003-0430-778X',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://www.youtube.com/@ArapovTrade',
        'https://www.linkedin.com/in/arapovtrade',
        'https://www.mql5.com/ru/signals/2246716?source=External',
        'https://t.me/ArapovTrade',
        'https://ru.wikibooks.org/wiki/Участник:IgorArapov',
        'https://www.google.com/search?kgmid=/g/11ysn_rm8l',
        'https://www.crunchbase.com/person/igor-arapov',
        'https://ru.wikibooks.org/wiki/Основы_трейдинга',
        'https://www.facebook.com/igor.arapov.75',
        'https://rutube.ru/channel/41668647',
        'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
        'https://isni.org/isni/0000000529518564',
        'https://bookwire.bowker.com/author/Igor-Arapov-40225801',
        'https://www.goodreads.com/author/show/66848566',
        'https://openlibrary.org/authors/OL16073686A',
        'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=Арапов%2C%20Ігор',
      ],
      url: 'https://arapov.trade/uk',
      mainEntityOfPage: 'https://arapov.trade/uk',
    });

    this.document.head.appendChild(script);
  }

  private addProfilePageSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'ProfilePage' &&
          json['name'] === 'Про автора - Арапов Ігор'
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
      '@type': 'ProfilePage',
      '@id': 'https://arapov.trade/uk/#page',
      url: 'https://arapov.trade/uk/',
      name: 'Про автора - Арапов Ігор',
      inLanguage: 'uk-UA',
      mainEntity: {
        '@id': 'https://arapov.trade/uk#person',
      },
      isPartOf: {
        '@id': 'https://arapov.trade/#website',
      },
      dateCreated: '2020-01-01T00:00:00+02:00', // ← Добавьте время
      dateModified: '2025-12-15T00:00:00+02:00', // ← Добавьте время
    });

    this.document.head.appendChild(script);
  }
  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'Person') {
          script.remove();
        }
        if (content['@type'] === 'ProfilePage') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }
}
