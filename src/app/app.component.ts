import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  RendererFactory2,
  AfterContentChecked,
  OnChanges,Inject 
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked  {
  dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;
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
    private languageService:ServLangueageService,
    private rendererFactory: RendererFactory2,private meta: Meta, private titleService: Title,
    private metaTegServ:MetaservService,
    @Inject(DOCUMENT) private document: Document 
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
    this.languageService.languageCode$.subscribe(code => {
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, ''); // Отримуємо чистий шлях
        const segments = urlPath.split('/'); // Розбиваємо на сегменти
        const link = segments[segments.length - 1] || '';
        const article = this.artickle.getArticleByLink(link)||null;
        const langCode = urlPath.startsWith('uk') ? 'uk' : urlPath.startsWith('en') ? 'en' : 'ru';
      
        // Визначаємо мову та витягуємо відповідний заголовок
        const lang = urlPath.startsWith('uk') ? 'Ukr' : urlPath.startsWith('en') ? 'En' : 'Rus';
        const titleKey = `title${lang}` as 'titleUkr' | 'titleEn' | 'titleRus'; // Обмежуємо ключі
        // let title =(article)? article[titleKey] : (segments[1]==='studying')?'Авторские Курсы по трейдингу': 'Обучение трейдингу с нуля - ArapovTrade';

        let title='';
        if(article){
          title = article[titleKey];
        }else if(segments[1]==='studying'&&segments[0]==='ru'){
          title='Авторские Курсы по трейдингу';
        }else if(segments[1]==='studying'&&segments[0]==='uk'){
          title='Авторські Курси з трейдингу';
        }else if(segments[0]==='uk'){
          title='Навчання трейдингу з нуля - ArapovTrade';
        }else{
          title='Обучение трейдингу с нуля - ArapovTrade'
        }

        let description ='';
         if(segments[1]==='studying'&&segments[0]==='ru'){
          description='Курсы по трейдингу для начинающих';
        }else if(segments[1]==='studying'&&segments[0]==='uk'){
          description='Курси з трейдингу для початківців';
        }else if(segments[0]==='uk'){
          description='Безкоштовне навчання трейдингу для початківців - ArapovTrade';
        }else{
          description='Бесплатное обучение трейдингу для начинающих - ArapovTrade'
        }

        // const description =(segments[1]==='studying')? 'Курсы по трейдингу для начинающих': `Бесплатное обучение трейдингу для начинающих - ArapovTrade`;
        const image = article?.imgUkr || 'assets/img/default-og-image.jpg';
        const url = `https://arapov.trade${this.router.url}`;
         
        // Оновлюємо теги
        // this.titleService.setTitle(title);
        // this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: `https://arapov.trade${image}` });
        this.meta.updateTag({ property: 'og:url', content: url });
         
        // Оновлюємо Twitter Card теги
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' }); // Тип картки
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: `https://arapov.trade${image}` });
        this.meta.updateTag({ name: 'twitter:url', content: url });
        this.meta.updateTag({ name: 'language', content: langCode }); 
        this.document.documentElement.lang = langCode;  
      });
  }

  private setDefaultMetaTags() {
    this.meta.addTags([
      { property: 'og:type', content: 'article' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'https://arapov.trade/' },

      // Базові Twitter Card теги
      { name: 'twitter:card', content: 'summary_large_image' }, // Дефолтний тип картки
      { name: 'twitter:site', content: '@Igor_Arapov1990' } // Ваш Twitter акаунт (замініть)
    ]);



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
            console.log(result.text);
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
}


