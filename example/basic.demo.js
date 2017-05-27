var React = require('react')
var ListLogic = require('list-logic').default
// import ListLogic from "lsit-logic"
var List = require('./component/List.js')
var Search = require('./component/Search.js')
var Paging = require('./component/Paging.js')
var ajax = require('./ajax')
var Demo = React.createClass({
    getInitialState: function () {
        return {
            searchKeyword: '',
            loading: false,
            data: [],
            page: 1,
            pageCount: 0
        }
    },
    componentWillMount: function() {
        var self = this
        self.list = new ListLogic({
            alias: {
                page: 'page'
            },
            getQuery: function () {
                return {
                    searchKeyword: self.state.searchKeyword,
                    page: self.state.page
                }
            },
            clearQuery: function () {
                // 因为某些场景下默认的搜索条件不为空，所以需要 clearQuery。但一般情况下返回空对象即可。
                return {}
            },
            onFetchStart: function (next) {
                self.setState({
                    loading: true
                })
                next()
            },
            onFetch: function (query, render, fetchEnd) {
                console.log('onFetch:', query)
                ajax(
                    query,
                    {
                        done: function (res) {
                            if (res.error) {
                                alert(res.error)
                            }
                            else {
                                render(res, query)
                            }
                            fetchEnd()
                        }
                    }
                )
            },
            onRender: function (res, query) {
                self.setState({
                    data: res.data,
                    pageCount: res.pageCount,
                    // 更新 query
                    searchKeyword: query.searchKeyword,
                    page: query.page
                })
            },
            onFetchEnd: function () {
                self.setState({
                    loading: false
                })
            }
        })
        self.list.search()
    },
    render: function () {
        var self = this
        return (
            <div>
                {
                    self.state.loading? "loading...": null
                }
                <Search
                    value={self.state.searchKeyword}
                    onSearch={function() {
                        self.list.search()
                    }}
                    onChange={function (value) {
                        self.setState({
                            searchKeyword: value
                        })
                    }}
                 />
                <List
                    data={self.state.data}
                    lastTimeQuery={self.list.lastTimeQuery}
                    onClearSearch={self.list.clearSearch}
                />
            <Paging page={self.state.page} pageCount={self.state.pageCount} onChange={function (e) {
                    self.list.changePage(e)
                }} />
            </div>
        )
    }
})
module.exports = Demo
