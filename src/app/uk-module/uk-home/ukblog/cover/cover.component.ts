import { ChangeDetectorRef, Component, Renderer2, RendererFactory2,
   
  Inject,   AfterViewInit, OnDestroy,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../../servises/articles.service';
import { LangService } from '../../../../servises/lang.service';
import { SearchServiceService } from '../../../../servises/search-service.service';
import { ServLangueageService } from '../../../../servises/serv-langueage.service';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { MetaservService } from '../../../../servises/metaserv.service';
 import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss'
})
export class CoverComponent implements OnInit, AfterViewInit, OnDestroy{
dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;
  breadcrumbs: any[] = []; // Массив для хлебных крошек

  jsonLd: any; // Объект для JSON-LD
  

   
  constructor( private router: Router,
      private route: ActivatedRoute,
      private artickle: ArticlesService,
      private lan: LangService,
      private cdr: ChangeDetectorRef,
      private searchSer: SearchServiceService,
      private languageService: ServLangueageService,
      private themeService:ThemeservService,
      private rendererFactory: RendererFactory2,
     @Inject(DOCUMENT) private document: Document,
      private meta: Meta,
         private titleService: Title,
         private metaTegServ: MetaservService,
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
menuOpen: boolean = false;
  isMenuOpen = false;
isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
   private routerSubscription!: Subscription;
    private themeSubscription!: Subscription;
  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
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

 //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }


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




      //  this.metaTegServ.addOrganizationSchema();
      this.languageService.languageCode$.subscribe((code) => {
        this.checkLang = code;
        this.searchSer.setLange(this.checkLang);
      });
        //  this.setDefaultMetaTags();
  
       
  
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
      this.removeMetaDescriptionIfExists()
          
          
        });
    }







    private setDefaultMetaTags() {
    
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
   hovered: string | null = null;
     //delete description
  private removeMetaDescriptionIfExists() {
  const head = this.document.head;
  const metaDescription = head.querySelector('meta[name="description"]');
  if (metaDescription) {
    head.removeChild(metaDescription);
  }
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
      segments[0] === 'uk' || segments[0] === 'ru' || segments[0] === 'en' ? segments[0] : 'uk';
    // Определяем базовый путь без языка
    const basePath =
      (segments[0] === 'uk' || segments[0] === 'ru'|| segments[0] === 'en' ) && segments.length > 1
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
      { code: 'en', hreflang: 'en' },
    ];
    // Добавляем тег hreflang для каждого языка
    supportedLanguages.forEach((lang) => {
      const href =
        lang.code === 'uk'
          ? `https://arapov.trade/${basePath ? 'uk/' + basePath : 'uk'}`
          : lang.code === 'en'
    ? `https://arapov.trade/${basePath ? 'en/' + basePath : 'en'}`
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

   
  // Метод для динамического обновления JSON-LD в DOMъъъ

private generateBreadcrumbs() {
  const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');
  const segments = urlPath.split('/');
  const lang = ['ru', 'uk', 'en'].includes(segments[0]) ? segments[0] : 'ru';
  this.breadcrumbs = [];

  // Базовые URL для языков
  const baseUrls: Record<string, string> = {
    ru: 'https://arapov.trade/ru',
    uk: 'https://arapov.trade/uk',
    en: 'https://arapov.trade/en',
  };

  // Названия страниц по языкам
  const names: Record<string, Record<string, string>> = {
    main: { ru: 'Главная', uk: 'Головна', en: 'Main' },
    author: { ru: 'Автор курса', uk: 'Автор курсу', en: 'Author of the Course' },
    studying: { ru: 'Обучение трейдингу', uk: 'Навчання трейдингу', en: 'Trading training' },
    freestudying: { ru: 'Бесплатное обучение трейдингу', uk: 'Безкоштовне навчання трейдингу', en: 'Free trading education' },
    freeeducation: { ru: 'Бесплатные курсы по трейдингу', uk: 'Безкоштовні курси з трейдингу', en: 'Free Trading Courses' },
    practic: { ru: 'Торговая система трейдера', uk: 'Торгова система трейдера', en: "Trader's trading system" },
    disclaimer: { ru: 'Отказ от ответственности', uk: 'Відмова від відповідальності', en: 'Disclaimer' },
    theory: { ru: 'Теория по трейдингу', uk: 'Теорія з трейдингу', en: 'Trading Theory' },
  };

  // Функция для добавления крошки
  const addBreadcrumb = (key: string, suffix?: string) => {
    const url = suffix ? `${baseUrls[lang]}/${suffix}` : baseUrls[lang];
    this.breadcrumbs.push({ name: names[key][lang], url });
  };

  // Главная крошка
  if (!urlPath) {
    this.breadcrumbs.push({ name: names['main'][lang], url: 'https://arapov.trade' });
  } else {
    addBreadcrumb('main');   // Главная
    addBreadcrumb('author'); // Автор курса

    const page = segments[1];

    if (page === 'studying') {
      addBreadcrumb('studying', 'studying');
    } else if (page === 'freestudying') {
      addBreadcrumb('freestudying', 'freestudying');

      if (segments[2] === 'freeeducation') {
        addBreadcrumb('freeeducation', 'freestudying/freeeducation');
      } else if (segments[2] === 'practic') {
        addBreadcrumb('practic', 'freestudying/practic');
      } else if (segments[2]) {
        addBreadcrumb('theory', `freestudying/${segments[2]}`);
      }
    } else if (page === 'disclaimer') {
      addBreadcrumb('disclaimer', 'disclaimer');
    }
  }

  // Генерация JSON-LD
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

  // Обновляем <script> JSON-LD в DOM
  this.updateJsonLdScript();
}




  
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

  navigateTo(link:string){
    this.menuOpen=false;
    
    this.router.navigate([link]);


  }

   toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;

     
  }
   
}
