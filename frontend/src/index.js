var columnDefs = [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price", editable: true},
];

function postData(url = ``, data = {}) {
    // 既定のオプションには * が付いています
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    })
        .then(response => response.json()); // レスポンスの JSON を解ｓ析
}

// let the grid know which columns and what data to use
var gridOptions = {
    pagination: true,
    columnDefs: columnDefs,
    singleClickEdit: true,
    defaultColDef: {
        flex: 1,
        minWidth: 110,
        resizable: true,
        filter: true,
        sortable: true,
    },
    onCellEditingStarted: function (event) {
        console.log('cellEditingStarted');
    },
    onCellEditingStopped: function (event) {
        console.log('cellEditingStopped');
    },
    onCellValueChanged: function (event) {
        console.log(event.data.make);
        console.log(event.data.model);
        console.log(event.data.price);
        console.log(event.rowIndex);
        console.log(
            'onCellValueChanged: ' + event.colDef.field + ' ' + event.oldValue + ' -> ' + event.newValue
        );
        postData(`http://localhost:8080/item`, {"make": event.data.make, "model":event.data.model, "price":event.data.price})
            .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
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
