# Truncate

Single-line truncation.

* An ellipsis will show only on Webkit browsers, like Safari and Chrome.
* Truncating to two or more lines requires custom CSS.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="truncate mb3 b">In the era of instant-everything, it’s crazy that you still have to waste an entire afternoon researching, calling and comparing local pros whenever you need one.</div>
    <div class="flex">
        <div class="truncate flex-auto">Hi, good to meet you. When do you think we could set up the meeting to decide the needs of the conference?</div>
        <div class="nowrap b ml2">Jun 21</div>
    </div>
</div>

```html
<div class="truncate mb3 b">In the era of instant-everything, it’s crazy that you still have to waste an entire afternoon researching, calling and comparing local pros whenever you need one.</div>
<div class="flex">
    <div class="truncate flex-auto">Hi, good to meet you. When do you think we could set up the meeting to decide the needs of the conference?</div>
    <div class="nowrap b ml2">Jun 21</div>
</div>
```

In the second example the we use a flex container and a `nowrap` to prevent the date from wrapping.
