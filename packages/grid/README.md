# Grid

These classes should be used in place of `tp-grid`. That will be deprecated.

- Columns should be divisable by 12.
- The immediate child of a `grid` will default to 100% width, which is common for mobile.
- Use `col-*` classes to declare width of column.
- A `grid` must wrap `col` as immediate children.

## Examples

<div class="pa3 ba b-gray mb4">
    <code class="mb2 db clipboard">grid</code>
    <div class="grid mb3">
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-6">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
    </div>
    <code class="mb2 db clipboard">grid grid-wide</code>
    <div class="grid grid-wide mb3">
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-6">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
    </div>
    <code class="mb2 db clipboard">grid grid-flush</code>
    <div class="grid grid-flush mb2">
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
        <div class="s:col-6">
            <div class="bg-gray-200 ba b-gray h3"></div>
        </div>
    </div>
</div>

- In the examples the columns default to stacked, then side-by-side above the small breakpoint based on col widths.
- Note the margin-bottom classes that apply only below the small breakpoint when columns are stacked.

```html
<div class="grid">
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-6">
        ...html...
    </div>
</div>

<div class="grid grid-wide">
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-6">
        ...html...
    </div>
</div>

<div class="grid grid-flush">
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-3 mb3 s:mb0">
        ...html...
    </div>
    <div class="s:col-6">
        ...html...
    </div>
</div>
```