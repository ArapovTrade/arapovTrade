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
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../servises/themeserv.service';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-ru-home',
  templateUrl: './ru-home.component.html',
  styleUrl: './ru-home.component.scss',
})
export class RuHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,

    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
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
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;

  registForm: any;

  ngOnInit(): void {
    this.lang.setNumber(2);
    this.removeExistingWebPageSchema();
    this.addPersoneSchema();
    this.addProfilePageSchema();
    this.addEventSchema();
    this.addBooksSchema();
    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
    this.titleService.setTitle(
      'Игорь Арапов — независимый исследователь, трейдер, автор',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-24' });
     this.meta.updateTag({
      name: 'citation_keywords',
      content:
        'когнитивные искажения, поведенческие финансы, трейдинг, УДК 336.76:159.9',
    });
    this.meta.updateTag({
      name: 'description',
      content:
        'Игорь Арапов — независимый исследователь в области психологии инвестиционных решений и поведенческих финансов, практикующий трейдер с 2013 года, автор серии книг по трейдингу.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'обучение трейдингу, курсы трейдинга, трейдинг онлайн, трейдинг с нуля, криптовалюты, валютные пары',
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
  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
  }

  onSubmit(registForm: FormGroup) {
    if (
      registForm.value.userName &&
      registForm.value.userEmail &&
      registForm.value.userMessage
    ) {
      const templateParams = {
        userName: registForm.value.userName,
        userEmail: registForm.value.userEmail,
        userMessage: registForm.value.userMessage,
      };

      emailjs
        .send(
          'service_qomgf4f',
          'template_jif62uq',
          templateParams,
          'zvCuOnVqiMJMycGQ0',
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
            this.registForm.reset(); // Сброс формы после успешной отправки
          },
          (error) => {
            console.error(error.text);
          },
        );
    }
  }
  close() {
    this.registForm.reset();

    this.flag = true;
    this.flagTrue = false;
  }

  //
  scrollToRegistrationRu() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  private addPersoneSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'Person' && json['name'] === 'Игорь Арапов';
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      birthDate: '1990-09-30',
      givenName: 'Игорь',
      familyName: 'Арапов',
      jobTitle:
        'Независимый исследователь, трейдер, автор и основатель arapov.trade',
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',

      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Independent Researcher',
          description:
            'Независимый исследователь в области поведенческих финансов и психологии инвестиционных решений',
        },
        {
          '@type': 'Occupation',
          name: 'Trader',
          description: 'Практикующий трейдер на финансовых рынках с 2013 года',
        },
      ],
      affiliation: {
      '@type': 'Organization',
      'name': 'Национальный университет пищевых технологий (НУХТ)',
      'url': 'https://nuft.edu.ua/',
      'sameAs': 'https://www.wikidata.org/wiki/Q4315127'
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
        'Кандидат в мастера спорта по шахматам',
        'Выбор редакции TradingView',
      ],
      publishingPrinciples: 'https://arapov.trade/ru/freestudying',

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

      url: 'https://arapov.trade/ru',
      mainEntityOfPage: 'https://arapov.trade/ru',

      subjectOf: [
        {
          '@type': 'Article',
          url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-–-zdobuvacham-osvitnoyi-programi',
          name: 'Гостевая лекция по трейдингу и биржевой деятельности для студентов образовательной программы «Цифровой бизнес»',
          datePublished: '2026-03-19T00:00:00Z',
          image:
            'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
         author: { '@id': 'https://arapov.trade/ru#person' },
          headline:
            'Про трейдинг і біржову діяльність – здобувачам освітньої програми «Цифровий бізнес»',
          publisher: {
            '@type': 'Organization',
            name: 'Национальный университет пищевых технологий',
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
          description: 'Кандидат в мастера спорта по шахматам',
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
          json['name'] === 'Про автора - Арапов Игорь'
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
      '@id': 'https://arapov.trade/ru',
      url: 'https://arapov.trade/ru',
      name: 'Про автора - Арапов Игорь',
      inLanguage: 'ru-RU',
      mainEntity: {
      '@id': 'https://arapov.trade/ru#person', // Связь с объектом Person
      '@type': 'Person',
      'name': 'Игорь Арапов',
      // УКАЗЫВАЕМ ВАШИ НАУЧНЫЕ СТАТЬИ ЗДЕСЬ:
       
    },
      isPartOf: {
        '@id': 'https://arapov.trade/ru/main#website',
      },
      dateCreated: '2020-01-01T00:00:00+02:00', // ← Добавьте время
      dateModified: '2026-04-21T00:00:00+02:00', // ← Добавьте время
    });

    this.document.head.appendChild(script);
  }

  private addEventSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'Event' &&
          json['name'] ===
            'Гостевая лекция по трейдингу и биржевой деятельности'
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
      name: 'Гостевая лекция по трейдингу и биржевой деятельности',
      description:
        'Гостевая лекция для студентов образовательной программы «Цифровой бизнес» НУХТ, посвящённая устройству организованных финансовых рынков, структуре CME Group и анализу фьючерса на золото.',
      startDate: '2026-03-19T00:00:00+02:00',
      endDate: '2026-03-19T23:59:00+02:00',
      eventStatus: 'https://schema.org/EventScheduled',
      image:
        'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
      location: {
        '@type': 'Place',
        name: 'Национальный университет пищевых технологий',
        sameAs: 'https://www.wikidata.org/wiki/Q4315127',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Владимирская 68',
          addressLocality: 'Киев',
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
        '@id': 'https://arapov.trade/ru#person',
        name: 'Игорь Арапов',
      },
    });

    this.document.head.appendChild(script);
  }

  private addBooksSchema(): void {
    const SCRIPT_ID = 'global-schema';

    if (this.document.getElementById(SCRIPT_ID)) return;

    const AUTHOR_ID = 'https://arapov.trade/ru#person';
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
          name: 'Психология инвестиционных решений: когнитивные предубеждения розничных трейдеров на финансовых рынках',
          headline:
            'Psychology of Investment Decisions: Cognitive Biases of Retail Traders in Financial Markets',
          sameAs: ['https://doi.org/10.32702/2306-6814.2026.4.96'],
          datePublished: '2026-02-17T00:00:00Z',
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
          inLanguage: 'ru',
          'identifier': {
        '@type': 'PropertyValue',
        'propertyID': 'UDC',
        'value': '336.76:159.9'
      },
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
          sameAs: ['https://doi.org/10.5281/ZENODO.18792055'],
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
          url: 'https://ssrn.com/abstract=6254718',
          inLanguage: 'en',
          'identifier': {
        '@type': 'PropertyValue',
        'propertyID': 'UDC',
        'value': '336.76:159.9'
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
