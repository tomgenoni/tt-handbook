# Grid

These classes should be used in place of `tp-grid`. That will be deprecated.

- Columns should be divisable by 12.
- The immediate child of a `grid` will default to 100% width, which is common for mobile.
- Use `col-*` classes to declare width of column.
- A `grid` must wrap `col` as immediate children.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="grid">
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="s:col-6">
            <div class="bg-blue h3"></div>
        </div>
    </div>
    <div class="grid-wide">
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="s:col-3 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="s:col-6">
            <div class="bg-blue h3"></div>
        </div>
    </div>
</div>

- In this example the columns default to stacked then in a grid above the small breakpoint.
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

<div class="grid-wide">
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