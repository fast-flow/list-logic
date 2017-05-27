var React = require('react')
var Search = React.createClass({
    render: function () {
        const self = this
        return (
            <form action="" onSubmit={function (e) {
                e.preventDefault()
                self.props.onSearch()
            }}>
                <input
                    style={{width:300}}
                    type="text"
                    value={self.props.value}
                    onChange={function(e) {
                        self.props.onChange(e.target.value)
                    }}
                    placeholder={self.props.placeholder}
                 />
             <button type="submit" >Search</button>
            </form>
        )
    }
})
module.exports = Search
