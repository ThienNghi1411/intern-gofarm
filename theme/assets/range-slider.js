var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});

let input_from = document.getElementById("Filter-filter.v.price.gte");
let input_to = document.getElementById("Filter-filter.v.price.lte");
let inputs = [input_from,input_to]
slider.noUiSlider.on('update',function(values,handle){
    inputs[handle].value = Math.round(values[handle])
})