# Background Size

* Determines how an background image will fill the container.
* Use with [background-position](#background-position) classes to set image location.

## Examples

<div class="pa3 ba b-gray-300 mb4">
    <div class="grid">
        <div class="s:col-6 mb3 s:mb0">
            <div class="h5 contain ba b-gray" style="background-image:url(https://placebear.com/420/320?image=2);background-repeat:no-repeat"></div>
            <code class="mt1 clipboard">contain</code>
            <div class-"tp-body-2">`contain` will make sure that the entire image is displayed within the element, regardless of the elements dimensions.</div>
        </div>
        <div class="s:col-6">
            <div class="h5 cover ba b-gray" style="background-image:url(https://placebear.com/420/320?image=2);background-repeat:no-repeat"></div>
            <code class="mt1 clipboard">cover</code>
            <div class-"tp-body-2">`cover` will make sure the entire element is covered - but won’t guarantee that the entire image will be shown.</div>
        </div>
    </div>
</div>
