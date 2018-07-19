# Row

These classes should be used in place of `tp-grid`. That will be deprecated.

- Create row of responsive columns with or without gutters.
- Use width classes `w-1/3` for columns.
- Columns should be divisable by 12.
- A `row` must wrap `col` as immediate children.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="row">
        <div class="col s:w-1/4 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="col s:w-1/4 mb3 s:mb0">
            <div class="bg-blue h3"></div>
        </div>
        <div class="col s:w-1/2">
            <div class="bg-blue h3"></div>
        </div>
    </div>
</div>

- In this example the columns default to stacked then in a row above the small breakpoint.
- Note the margin-bottom classes that apply only below the small breakpoint when columns are stacked.

```html
<div class="row">
    <div class="col s:w-1/4 mb3 s:mb0">
        ...html...
    </div>
    <div class="col s:w-1/4 mb3 s:mb0">
        ...html...
    </div>
    <div class="col s:w-1/2">
        ...html...
    </div>
</div>
```