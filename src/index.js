var columnDefs = [
    {headerName: "Make", field: "make", sortable: true, filter: true, editable:true},
    {headerName: "Model", field: "model", sortable: true, filter: true, editable:true},
    {headerName: "Price", field: "price", sortable: true, filter: true, editable:true},
];

// let the grid know which columns and what data to use
var gridOptions = {
    pagination: true,
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        minWidth: 110,
        editable: true,
        resizable: true,
    },
    onCellEditingStarted: function (event) {

        console.log('cellEditingStarted');
    },
    onCellEditingStopped: function (event) {
        console.log('cellEditingStopped');
    },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    agGrid.simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json'}).then(function (data) {
        gridOptions.api.setRowData(data);
    });
});
