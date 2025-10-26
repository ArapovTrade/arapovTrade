import { AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,  ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';

@Component({
  selector: 'app-ru-studying-home',
  templateUrl: './ru-studying-home.component.html',
  styleUrl: './ru-studying-home.component.scss',
})
export class RuStudyingHomeComponent implements OnInit , AfterViewInit, OnDestroy{
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
       private cdr:ChangeDetectorRef,
       private themeService:ThemeservService,
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

   
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  } 
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit(): void {
    this.lang.setNumber(2);
    this.titleService.setTitle(
      'Курсы по трейдингу онлайн | Обучение трейдингу с нуля'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторское ⏩ обучение трейдингу от ArapovTrade. ⭐ Дистанционное обучение трейдингу онлайн с нуля от Игоря Арапова.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, курсы по трейдингу, трейдинг, обучение трейдингу, обучение трейдингу онлайн, бесплатное обучение трейдингу, дистанционное обучение трейдингу ',
    });
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
  navigateToHomeWithId() {
    this.router
      .navigateByUrl('/ru')
      .then(() => {
        setTimeout(() => {
          this.scrollToRegistration();
        }, 100);
      })
      .catch((err) => {
        console.error('Navigation error:', err);
      });
  }
  scrollToRegistration() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Element with id "registrationRu" not found');
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
    const percent = Math.min(Math.max((scrollPos - start) / (end - start), 0), 1);
  
    progress.style.height = `${percent * 100}%`;
  }



}
