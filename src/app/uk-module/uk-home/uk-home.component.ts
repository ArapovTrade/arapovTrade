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
    this.addEventSchema();
    this.addBooksSchema();

    this.titleService.setTitle(
      'Ігор Арапов — незалежний дослідник, трейдер, автор',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-24' });
     
    this.meta.updateTag({
      name: 'citation_keywords',
      content:
        'когнітивні упередження, поведінкові фінанси, трейдинг, УДК 336.76:159.9',
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Ігор Арапов — незалежний дослідник у галузі психології інвестиційних рішень та поведінкових фінансів, практикуючий трейдер з 2013 року, автор серії книг з трейдингу.',
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

      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      birthDate: '1990-09-30',
      givenName: 'Ігор',
      familyName: 'Арапов',
      jobTitle: 'Незалежний дослідник, трейдер, автор і засновник arapov.trade',
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',

      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Independent Researcher',
          description:
            'Незалежний дослідник у галузі поведінкових фінансів та психології інвестиційних рішень',
        },
        {
          '@type': 'Occupation',
          name: 'Trader',
          description: 'Практикуючий трейдер на фінансових ринках з 2013 року',
        },
      ],
      affiliation: {
        '@type': 'Organization',
        name: 'Національний університет харчових технологій (НУХТ)',
        url: 'https://nuft.edu.ua/',
        sameAs: 'https://www.wikidata.org/wiki/Q4315127',
      },

      nationality: {
        '@type': 'Country',
        name: 'Ukraine',
        alternateName: 'Україна',
      },
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
        { '@type': 'Language', name: 'Ukrainian', alternateName: 'uk' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      award: [
        'Кандидат у майстри спорту з шахів',
        'Вибір редакції TradingView',
      ],
      publishingPrinciples: 'https://arapov.trade/uk/freestudying',

      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },

      knowsAbout: [
        'behavioral finance',
        'cognitive biases',
        'trading psychology',
        'psychology of investment decisions',
        'behavioural economics',
        'Smart Money Concepts',
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Cryptocurrency Trading',
        'Risk Management',
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
        'https://www.researchgate.net/scientific-contributions/I-V-Arapov-2341564479',
        'https://www.semanticscholar.org/author/2421286270',
        'https://papers.ssrn.com/Sol3/Cf_Dev/AbsByAuth.cfm?per_id=10402456',
        'https://openalex.org/authors/a5127355048',
        'https://www.wikidata.org/wiki/Q137454477',
        'https://ssrn.com/author=10402456',
        'https://scholar.google.com/citations?hl=uk&user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://www.google.com/search?kgmid=/g/11ysn_rm8l',
        'https://isni.org/isni/0000000529518564',
        'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=Арапов%2C%20Ігор',
      ],
      url: 'https://arapov.trade/uk',
      mainEntityOfPage: 'https://arapov.trade/uk',

      subjectOf: [
        {
          '@type': 'Article',
          url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-–-zdobuvacham-osvitnoyi-programi',
          name: 'Про трейдинг і біржову діяльність – здобувачам освітньої програми «Цифровий бізнес»',
          datePublished: '2026-03-19T00:00:00Z',
          image:
            'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
          author: { '@id': 'https://arapov.trade/uk#person' },
          headline:
            'Про трейдинг і біржову діяльність – здобувачам освітньої програми «Цифровий бізнес»',
          publisher: {
            '@type': 'Organization',
            name: 'Національний університет харчових технологій',
            url: 'https://nuft.edu.ua',
          },
        },
      ],

      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Oles Honchar Dnipro National University',
          url: 'https://www.dnu.dp.ua/',
        },
        {
          '@type': 'Organization',
          name: 'Chess Federation',
          description: 'Кандидат у майстри спорту з шахів',
        },
      ],
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
      '@id': 'https://arapov.trade/uk#page',
      url: 'https://arapov.trade/uk',
      name: 'Про автора - Арапов Ігор',
      inLanguage: 'uk-UA',
      mainEntity: {
        '@id': 'https://arapov.trade/uk#person',
      },
      isPartOf: {
        '@id': 'https://arapov.trade#website',
      },
      dateCreated: '2020-01-01T00:00:00+02:00', // ← Добавьте время
      dateModified: '2026-04-21T00:00:00+02:00', // ← Добавьте время
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
        if (content['@type'] === 'Event') {
          script.remove();
        }
        if (content['@type'] === 'Book') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  private addEventSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'Event' &&
          json['name'] === 'Гостьова лекція з трейдингу та біржової діяльності'
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
      '@type': 'Event',
      name: 'Гостьова лекція з трейдингу та біржової діяльності',
      description:
        "Гостьова лекція для здобувачів освітньої програми «Цифровий бізнес» НУХТ, присвячена устрою організованих фінансових ринків, структурі CME Group та аналізу ф'ючерсу на золото.",
      startDate: '2026-03-19T00:00:00+02:00',
      endDate: '2026-03-19T23:59:00+02:00',
      eventStatus: 'https://schema.org/EventScheduled',
      image:
        'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
      location: {
        '@type': 'Place',
        name: 'Національний університет харчових технологій',
        sameAs: 'https://www.wikidata.org/wiki/Q4315127',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'вул. Володимирська 68',
          addressLocality: 'Київ',
          addressCountry: {
            '@type': 'Country',
            name: 'UA',
          },
        },
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'UAH',
        availability: 'https://schema.org/InStock',
        url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-–-zdobuvacham-osvitnoyi-programi',
        validFrom: '2026-03-19T00:00:00+02:00',
      },
      organizer: {
        '@type': 'Organization',
        name: 'НУХТ',
        url: 'https://nuft.edu.ua',
      },
      url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-–-zdobuvacham-osvitnoyi-programi',
      performer: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/uk#person',
        name: 'Ігор Арапов',
      },
    });

    this.document.head.appendChild(script);
  }

  private addBooksSchema(): void {
    const SCRIPT_ID = 'global-schema';

    if (this.document.getElementById(SCRIPT_ID)) return;

    const AUTHOR_ID = 'https://arapov.trade/uk#author';
    const COAUTHOR_ID = 'https://nuft.edu.ua/nnieiy/kafedra-et/#inna-sytnyk';

    const books = [
      {
        '@type': 'Book',
        name: 'Психологія трейдингу: Як керувати емоціями та мислити як професіонал',
        isbn: '979-8-90243-504-4',
        inLanguage: 'uk',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18396377',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
      {
        '@type': 'Book',
        name: 'Психология трейдинга: Как управлять эмоциями и мыслить как профессионал',
        isbn: '979-8-90243-081-0',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057875'],
      },
      {
        '@type': 'Book',
        name: 'Trading psychology. How to Master Your Emotions and Think Like a Professional',
        isbn: '979-8-90243-138-1',
        inLanguage: 'en',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18057306',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
      {
        '@type': 'Book',
        name: "Теорія трейдингу. Основи ринку • Технічний аналіз • Об'ємний аналіз",
        isbn: '979-8-90243-730-7',
        inLanguage: 'uk',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18396300',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
      {
        '@type': 'Book',
        name: 'Теория трейдинга. Основы рынка • Технический анализ • Объёмный анализ',
        isbn: '979-8-90243-075-9',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057849'],
      },
      {
        '@type': 'Book',
        name: 'Trading fundamentals. Market Basics • Technical Analysis • Volume Analysis',
        isbn: '979-8-90243-734-5',
        inLanguage: 'en',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18364022',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
      {
        '@type': 'Book',
        name: "Методи аналізу. Технічний аналіз • Об'ємний аналіз • Практика",
        isbn: '979-8-90243-732-1',
        inLanguage: 'uk',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18396338',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
      {
        '@type': 'Book',
        name: 'Методы анализа. Технический анализ • Объёмный анализ • Практика',
        isbn: '979-8-90243-078-0',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057863'],
      },
      {
        '@type': 'Book',
        name: 'Analysis methods. Technical Analysis • Volume Analysis • Practice',
        isbn: '979-8-90243-755-0',
        inLanguage: 'en',
        sameAs: [
          'https://doi.org/10.5281/zenodo.18364066',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?...',
        ],
      },
    ];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        // 👤 основной автор
        {
          '@type': 'Person',
          '@id': AUTHOR_ID,
          name: 'Igor Arapov',
          sameAs: ['https://www.wikidata.org/wiki/Q137454477'],
        },

        // 👤 соавтор
        {
          '@type': 'Person',
          '@id': COAUTHOR_ID,
          name: 'Inna Sytnyk',
          sameAs: ['https://www.wikidata.org/wiki/Q138787550'],
        },

        // 📄 статья (журнал)
        {
          '@type': 'ScholarlyArticle',
          name: 'Психологія інвестиційних рішень: когнітивні упередження роздрібних трейдерів на фінансових ринках',
          headline:
            'Psychology of Investment Decisions: Cognitive Biases of Retail Traders in Financial Markets',
          sameAs: ['https://doi.org/10.32702/2306-6814.2026.4.96'],
          datePublished: '2026-02-17T00:00:00Z',
          inLanguage: 'ru',
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'UDC',
            value: '336.76:159.9',
          },
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
          isPartOf: {
            '@type': 'Periodical',
            name: 'Investytsiyi: praktyka ta dosvid',
            issn: '2306-6814',
          },
          author: [{ '@id': AUTHOR_ID }, { '@id': COAUTHOR_ID }],
        },

        // 📄 статья (SSRN / Zenodo)
        {
          '@type': 'ScholarlyArticle',
          name: "From Tilt to System: A Practitioner's Framework for Managing Cognitive Biases in Retail Trading",
          headline:
            'From Tilt to System: A Practitioner`s Framework for Managing Cognitive Biases in Retail Trading',
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
          sameAs: ['https://doi.org/10.5281/ZENODO.18792055'],
          url: 'https://ssrn.com/abstract=6254718',
          inLanguage: 'en',
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'UDC',
            value: '336.76:159.9',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Social Science Research Network (SSRN)',
          },
          author: { '@id': AUTHOR_ID },
        },

        // 📚 книги
        ...books.map((book) => ({
          ...book,
          author: { '@id': AUTHOR_ID },
        })),
      ],
    };

    const script = this.document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    this.document.head.appendChild(script);
  }
}
