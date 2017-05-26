var React = require('react')
var Listlogic = require('list-logic').default
var App = React.createClass({
    render: function () {
        return (
            <Listlogic themes="info" >basic</Listlogic>
        )
    }
})
module.exports = App
