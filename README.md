# ag-grid_sample
ag-grid を試してみる


# フロント
`docker run --rm --name sample -p 3000:80 -v $PWD/frontend/src:/usr/share/nginx/html -d nginx`

# バックエンド
```
cd backend
docker build -t fastmock .
docker run -p 8080:80 --rm --name fastmock fastmock
```

POST
```
curl -X POST -H "Content-Type: application/json" -d '{"make" : "Ford", "model" : "Mondeo", "price" : "1"}' --include http://localhost:8080/item
```

# ag-grid の参考にした仕様
- start page
  - https://www.ag-grid.com/javascript-grid/
- https://www.ag-grid.com/javascript-grid-features/
- https://www.ag-grid.com/javascript-grid-cell-editing/
