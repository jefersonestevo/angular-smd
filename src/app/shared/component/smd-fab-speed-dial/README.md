# Simple Material Design Datatable

Angular 2 FAB Speed Dial based on [AngularJS FAB Speed Dial](https://material.angularjs.org/latest/demo/fabSpeedDial)

### Usage

    <smd-fab-speed-dial [(open)]="open" [direction]="direction" [animationMode]="animationMode" [fixed]="fixed">
        <smd-fab-trigger>
            <button md-fab (click)="actionX()"><md-icon>check</md-icon></button>
        </smd-fab-trigger>

        <smd-fab-actions>
            <button md-mini-fab (click)="action1()"><md-icon>add</md-icon></button>
            <button md-mini-fab (click)="action2()"><md-icon>edit</md-icon></button>
            <button md-mini-fab (click)="action3()"><md-icon>menu</md-icon></button>
        </smd-fab-actions>
    </smd-fab-speed-dial>
    
### Properties

#### smd-fab-speed-dial

| Property         | Type         | Default             | Description                                     |
|------------------|--------------|---------------------|-------------------------------------------------|
| open             | boolean      | false               | Indicates if this FAB Speed Dial is opened      |
| direction        | up, down, left or right | up       | The direction to open the action buttons        |
| animationMode    | fling or scale | fling             | The animation to apply when opening the action buttons |
| fixed            | boolean      | false               | Indicates if this FAB Speed Dial is fixed (user cannot change the open state on click) |

  
### TODO List

 - Change color of the fab buttons on hover/selection
 - Make the trigger button rotate/change icon when the user open the speed dial (configurable)
 - Let the speed dial open a "sheet" of material instead of just mini-fab action buttons
