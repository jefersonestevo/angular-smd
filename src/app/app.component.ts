import {Component, HostBinding} from "@angular/core";

import "../../public/src/styles.scss";

@Component({
  selector: 'angular-smd',
  template: `
        <div class="smd-header">
          <md-toolbar color="primary">
              <span>Angular SMD</span>
              <md-select [(ngModel)]="theme">
                  <md-option value="indigo-pink">indigo-pink</md-option>
                  <md-option value="deeppurple-amber">deeppurple-amber</md-option>   
                  <md-option value="pink-bluegrey">pink-bluegrey</md-option>   
                  <md-option value="purple-green">purple-green</md-option>   
              </md-select>
          </md-toolbar>
        </div>
        <div class="smd-content">
            <router-outlet></router-outlet>
        </div>
    `,
  styles: [`
    .smd-header {
        width: 100%;
        z-index: 100;
    }     
    
    .smd-header span {
        margin-right: 30px;
    }
         
    .smd-content {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
  `]
})
export class AppComponent {

  @HostBinding('class') theme:string = 'indigo-pink';

}
