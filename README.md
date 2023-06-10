change .env.local to .env

#v4.0
1.  styled by halfmoon
2.  datatables are working
3.  different urls for shift create, update and wip delete
4.  most interesting file is `json.py` in views and `datatables.html`
    where all the javascript for datatables is
5.  most time spend on figuring out how create shifts (there is util code now)
6.  use of `model_to_dict` saved alot
7.  donot use django built in url method for template when
    passing dynamic id. instead use `var post_url = "/link/"`. then in `editor.ajax()`
    use
```javascript
ajax: {
    url: post_url + "{id}/"
},
```
    this `{id}` will be handled by datatables and populate on selecting row
    when `idSrc` and `rowId` are defined.
8.  rest example for editor is also interesting