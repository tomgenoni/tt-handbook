# Columns

- Create row of responsive columns with or without gutters.
- Use width classes `w-1/3` for columns.
- Columns should be divisable by 12.
- Note a `cols` must wrap `col` as immediate children.

## Examples

<div class="pa3 ba b--gray-300">
    <div class="cols">
        <div class="col s:w-1/4">
            <div class="mb3 s:mb0">
                <div class="bg-blue h3"></div>
            </div>
        </div>
        <div class="col s:w-1/4">
            <div class="mb3 s:mb0">
                <div class="bg-blue h3"></div>
            </div>
        </div>
        <div class="col s:w-1/4">
            <div class="mb3 s:mb0">
                <div class="bg-blue h3"></div>
            </div>
        </div>
        <div class="col s:w-1/4">
            <div>
                <div class="bg-blue h3"></div>
            </div>
        </div>
    </div>
</div>

In this example the columns default to stacked at 100% width and are 25% width above the small breakpoint.

```html
<div class="cols">
    <div class="col s:w-1/4">
        ...html...
    </div>
    <div class="col s:w-1/4">
        ...html...
    </div>
    <div class="col s:w-1/4">
        ...html...
    </div>
    <div class="col s:w-1/4">
        ...html...
    </div>
</div>
```