var React = require('react')
var List = React.createClass({
    render: function () {
        var self = this
        var empty = self.props.data.length === 0
        var hasQueryParam = false
        if (self.props.lastTimeQuery) {
            hasQueryParam = Boolean(self.props.lastTimeQuery.searchKeyword)
        }
        return (
            <div>
            {
                empty?
                    hasQueryParam?
                    (
                        <div>
                            没有搜索到{self.props.lastTimeQuery.searchKeyword}
                            <button type="button" onClick={self.props.onClearQuery} >清除搜索条件</button>
                        </div>
                    ):
                    (
                        <div>暂无数据</div>
                    )
                :
                null
            }
            <ul>
            {
                self.props.data.map(function (item, key) {
                    return (
                        <li key={key} >
                            {item.text}
                        </li>
                    )
                })
            }
            </ul>
            </div>
        )
    }
})

module.exports = List
