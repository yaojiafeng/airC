export function throttle(fn, wait = 0) {
    let timer;
    return function (...v) {
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
            }, wait);
            fn.apply(this, v);
        }
    }
}