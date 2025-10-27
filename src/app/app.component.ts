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
  Inject,HostListener, OnDestroy
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
import { ThemeservService } from './servises/themeserv.service';
 import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked , OnDestroy{
 private routerSubscription!: Subscription;
    private themeSubscription!: Subscription;
   isDark !:boolean;

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
    private faqservise: FaqservService,
    private themeServ:ThemeservService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
     
  }
  langFAQ = '';
  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');
     
    // Замена языка в пути
    if (// тут тоже нужна логика для мейн пейдж
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
     this.themeSubscription =this.themeServ.getTheme().subscribe(data=>{
      this.isDark=data
       
    })
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
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

    // this.setDefaultMetaTags();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
    this.removeMetaDescriptionIfExists()
        
        const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, ''); // Отримуємо чистий шлях
        const segments = urlPath.split('/'); // Розбиваємо на сегменти
        const link = segments[segments.length - 1] || '';
        const article = this.artickle.getArticleByLink(link) || null;
        const langCode = urlPath.startsWith('uk') ? 'uk' : urlPath == '' ? 'uk' : urlPath.startsWith('en')?'en': 'ru';
        
        // FAQ

        this.addingFaqScript(langCode, urlPath);
        // Визначаємо мову та витягуємо відповідний заголовок
        const lang = urlPath.startsWith('uk')
          ? 'Ukr'
          : urlPath.startsWith('en')
          ? 'En'
          : 'Rus';
        const titleKey = `realTitle${lang}` as 'realTitleUkr' |  'realTitleRus'|  'realTitleEn'; // Обмежуємо ключі
        const titleDescr= `descr${lang}` as 'descrUkr' |  'descrRus'|  'descrEn';

        let title = '';
        if (article) {
          title = article[titleKey];
        } else if (segments[0] == '') {
          title = 'Навчання трейдерів торгівлі на біржі | Курс трейдингу від Ігоря Арапова';
          } else if (segments[1] === 'main' && segments[0] === 'ru') {
          title = 'Обучение трейдеров торговле на бирже | Курс трейдинга от Игоря Арапова';
          } else if (segments[1] === 'main' && segments[0] === 'en') {
          title = 'Stock Market Trading Training for Traders | Trading Course by Igor Arapov';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          title = 'Курсы по трейдингу онлайн | Обучение трейдингу с нуля';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          title = 'Курси трейдингу онлайн | Навчання трейдингу з нуля';
           } else if (segments[1] === 'studying' && segments[0] === 'en') {
          title = 'Online Trading Courses | Learn Trading from Scratch';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'freeeducation'
        ) {
          title =
            segments[0] === 'ru'
              ? 'Бесплатное обучение трейдингу для начинающих с нуля | Игорь Арапов'
              : segments[0] === 'uk'
              ? 'Безкоштовне навчання трейдингу для початківців | Ігор Арапов'
              : 'Free trading training for beginners from scratch | Igor Arapov';
        } else if (segments[1] === 'freestudying') {
          title =
            segments[0] === 'ru'
              ? 'Обучение трейдингу онлайн | Бесплатные курсы трейдеров от Игоря Арапова'
              :segments[0] === 'en'? 'Online Trading Training | Free Trading Courses from Igor Arapov'
              : 'Навчання трейдингу онлайн | Безкоштовні курси трейдерів від Ігоря Арапова';
        } else if (segments[0] === 'uk') {
          title = 'Навчання трейдингу з нуля безкоштовно | Ігор Арапов';
        } else if (segments[0] === 'en') {
          title = 'Free Trading Training from Scratch | Igor Arapov';
        }else {
          title = 'Обучение трейдингу с нуля бесплатно | Игорь Арапов';
        }


        console.log('title',title);
        

        let description = '';
        if (article) {
          description = article[titleDescr];



        }else if (segments[0] == '') {
          description =
            'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          description = 'Онлайн-курсы по трейдингу от Игоря Арапова — обучение трейдингу и инвестициям с нуля, дистанционно и бесплатно. Изучайте технический и фундаментальный анализ, торговые стратегии и управление рисками шаг за шагом.';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          description = 'Онлайн-курси з трейдингу від Ігоря Арапова — навчання трейдингу та інвестиціям з нуля, дистанційно та безкоштовно. Вивчайте технічний та фундаментальний аналіз, торгові стратегії та управління ризиками крок за кроком.';
          } else if (segments[1] === 'studying' && segments[0] === 'en') {
          description = 'Online trading courses by Igor Arapov — trading and investment education from scratch, remotely and free. Learn technical and fundamental analysis, trading strategies, and risk management step by step.';
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
              ? 'Бесплатное обучение трейдингу от Игоря Арапова — полный пошаговый курс с нуля, разбор торговых стратегий, управление рисками и практические занятия. Изучайте трейдинг и криптовалюты дистанционно и бесплатно.'
              :segments[0] === 'en'? 'Free online trading education by Igor Arapov — complete step-by-step course from scratch, analysis of trading strategies, risk management, and practical exercises. Learn trading and cryptocurrencies remotely and for free.'
              : 'Безкоштовне  навчання трейдингу від Ігоря Арапова — повний покроковий курс з нуля, розбір торгових стратегій, управління ризиками та практичні заняття. Вивчайте трейдинг і криптовалюти дистанційно та безкоштовно.';
        } else if (segments[0] === 'uk') {
          description =
            'Навчання трейдингу з нуля безкоштовно від Ігоря Арапова — курси трейдингу онлайн, технічний та фундаментальний аналіз, торгівля криптовалютами та валютними парами крок за кроком.';
        }else if (segments[0] === 'en') {
          description =
            'Free trading education from scratch by Igor Arapov — online trading courses, technical and fundamental analysis, trading cryptocurrencies and currency pairs step by step.';
        } else {
          description =
            'Обучение трейдингу с нуля бесплатно от Игоря Арапова — онлайн-курсы трейдинга, технический и фундаментальный анализ, торговля криптовалютами и валютными парами шаг за шагом.';
        }
         
        const image = article?.imgUkr || '/assets/redesignArapovTrade/img/author-page_main-block_img-light.png';
        const url = `https://arapov.trade${this.router.url}`;

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });

     

        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({
          property: 'og:description',
          content: description,
        });
        this.meta.updateTag(      { property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '600' })
        this.meta.updateTag({
          property: 'og:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ property: 'og:url', content: url });

        // Оновлюємо Twitter Card теги
        this.meta.updateTag({
          name: 'twitter:card',
          content: `summary_large_image`,
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
        this.meta.updateTag({ property: 'og:type', content: 'website' }); // или 'article'
        
this.meta.updateTag({ property: 'og:locale', content: (langCode=='ru'?'ru_RU':(langCode=='uk')?'uk_UA':'en_US') }); // ru_RU, uk_UA, en_US
this.meta.updateTag({ property: 'og:site_name', content: 'Arapov Trade' });

        this.document.documentElement.lang = langCode;
        this.generateBreadcrumbs();
        this.updateHreflangTags(); //hreflang
        this.updateCanonicalTag();
        this.updateMetaKeywords();
      });
  }

  private updateMetaKeywords() {
  
  // const currentUrl = this.router.url.split('?')[0];
 
  // const existingTag = this.document.querySelector('meta[name="keywords"]');
  // if (existingTag) {
  //   this.renderer.removeChild(this.document.head, existingTag);
  // }

   
  // const meta = this.renderer.createElement('meta');
  // this.renderer.setAttribute(meta, 'name', 'keywords');

 
  // const keywordsMap: Record<string, string> = {
  //   '/ru/freestudying/freeeducation': 'бесплатное обучение, трейдинг, курс трейдера, артапов трейд, торговля на бирже, уроки трейдинга',
  //   '/uk/freestudying/freeeducation': 'безкоштовне навчання, трейдинг, курс трейдера, арапов трейд, торгівля, уроки трейдингу',
  //   '/en/freestudying/freeeducation': 'free trading education, learn trading, forex, arapov trade, stock trading lessons',
  //   '/ru/freestudying/imbalanceintrading': 'дисбаланс на рынке, объемный анализ, смарт мани, уровни ликвидности, трейдинг стратегия',
  //   '/uk/freestudying/imbalanceintrading': 'дисбаланс на ринку, об’ємний аналіз, смарт мані, рівні ліквідності, стратегія трейдингу',
  //   '/en/freestudying/imbalanceintrading': 'imbalance in trading, order blocks, smart money, liquidity zones, trading education',
    
  // };

 
  // const keywords =
  //   keywordsMap[currentUrl] ||
  //   'arapov trade, trading education, forex, trading courses, learn trading online';

  // this.renderer.setAttribute(meta, 'content', keywords);
  // this.renderer.appendChild(this.document.head, meta);
}




  //delete description
  private removeMetaDescriptionIfExists() {
  const head = this.document.head;
  const metaDescription = head.querySelector('meta[name="description"]');
  if (metaDescription) {
    head.removeChild(metaDescription);
  }
}
//каноникал
private updateCanonicalTag() {
  // Удаляем старые канонические теги
  const existingCanonical = this.document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }

  // Создаём новый
  const canonicalLink = this.renderer.createElement('link');
  this.renderer.setAttribute(canonicalLink, 'rel', 'canonical');
  const url = `https://arapov.trade${this.router.url.split('?')[0]}`;
  this.renderer.setAttribute(canonicalLink, 'href', url);
  this.renderer.appendChild(this.document.head, canonicalLink);
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
    // this.meta.addTags([
    //   { property: 'og:type', content: 'article' },
    //   { property: 'og:image:width', content: '1200' },
    //   { property: 'og:image:height', content: '630' },
    //   { property: 'og:site_name', content: 'https://arapov.trade/' },

    //   // Базові Twitter Card теги
    //   { name: 'twitter:image', content: `https://arapov.trade/assets/img/default-og-image.png`},
    //   { name: 'twitter:card', content: `summary_large_image`}, // Дефолтний тип картки
    //   { name: 'twitter:site', content: '@Igor_Arapov1990' }, // Ваш Twitter акаунт (замініть)
    // ]);
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
    if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
      if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
      }
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
  // 1. Удаляем старые теги
  this.document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach(tag => tag.remove());

  const fullPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');
  const segments = fullPath.split('/');

  const LANGS = ['uk', 'ru', 'en'];

  let currentLang: string;
  let basePath: string;

  // === Главная страница (особый случай) ===
  if (fullPath === '' || fullPath === 'ru/main' || fullPath === 'en/main') {
    if (fullPath === '') {
      currentLang = 'uk';
      basePath = 'main';
    } else {
      currentLang = segments[0]; // ru или en
      basePath = 'main';
    }
  }
  // === Обычные страницы ===
  else {
    const firstSegment = segments[0];

    // Проверяем: первый сегмент — это язык?
    if (LANGS.includes(firstSegment)) {
      currentLang = firstSegment;
      // Убираем язык из пути
      basePath = segments.slice(1).join('/') || '';
    } else {
      // Если первый сегмент НЕ язык — считаем, что это украинская версия БЕЗ префикса
      // Но по правилам — такие URL не должны существовать! Однако на всякий случай:
      currentLang = 'uk';
      basePath = segments.join('/') || '';
    }
  }

  // === Генерация hreflang ===
  LANGS.forEach(lang => {
    let href: string;

    if (basePath === 'main') {
      // Главная страница
      if (lang === 'uk') {
        href = 'https://arapov.trade/';
      } else if (lang === 'ru') {
        href = 'https://arapov.trade/ru/main';
      } else {
        href = 'https://arapov.trade/en/main';
      }
    } else {
      // Обычная страница — ВСЕГДА с префиксом языка
      href = `https://arapov.trade/${lang}/${basePath}`;
      // Убираем двойной слеш, если basePath пустой
      href = href.replace(/\/$/, '');
    }

    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'alternate');
    this.renderer.setAttribute(link, 'hreflang', lang);
    this.renderer.setAttribute(link, 'href', href);
    this.renderer.appendChild(this.document.head, link);
  });

  // === x-default — русская версия ===
  const xDefaultHref = basePath === 'main'
    ? 'https://arapov.trade/ru/main'
    : `https://arapov.trade/ru/${basePath}`;

  const defaultLink = this.renderer.createElement('link');
  this.renderer.setAttribute(defaultLink, 'rel', 'alternate');
  this.renderer.setAttribute(defaultLink, 'hreflang', 'x-default');
  this.renderer.setAttribute(defaultLink, 'href', xDefaultHref);
  this.renderer.appendChild(this.document.head, defaultLink);
}


  // 

  scrollPosition: number = 0;
  circleRadius: number = 25;
  circumference: number = 2 * Math.PI * this.circleRadius;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(
      100,
      (this.scrollPosition / maxScroll) * 100
    );
    this.updateProgressRing(scrollPercentage);
    this.toggleButtonVisibility();
  }

  toggleButtonVisibility() {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    if (this.scrollPosition > 100) {
      // Показываем кнопку после 100px скролла
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  updateProgressRing(percentage: number) {
    const path = document.querySelector('.progress-ring__path') as SVGElement;
    const dashOffset =
      this.circumference - (percentage / 100) * this.circumference;
    path.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    path.style.strokeDashoffset = dashOffset.toString();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  hovered: string | null = null;
  
}
