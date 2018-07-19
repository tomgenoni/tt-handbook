# Aspect Ratio

- Maintains an aspect ratio on a block-level element regardless of its container width.
- Do not use directly on `img`.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="row">
        <div class="col w-1/3">
            <div>
                <div class="aspect-ratio aspect-ratio-16x9 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">aspect-ratio aspect-ratio-16x9</code>
            </div>
        </div>
        <div class="col w-1/3">
            <div>
                <div class="aspect-ratio aspect-ratio-4x3 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">aspect-ratio aspect-ratio-4x3</code>
            </div>
        </div>
        <div class="col w-1/3">
            <div>
                <div class="aspect-ratio aspect-ratio-1x1 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">aspect-ratio aspect-ratio-1x1</code>
            </div>
        </div>
    </div>
</div>