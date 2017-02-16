import {Component, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";

export class SampleModel {
    constructor(public id?: number,
                public name?: string,
                public surname?: string,
                public birthDate?: Date,
                public avatar?: string,
                public comment?: string) {
    }
}

@Component({
    selector: 'demo-datatable',
    templateUrl: './demo-datatable.html',
    styleUrls: ['./demo-datatable.scss']
})
export class DemoDatatable implements OnInit {

    models: SampleModel[];

    responsive: boolean = true;

    ngOnInit(): void {
        // Using a promisse here so angular will start another detect lifecycle
        Promise.resolve(null).then(() => {
            let count = 32;
            this.models = Array.apply(0, Array(count))
                .map(function (element: any, index: any) {
                    return {
                        id: index,
                        name: 'Name ' + index,
                        surname: 'Surname ' + index,
                        birthDate: (new Date().getTime() + (index * 10000010)),
                        avatar: (index % 2 == 1 ? 'search' : 'add'),
                        comment: (index <= 5 ? 'comment ' + index : null)
                    };
                });
        });
    }

    _sortByBirthDate(a: SampleModel, b:SampleModel, sortDir: string) {
        let dir = sortDir == 'asc' ? 1 : -1;
        if (a.birthDate < b.birthDate) return -1 * dir;
        if (a.birthDate > b.birthDate) return 1 * dir;
        return 0;
    }

    _filterByBirthDate(a: SampleModel, text: string) {
        let datePipe = new DatePipe("pt");
        let value = datePipe.transform(a.birthDate,'dd/MM/yyyy');
        return value.toString().toUpperCase().indexOf(text.toUpperCase()) > -1;
    }

    addSample() {
        console.log('add sample');
    }

    editSample(samples: SampleModel[]) {
        console.log('editing sample: ' + JSON.stringify(samples));
    }

    removeSample(samples: SampleModel[]) {
        console.log('removing sample: ' + JSON.stringify(samples));
    }

    fieldChanged(event: any) {
        console.log('field changed');
        console.log(event);
    }

    tsExample: string = `
    export class DemoDatatableView implements OnInit {

        models: SampleModel[];
        responsive: boolean = true;
    
        ngOnInit(): void {
            // Some server long processing query
            Promise.resolve(null).then(() => {
                this.models = Array.apply(0, Array(count)).map(function (element: any, index: any) {
                    return {
                        id: index,
                        name: 'Name ' + index,
                        surname: 'Surname ' + index,
                        birthDate: (new Date().getTime() + (index * 10000010)),
                        avatar: (index % 2 == 1 ? 'search' : 'add'),
                        comment: (index <= 5 ? 'comment ' + index : null)
                    };
                });
            });
        }
    
        _sortByBirthDate(a: SampleModel, b:SampleModel, sortDir: string) {
            let dir = sortDir == 'asc' ? 1 : -1;
            if (a.birthDate < b.birthDate) return -1 * dir;
            if (a.birthDate > b.birthDate) return 1 * dir;
            return 0;
        }
    
        _filterByBirthDate(a: SampleModel, text: string) {
            let datePipe = new DatePipe("pt");
            let value = datePipe.transform(a.birthDate,'dd/MM/yyyy');
            return value.toString().toUpperCase().indexOf(text.toUpperCase()) > -1;
        }
    
        addSample() {
            console.log('add sample');
        }
    
        editSample(samples: SampleModel[]) {
            console.log('editing sample: ' + JSON.stringify(samples));
        }
    
        removeSample(samples: SampleModel[]) {
            console.log('removing sample: ' + JSON.stringify(samples));
        }
        
        fieldChanged(event: any) {
            console.log('field changed');
            console.log(event);
        }
    }
    `;

    htmlExample: string = `
    <smd-datatable
                  [models]="models"
                  [paginated]="true"
                  [paginatorRanges]="[10, 25, 50, 100]"
                  [responsive]="true">

        <smd-datatable-header
                [enableFilter]="true"
                filterLabel="Filter">
            <smd-datatable-action-button (onClick)="addSample($event)" label="Add"></smd-datatable-action-button>

            <smd-datatable-contextual-button (onClick)="editSample($event)" icon="edit" 
                                             [minimunSelected]="1" [maxSelected]="1"></smd-datatable-contextual-button>
            <smd-datatable-contextual-button (onClick)="removeSample($event)" icon="delete" 
                                             [minimunSelected]="1"></smd-datatable-contextual-button>
        </smd-datatable-header>

        <smd-datatable-column title="Id" field="id" sortable="true" 
                              numeric="true" titleTooltip="The identifier Tooltip"></smd-datatable-column>
        
        <smd-datatable-column title="Name" field="name" sortable="true" 
                              titleTooltip="User first name"></smd-datatable-column>
        
        <smd-datatable-column title="Surname" field="surname" sortable="true"></smd-datatable-column>
        
        <smd-datatable-column title="Birth Date" field="birthDate" sortable="true"
                             [sortFn]="_sortByBirthDate"
                             [filterFn]="_filterByBirthDate">
            <template let-model="data">
                {{model.birthDate | date:'dd/MM/yyyy'}}
            </template>
        </smd-datatable-column>
        
        <smd-datatable-column title="Avatar" field="avatar" titleTooltip="User Avatar">
            <template let-model="data">
                <md-icon>{{model.avatar}}</md-icon>
            </template>
        </smd-datatable-column>
        
        <smd-datatable-column title="Comment" field="comment" titleTooltip="User comment" 
                              editable="true" editablePlaceholder="Add a comment"
                              (onFieldChange)="fieldChanged($event)"></smd-datatable-column>
    </smd-datatable>
    `;
}