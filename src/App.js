import React, { Component } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

import { NumberFormatter } from './NumberFormatter';
import { NumericCellEditor } from './NumericEditor';
import { RangeFilter } from './RangeFilter';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Make', field: 'make'},
                {headerName: 'Model', field: 'model'},
                {
                    headerName: 'Price',
                    field: 'price',
                    editable: true,
                    cellRenderer: 'numberFormatter',
                    cellEditor: 'numericCellEditor',
                    filter: 'rangeFilter'
                }
            ],
            rowData: [],
            frameworkComponents: {
                'numberFormatter': NumberFormatter,
                'numericCellEditor': NumericCellEditor,
                'rangeFilter': RangeFilter
            }
        }
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/15psn9')
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{height: '200px', width: '600px'}}
            >
                <AgGridReact
                    enableSorting={true}
                    enableFilter={true}
                    pagination={true}
                    columnDefs={this.state.columnDefs}
                    frameworkComponents={this.state.frameworkComponents}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default App;