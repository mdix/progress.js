var Progress = { bar: {} };
Progress.bar = (function(config) {
    if (typeof config === "undefined") {
        console.log('Please give config, like: { width: "100%", height: "4px", id: "progress1" }');
        return false;
    }
    var outerDiv   = createOuterDiv();
    var innerDiv   = createInnerDiv();

    function createOuterDiv() {  
        var outerDiv = document.createElement('div');
            outerDiv.setAttribute('class', 'outerDiv');
            outerDiv.setAttribute('id', config.id);
            outerDiv.style.width = config.width;
            outerDiv.style.height = config.height;
        return outerDiv;
    }  
    
    function createInnerDiv() {
        var innerDiv = document.createElement('div');
            innerDiv.setAttribute('class', 'innerDiv');
            innerDiv.style.height = config.height;
            innerDiv.style.width = '0px';
        return innerDiv;
    }
    
    function update(percent) {
        var renderedBar = document.getElementById(config.id);
        var onePercentInPixel = 0.01 * renderedBar.offsetWidth;
        innerDiv.style.width = percent * onePercentInPixel + 'px';
    }
    
    function renderTo(element) {
        outerDiv.appendChild(innerDiv);
        element.appendChild(outerDiv);
    }
    
    function remove() {
        var renderedProgressBar = document.getElementById(config.id);
        renderedProgressBar.parentNode.removeChild(renderedProgressBar);
    }
    
    return {  
        update:   update,
        renderTo: renderTo,
        remove:   remove
    };  
});

x = new Progress.bar({ width: "100%", height: "4px", id: "progress1" } );
