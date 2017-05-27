# Documentation

## execution cycle | 逻辑生命周期

1. `search || changePage || clearSearch`  
2. `props.getQuery || props.clearQuery`
2. `props.onFetchStart`
3. `props.onFetch`
4. `props.onRender`
5. `props.onFetchEnd`
