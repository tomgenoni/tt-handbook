# Border Style

Sets the style of the border.

* By default this sets the border style for all sides.
* Due to the way the CSS spec works if you want it to apply to only certain sides, you'll need to disable the sides you don't want.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="row">
        <div class="col s:w-1/3">
            <div class="mb3 s:mb0">
                <div class="ba b-blue b-dotted h3"></div>
                <code class="mt1 clipboard">ba b-blue b-dotted</code>
            </div>
        </div>
        <div class="col s:w-2/3">
            <div>
                <div class="bt b-blue b-dashed br-0 bb-0 bl-0 h3"></div>
                <code class="mt1 clipboard">ba b-blue b-dashed br-0 bb-0 bl-0</code>
            </div>
        </div>
    </div>
</div>
