class Request {
    constructor() {
        this._baseURL = '/';
        this._headers={
            common:{
                'Accept': 'application/json, text/plain, */*',
                'X-Requested-With':'XMLHttpRequest'
            },
            get:{
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            delete:{
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            head:{
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            post:{'Content-Type':'application/x-www-form-urlencoded'},
            put:{'Content-Type':'application/x-www-form-urlencoded'},
            patch:{'Content-Type':'application/x-www-form-urlencoded'}
            }
            this._before=null
            this._after=null
    }

    make(opts) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url);
            xhr.responseType = opts.responseType || "text";
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            var params = opts.params;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === "object") {
                params = Object.keys(params)
                    .map(function (key) {
                        return (
                            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
                        );
                    })
                    .join("&");
            }
            xhr.send(params);
        });
    }
}