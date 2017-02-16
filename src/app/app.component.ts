import {Component, HostBinding} from "@angular/core";

import "../../public/src/styles.scss";

@Component({
  selector: 'angular-smd',
  template: `
        <md-sidenav-container class="example-sidenav-fab-container">
          <div class="smd-header">
            <md-toolbar color="primary">
                <button type="button" md-icon-button (click)="sidenav.toggle()">
                    <md-icon>menu</md-icon>
                </button>
                <span>Angular SMD</span>
                <div class="separator"></div>
                <md-select [(ngModel)]="theme" mdTooltip="Change the Page Theme!!">
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
          
          <md-sidenav #sidenav>
            <md-toolbar color="primary">
                <md-toolbar-row>Components</md-toolbar-row>
            </md-toolbar>
            
            <md-list>
              <md-list-item routerLink="demo-datatable" (click)="sidenav.close()">
                <p md-line>DataTable</p>
              </md-list-item>
              <md-list-item routerLink="demo-fab-speed-dial" (click)="sidenav.close()">
                <p md-line>Fab Speed Dial</p>
              </md-list-item>
            </md-list>
          </md-sidenav>
        </md-sidenav-container>
    `,
  styles: [`
    md-sidenav-container {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        display: block;
    }
    
    md-sidenav {
        min-width: 250px;
    }
    
    md-list-item {
        cursor: pointer;
        margin: 5px 3px;
    }
    
    md-list-item:hover {
        background-color: #e3e3e3;
    }
    
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
    
    .separator {
        flex: 1 1 auto;
    }
  `]
})
export class AppComponent {

  @HostBinding('class') theme:string = 'indigo-pink';

}
