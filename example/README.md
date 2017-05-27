# Example

你可以直接复制示例代码到你的项目中，修改 `query` `<List />` `<Search />` `<Paging />` 达到项目所需视觉效果和功能。

## Basic

````demo
{
    title: 'Basic',
    html: '<div id="example__basic" >loading...</div>',
    desc: '配置列表逻辑生命周期，通过 `search` `changePage` `clearSearch` 触发列表逻辑。注意：应该在 `onRender` 中更新 `query` 到 `state`，因为列表获取可能会出错（网络中断等）',
    file: './basic.demo.js'
}
````

````demo
{
    title: '&lt;List /&gt;',
    html: '<a href="./component/List.js">./component/List.js</a>',
    desc: '`<List data={self.state.data} lastTimeQuery={self.list.lastTimeQuery} onClearSearch={self.list.clearSearch} />`',
    file: './component/List.js'
}
````

````demo
{
    title: '&lt;Search /&gt;',
    html: '<a href="./component/Search.js">./component/Search.js</a>',
    desc: '`<Search value={string} onSearch={fn} onChange={fn} />`',
    file: './component/Search.js'
}
````

````demo
{
    title: '&lt;Paging /&gt;',
    html: '<a href="./component/Paging.js">./component/Paging.js</a>',
    desc: '`<Paging page={number} pageCount={number} onChange={fn} />`',
    file: './component/Paging.js'
}
````
