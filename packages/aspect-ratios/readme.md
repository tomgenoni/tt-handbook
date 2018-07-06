# Aspect ratios

- Maintains an aspect ratio on a block-level element regardless of its container width.
- Do not use directly on `img`.

## Examples

<div class="pa3 ba b--gray-300">
    <div class="cols">
        <div class="col w-1/3">
            <div>
                <div class="ar ar--16x9 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">ar ar--16x9</code>
            </div>
        </div>
        <div class="col w-1/3">
            <div>
                <div class="ar ar--4x3 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">ar ar--4x3</code>
            </div>
        </div>
        <div class="col w-1/3">
            <div>
                <div class="ar ar--1x1 cover" style="background:url(https://placebear.com/420/320?image=2"></div>
                <code class="mt1 clipboard">ar ar--1x1</code>
            </div>
        </div>
    </div>
</div>