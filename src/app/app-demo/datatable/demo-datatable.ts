import {Component, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";

export class SampleModel {
    constructor(public id?: number,
                public name?: string,
                public surname?: string,
                public birthDate?: Date,
                public avatar?: string) {
    }
}

@Component({
    selector: 'demo-datatable',
    templateUrl: './demo-datatable.html',
    styleUrls: ['./demo-datatable.scss']
})
export class DemoDatatableView implements OnInit {

    models: SampleModel[];

    responsive: boolean = true;

    ngOnInit(): void {
        // Using a promisse here so angular will start another detect lifecycle
        Promise.resolve(null).then(() => {
            this.models = [];
            let count = 32;
            Array.apply(0, Array(count))
                .map(function (element: any, index: any) {
                    return {
                        id: index,
                        name: 'Name ' + index,
                        surname: 'Surname ' + index,
                        birthDate: (new Date().getTime() + (index * 10000010)),
                        avatar: (index % 2 == 1 ? 'search' : 'add')
                    };
                }).forEach((model: any) => this.models[this.models.length] = model);
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
}