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
       private cdr:ChangeDetectorRef,
    private themeService:ThemeservService,
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
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
        offset: 100
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
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.titleService.setTitle('Авторське навчання трейдингу від Ігоря Арапова');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Онлайн-курс трейдингу від Ігоря Арапова — стартуйте з нуля і навчіться впевнено торгувати на фінансових ринках крок за кроком.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курси трейдингу, трейдинг, валюти, навчання трейдингу, безкоштовне навчання трейдингу, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг курси безкоштовно, трейдинг з нуля, курси по трейдингу',
    });

    this.lang.setNumber(1);

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
    
}
