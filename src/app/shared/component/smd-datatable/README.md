# Simple Material Design Datatable

Angular datatable based on [Material Design Data Table](https://material.io/guidelines/components/data-tables.html)

### Usage

    <smd-datatable
              [models]="models"
              [paginated]="true"
              [paginatorRanges]="[10, 25, 50, 100]"
              [responsive]="responsive">

        <smd-datatable-header
                [enableFilter]="true"
                filterLabel="Filter">
            <smd-datatable-action-button (onClick)="addSample($event)" label="Add"></smd-datatable-action-button>
    
            <smd-datatable-contextual-button (onClick)="editSample($event)" icon="edit" [minimunSelected]="1" [maxSelected]="1"></smd-datatable-contextual-button>
            <smd-datatable-contextual-button (onClick)="removeSample($event)" icon="delete" [minimunSelected]="1"></smd-datatable-contextual-button>
        </smd-datatable-header>
    
        <smd-datatable-column title="Id" field="id" sortable="true" numeric="true" titleTooltip="The identifier Tooltip"></smd-datatable-column>
        <smd-datatable-column title="Name" field="name" sortable="true" titleTooltip="User first name"></smd-datatable-column>
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
        <smd-datatable-column title="Comment" field="comment" titleTooltip="User comment" editable="true" editablePlaceholder="Add a comment"></smd-datatable-column>
    </smd-datatable>
    
### Properties

#### smd-datatable

| Property         | Type         | Default             | Description                                     |
|------------------|--------------|---------------------|-------------------------------------------------|
| models           | any[]        | []                  | List of models to be shown                      |
| paginated        | boolean      | true                | If this datatable is paginated                      |
| paginatorRanges  | number[]     | \[10, 25, 50, 100]  | List of avaiable pages sizes for the datatable paginator                      |
| responsive       | boolean      | false               | If this datatable is responsible                      |


#### smd-datatable-header

| Property         | Type         | Default             | Description                                     |
|------------------|--------------|---------------------|-------------------------------------------------|
| enableFilter     | boolean      | true                | Show the quick filter                           |
| filterLabel      | string       | 'Filter'            | The quickfilter label                           |

#### smd-datatable-action-button

| Property         | Type         | Default             | Description                                     |
|------------------|--------------|---------------------|-------------------------------------------------|
| label            | string       |                     | The label for the action button                 |
| onClick          | event        |                     | The event sent when the user click on the action button |

#### smd-datatable-contextual-button

| Property         | Type         | Default             | Description                                     |
|------------------|--------------|---------------------|-------------------------------------------------|
| icon             | string       |                     | The icon for the contextual button              |
| onClick          | event        |                     | The event sent when the user click on the contextual button |
| minimunSelected  | number       |                     | The minimun number of rows selected to show this contextual button |
| maxSelected      | number       |                     | The maximun number of rows selected to show this contextual button |


#### smd-datatable-column

| Property              | Type         | Default             | Description                                     |
|-----------------------|--------------|---------------------|-------------------------------------------------|
| title                 | string       |                     | The header of this column                       |
| field                 | string       |                     | The field (from models) to represent this column (when a template is not used, this field will be shown in the datatable cell|
| numeric               | boolean      | false               | If this column should be treated as numeric     |
| titleTooltip          | string       |                     | The tooltip for the header of this column       |
| sortable              | boolean      | false               | If this column is sorted (default sort by this column field value) |
| sortFn                | Function     |                     | If sortable, a custom function to sort this column |
| filterFn              | Function     |                     | When filter is enabled, a custom function to filter this column |
| editable              | boolean      | false               | If this column can be edited |
| editablePlaceholder   | string       |                     | The placeholder when the value of this editable column is empty |

The smd-datatable-column enables the user to use a template to define the cell content:
Example:

    <template let-model="data">
        {{model.birthDate | date:'dd/MM/yyyy'}}
    </template>
    