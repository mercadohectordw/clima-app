import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clima-app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

    let lang = localStorage.getItem("lang");
    if (lang=="es" || lang=="en"){
      translate.use(lang);
    }
  }
}
