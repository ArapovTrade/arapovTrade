import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  RendererFactory2,
  AfterContentChecked,
  OnChanges,
  Inject,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './servises/articles.service';
import { LangService } from './servises/lang.service';
import { SearchServiceService } from './servises/search-service.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ServLangueageService } from './servises/serv-langueage.service';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { MetaservService } from './servises/metaserv.service';
import { DOCUMENT } from '@angular/common';
import { FaqservService } from './servises/faqserv.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked {
  dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;
  breadcrumbs: any[] = []; // Массив для хлебных крошек

  jsonLd: any; // Объект для JSON-LD
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artickle: ArticlesService,
    private lan: LangService,
    private cdr: ChangeDetectorRef,
    private searchSer: SearchServiceService,
    private languageService: ServLangueageService,
    private rendererFactory: RendererFactory2,
    private meta: Meta,
    private titleService: Title,
    private metaTegServ: MetaservService,
    @Inject(DOCUMENT) private document: Document,
    private faqservise: FaqservService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  langFAQ = '';
  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');

    // Замена языка в пути
    if (
      pathSegments[1] === 'uk' ||
      pathSegments[1] === 'en' ||
      pathSegments[1] === 'ru'
    ) {
      pathSegments[1] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    // Построение нового пути
    const newPath = pathSegments.join('/');
    this.artickle.selectedGroups = [];
    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
    });
  }

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setUkraine() {
    this.lan.setNumber(1);
  }
  setRussian() {
    this.lan.setNumber(2);
  }
  setEnglish() {
    this.lan.setNumber(3);
  }
  registForm: any;

  ngOnInit(): void {
    this.metaTegServ.addOrganizationSchema();
    this.languageService.languageCode$.subscribe((code) => {
      this.checkLang = code;
      this.searchSer.setLange(this.checkLang);
    });
    // this.getLang();
    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });

    this.setDefaultMetaTags();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
    this.removeMetaDescriptionIfExists()
        
        const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, ''); // Отримуємо чистий шлях
        const segments = urlPath.split('/'); // Розбиваємо на сегменти
        const link = segments[segments.length - 1] || '';
        const article = this.artickle.getArticleByLink(link) || null;
        const langCode = urlPath.startsWith('uk')
          ? 'uk'
          : urlPath == ''
          ? 'uk'
          : 'ru';

        // FAQ

        this.addingFaqScript(langCode, urlPath);
        // Визначаємо мову та витягуємо відповідний заголовок
        const lang = urlPath.startsWith('uk')
          ? 'Ukr'
          : urlPath.startsWith('en')
          ? 'En'
          : 'Rus';
        const titleKey = `title${lang}` as 'titleUkr' |  'titleRus'; // Обмежуємо ключі
        
        let title = '';
        if (article) {
          title = article[titleKey];
        } else if (segments[0] == '') {
          title = 'Безкоштовне навчання трейдингу — курс Ігоря Арапова';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          title = 'Авторские Курсы по трейдингу - Игорь Арапов';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          title = 'Авторські Курси з трейдингу - Ігор Арапов';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'freeeducation'
        ) {
          title =
            segments[0] === 'ru'
              ? 'Бесплатный курс по  трейдингу от Игоря Арапова'
              : segments[0] === 'uk'
              ? 'Безкоштовний курс з трейдингу від Ігоря Арапова'
              : 'Free trading course from Igor Arapov';
        } else if (segments[0] === 'uk') {
          title = 'Безкоштовне навчання трейдингу - Ігор Арапов';
        } else {
          title = 'Бесплатное обучение трейдингу - Игорь Арапов';
        }

        let description = '';
        if (segments[0] == '') {
          description =
            'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          description = 'Курсы по трейдингу для начинающих от Игоря Арапова';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          description = 'Курси з трейдингу для початківців від Ігоря Арапова';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'freeeducation'
        ) {
          description =
            segments[0] === 'ru'
              ? 'Бесплатный курс по трейдингу: 130+ статей и 70 видеоуроков. Изучите основы, анализ, психологию торговли и проверенные стратегии'
              : segments[0] === 'uk'
              ? 'Безкоштовний курс з трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії'
              : 'Free Trading Course: 130+ Articles and 70 Video Lessons. Learn the Basics, Analysis, Trading Psychology, and Proven Strategies';
        } else if (segments[1] === 'freestudying') {
          description =
            segments[0] === 'ru'
              ? 'Бесплатное обучение трейдингу от Игоря Арапова - подробный курс по трейдингу'
              : 'Безкоштовне навчання трейдингу від Ігоря Арапова - докладний курс з трейдингу';
        } else if (segments[0] === 'uk') {
          description =
            'Безкоштовне навчання трейдингу для початківців - Ігор Арапов';
        } else {
          description =
            'Бесплатное обучение трейдингу для начинающих - Игорь Арапов';
        }

        const image = article?.imgUkr || 'assets/img/default-og-image.png';
        const url = `https://arapov.trade${this.router.url}`;

         
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({
          property: 'og:description',
          content: description,
        });
        this.meta.updateTag({
          property: 'og:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ property: 'og:url', content: url });

        // Оновлюємо Twitter Card теги
        this.meta.updateTag({
          name: 'twitter:card',
          content: 'summary_large_image',
        }); // Тип картки
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({
          name: 'twitter:description',
          content: description,
        });
        this.meta.updateTag({
          name: 'twitter:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ name: 'twitter:url', content: url });
        this.meta.updateTag({ name: 'language', content: langCode });
        this.document.documentElement.lang = langCode;
        this.generateBreadcrumbs();
        this.updateHreflangTags(); //hreflang
      });
  }
  //delete description
  private removeMetaDescriptionIfExists() {
  const head = this.document.head;
  const metaDescription = head.querySelector('meta[name="description"]');
  if (metaDescription) {
    head.removeChild(metaDescription);
  }
}

  //FAQ
  private addingFaqScript(langcode: string, path: string) {
    const faqSchema = this.faqservise.returnSchema(langcode, path);

    const scriptss = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    let faqScript: HTMLScriptElement | any = null;
    scriptss.forEach((script) => {
      try {
        const jsonContent = JSON.parse(script.textContent || '{}');
        if (jsonContent['@type'] === 'FAQPage') {
          faqScript = script;
        }
      } catch (e) {
        // Игнорируем некорректный JSON
      }
    });

    // Если скрипт FAQPage найден, заменяем его
    if (faqScript) {
      faqScript.text = JSON.stringify(faqSchema);
    } else {
      // Если скрипт не найден, создаём новый

      const scriptr = this.document.createElement('script');
      scriptr.type = 'application/ld+json';
      scriptr.text = JSON.stringify(faqSchema);
      this.document.head.appendChild(scriptr);
    }
  }

  private setDefaultMetaTags() {
    this.meta.addTags([
      { property: 'og:type', content: 'article' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'https://arapov.trade/' },

      // Базові Twitter Card теги
      { name: 'twitter:card', content: 'summary_large_image' }, // Дефолтний тип картки
      { name: 'twitter:site', content: '@Igor_Arapov1990' }, // Ваш Twitter акаунт (замініть)
    ]);
  }

  private generateBreadcrumbs() {
    const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');

    this.breadcrumbs = []; // Определяем хлебные крошки в зависимости от маршрута
    if (urlPath === '' || urlPath === '/') {
      this.breadcrumbs.push({ name: 'Головна', url: 'https://arapov.trade' });
    } else if (urlPath === 'ru' || urlPath === 'uk' || urlPath === 'en') {
      if (urlPath === 'ru') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' }
        );
      } else if (urlPath === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' }
        );
      } else if (urlPath === 'en') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Course author', url: 'https://arapov.trade/en' }
        );
      }
    } else if (
      urlPath === 'ru/studying' ||
      urlPath === 'uk/studying' ||
      urlPath === 'en/studying'
    ) {
      if (urlPath === 'ru/studying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Обучение трейдингу',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      } else if (urlPath === 'uk/studying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Навчання трейдингу',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      } else if (urlPath === 'en/studying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Trading training',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying' ||
      urlPath === 'uk/freestudying' ||
      urlPath === 'en/freestudying'
    ) {
      if (urlPath === 'ru/freestudying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          }
        );
      } else if (urlPath === 'uk/freestudying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          }
        );
      } else if (urlPath === 'en/freestudying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying/freeeducation' ||
      urlPath === 'uk/freestudying/freeeducation' ||
      urlPath === 'en/freestudying/freeeducation'
    ) {
      if (urlPath === 'ru/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Бесплатные курсы по трейдингу',
            url: 'https://arapov.trade/ru/freestudying/freeeducation',
          }
        );
      } else if (urlPath === 'uk/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Безкоштовні курси з трейдингу',
            url: 'https://arapov.trade/uk/freestudying/freeeducation',
          }
        );
      } else if (urlPath === 'en/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Free Trading Courses',
            url: 'https://arapov.trade/en/freestudying/freeeducation',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying/practic' ||
      urlPath === 'uk/freestudying/practic' ||
      urlPath === 'en/freestudying/practic'
    ) {
      if (urlPath === 'ru/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Торговая система трейдера',
            url: 'https://arapov.trade/ru/freestudying/practic',
          }
        );
      } else if (urlPath === 'uk/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Торгова система трейдера',
            url: 'https://arapov.trade/uk/freestudying/practic',
          }
        );
      } else if (urlPath === 'en/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trader`s trading system',
            url: 'https://arapov.trade/en/freestudying/practic',
          }
        );
      }
    } else if (
      urlPath === 'ru/disclaimer' ||
      urlPath === 'uk/disclaimer' ||
      urlPath === 'en/disclaimer'
    ) {
      if (urlPath === 'ru/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Отказ от ответственности',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      } else if (urlPath === 'uk/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Відмова від відповідальності',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      } else if (urlPath === 'en/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Disclaimer',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      }
    } else {
      const urlArr = urlPath.split('/');

      if (urlArr[0] === 'ru') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Теория по трейдингу',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      } else if (urlArr[0] === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Теорія з трейдингу',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      } else if (urlArr[0] === 'en') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trading Theory',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      }
    }
    // Генерируем JSON-LD
    this.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
    // Динамически обновляем <script> в DOM
    this.updateJsonLdScript();
  }
  // Метод для динамического обновления JSON-LD в DOM
  private updateJsonLdScript() {
    // Удаляем старый скрипт, если он есть
    const existingScript = this.document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }
    // Создаем новый скрипт
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setProperty(
      script,
      'textContent',
      JSON.stringify(this.jsonLd)
    );
    // this.renderer.appendChild(this.document.head, script);
    this.renderer.insertBefore(
      this.document.head,
      script,
      this.document.head.firstChild
    );
  }

  getLang() {
    this.lan
      .getNumber()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.checkLang = value;
        this.searchSer.setLange(this.checkLang);
      });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
    // this.registForm.reset();
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
          'zvCuOnVqiMJMycGQ0'
        )
        .then(
          (result: EmailJSResponseStatus) => {
             
            this.registForm.reset(); // Сброс формы после успешной отправки
          },
          (error) => {
            console.error(error.text);
          }
        );
    }
  }
  close() {
    this.registForm.reset();

    this.flag = true;
    this.flagTrue = false;
  }
  // hreflang
  private updateHreflangTags() {
    // Удаляем существующие hreflang теги, чтобы избежать дублирования
    const existingHreflangTags = this.document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    existingHreflangTags.forEach((tag) => tag.remove());
    // Определяем текущий путь без параметров запроса
    const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');
    const segments = urlPath.split('/');
    const currentLang =
      segments[0] === 'uk' || segments[0] === 'ru' ? segments[0] : 'uk';
    // Определяем базовый путь без языка
    const basePath =
      (segments[0] === 'uk' || segments[0] === 'ru') && segments.length > 1
        ? segments.slice(1).join('/')
        : '';
    // Для корневой страницы (arapov.trade/) добавляем только hreflang="uk"
    if (urlPath === '') {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', 'uk');
      this.renderer.setAttribute(link, 'href', 'https://arapov.trade/');
      this.renderer.appendChild(this.document.head, link);
      
      return;
    }
    // Для остальных страниц (arapov.trade/uk, arapov.trade/ru и других)
    const supportedLanguages = [
      { code: 'uk', hreflang: 'uk' },
      { code: 'ru', hreflang: 'ru' },
    ];
    // Добавляем тег hreflang для каждого языка
    supportedLanguages.forEach((lang) => {
      const href =
        lang.code === 'uk'
          ? `https://arapov.trade/${basePath ? 'uk/' + basePath : 'uk'}`
          : `https://arapov.trade/${basePath ? 'ru/' + basePath : 'ru'}`;
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', lang.hreflang);
      this.renderer.setAttribute(link, 'href', href);
      this.renderer.appendChild(this.document.head, link);
    });
    // Добавляем hreflang="x-default" (используем русскую версию как дефолтную)
    const defaultHref =
      basePath === ''
        ? 'https://arapov.trade/ru'
        : `https://arapov.trade/ru/${basePath}`;
    const defaultLink = this.renderer.createElement('link');
    this.renderer.setAttribute(defaultLink, 'rel', 'alternate');
    this.renderer.setAttribute(defaultLink, 'hreflang', 'x-default');
    this.renderer.setAttribute(defaultLink, 'href', defaultHref);
    this.renderer.appendChild(this.document.head, defaultLink);
   
  }
}
