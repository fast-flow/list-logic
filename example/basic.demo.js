var React = require('react')
var ListLogic = require('list-logic').default
// import ListLogic from "lsit-logic"
var List = require('./basic/List.js')
var Search = require('./basic/Search.js')
var Paging = require('./basic/Paging.js')
var ajax = require('./ajax')
module.exports = React.createClass({
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
                    searchKeyword: self.state.searchKeyword
                }
            },
            resetQuery: function () {
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
                            render(res, query)
                            fetchEnd()
                        }
                    }
                )
            },
            onRender: function (res, query) {
                self.setState({
                    data: res.data,
                    pageCount: res.pageCount,
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
                    onClearQuery={self.list.clearQuery}
                />
            <Paging page={self.state.page} pageCount={self.state.pageCount} onChange={function (e) {
                    self.list.changePage(e)
                }} />
            </div>
        )
    }
})
