import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit {
  constructor(private router: Router, private lang: LangService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
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

  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
    // this.registForm.reset();
  }

  registForm: any;
  ngOnInit() {
    this.lang.setNumber(1);
    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
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
