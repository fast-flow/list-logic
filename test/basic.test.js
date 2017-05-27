var ListLogic = require('../lib/index').default
import ajax from "./ajax"
it('basic', function (done) {
    var state = {
        searchKeyword: '',
        loading: false,
        data: [],
        page: 1,
        pageCount: 0
    }
    var requestQuery = {}
    let speed = 100
    var list = new ListLogic({
        alias: {
            page: 'page'
        },
        getQuery: function () {
            return {
                searchKeyword: state.searchKeyword,
                page: state.page
            }
        },
        clearQuery: function () {
            // 因为某些场景下默认的搜索条件不为空，所以需要 clearQuery。但一般情况下返回空对象即可。
            return {}
        },
        onFetchStart: function (next) {
            state.loading = true
            next()
        },
        onFetch: function (query, render, fetchEnd) {
            ajax(
                query,
                {
                    done: function (res) {
                        render(res, query)
                        fetchEnd()
                    }
                },
                speed
            )
        },
        onRender: function (res, query) {
            state.data = res.data
            state.pageCount = res.pageCount
            state.searchKeyword = query.searchKeyword
            state.page = query.page
        },
        onFetchEnd: function () {
            state.loading = false
        }
    })
    expect(state).toEqual({ searchKeyword: '', loading: false, data: [  ], page: 1, pageCount: 0 })
    list.search()
    expect(state).toEqual({ searchKeyword: '', loading: true, data: [  ], page: 1, pageCount: 0 })
    new Promise(function (resolve, reject) {
        setTimeout(function () {
            expect(state).toEqual(
                {
                    "searchKeyword":"",
                    "loading":false,
                    "data":[{"id":1,"text":1},{"id":2,"text":2},{"id":3,"text":3},{"id":4,"text":4},{"id":5,"text":5}],
                    "page":1,
                    "pageCount":25
                }
            )
            resolve()
        }, speed)
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            list.changePage(4)
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword":"",
                        "loading":false,
                        "data":[{"id":16,"text":16},{"id":17,"text":17},{"id":18,"text":18},{"id":19,"text":19},{"id":20,"text":20}],
                        "page":4,
                        "pageCount":25
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            list.search()
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword":"",
                        "loading":false,
                        "data":[{"id":16,"text":16},{"id":17,"text":17},{"id":18,"text":18},{"id":19,"text":19},{"id":20,"text":20}],
                        "page":4,
                        "pageCount":25
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            state.searchKeyword = '1'
            list.search()
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword":"1",
                        "loading":false,
                        "data":[{"id":1,"text":1},{"id":10,"text":10},{"id":11,"text":11},{"id":12,"text":12},{"id":13,"text":13}],
                        "page":1,
                        "pageCount":9
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            list.changePage(2)
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword":"1",
                        "loading":false,
                        "data":[{"id":14,"text":14},{"id":15,"text":15},{"id":16,"text":16},{"id":17,"text":17},{"id":18,"text":18}],
                        "page":2,
                        "pageCount":9
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            state.searchKeyword = 'a'
            list.search()
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword":"a",
                        "loading":false,
                        "data":[],
                        "page":1,
                        "pageCount":0
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        return new Promise(function(resolve, reject) {
            list.clearSearch()
            expect(state.loading).toEqual(true)
            setTimeout(function () {
                expect(state).toEqual(
                    {
                        "searchKeyword": undefined,
                        "loading":false,
                        "data":[{"id":1,"text":1},{"id":2,"text":2},{"id":3,"text":3},{"id":4,"text":4},{"id":5,"text":5}],
                        "page":1,
                        "pageCount":25
                    }
                )
                resolve()
            }, speed)
        })
    })
    .then(function () {
        console.log('done')
        done()
    })
})
