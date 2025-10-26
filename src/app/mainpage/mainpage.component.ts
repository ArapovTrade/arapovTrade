import { Component, OnInit, HostListener,AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router ,NavigationEnd } from '@angular/router';
import { ThemeservService } from '../servises/themeserv.service';
 import { Subscription } from 'rxjs';
declare var AOS: any;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss',
})
export class MainpageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private cdr:ChangeDetectorRef,
    private themeService:ThemeservService
  ) {
    
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
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.titleService.setTitle(
      'Навчання трейдерів торгівлі на біржі | Курс трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн',
    });

    this.meta.addTag({
      name: 'keywords',
      content:
        'трейдинг, навчання трейдингу, технічний аналіз, фінансова біржа, торгова система, Ігор Арапов',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
     
    this.meta.updateTag({ property: 'og:title', content: 'Навчання трейдерів торгівлі на біржі | Курс трейдингу від Ігоря Арапова' });
        this.meta.updateTag({
          property: 'og:description',
          content: 'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн',
        });
        this.meta.updateTag(      { property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '600' })
        this.meta.updateTag({
          property: 'og:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ property: 'og:url', content: 'https://arapov.trade' });

        // Оновлюємо Twitter Card теги
        this.meta.updateTag({
          name: 'twitter:card',
          content: `summary_large_image`,
        }); // Тип картки
        this.meta.updateTag({ name: 'twitter:title', content: 'Навчання трейдерів торгівлі на біржі | Курс трейдингу від Ігоря Арапова' });
        this.meta.updateTag({
          name: 'twitter:description',
          content: 'Безкоштовний курс з трейдингу Ігоря Арапова: 130 + статей і 70 відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн',
        });
        this.meta.updateTag({
          name: 'twitter:image',
          content: `https://arapov.trade/assets/img/default-og-image.png`,
        });
        this.meta.updateTag({ name: 'twitter:url', content: 'https://arapov.trade' });
        this.meta.updateTag({ name: 'language', content: 'uk' });
        this.meta.updateTag({ property: 'og:type', content: 'website' }); // или 'article'
        
this.meta.updateTag({ property: 'og:locale', content:  'uk_UA'   }); // ru_RU, uk_UA, en_US
this.meta.updateTag({ property: 'og:site_name', content: 'Arapov Trade' });














     
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
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
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
}
