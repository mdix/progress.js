var Progress = {};

Progress.fillUpBar = (function(config) {
	var self = this;
    if ("undefined" === typeof config) {
        console.log('Please give config, like: { id: "progress1", autoRemove: true, removeTimeout: 2000 , backgroundSpeed: 50 }');
        return false;
    }
    var outerDiv  = createOuterDiv();
    var innerDiv  = createInnerDiv();
    var intervals = [];
    
    function createOuterDiv() {  
        var outerDiv = document.createElement('div');
            outerDiv.setAttribute('class', 'outerDiv');
            outerDiv.setAttribute('id', config.id);
        return outerDiv;
    }  
    
    function createInnerDiv() {
        var innerDiv = document.createElement('div');
            innerDiv.setAttribute('class', 'innerDiv');
        return innerDiv;
    }
    
    function update(percent) {
    	percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
        var renderedBar = document.getElementById(config.id);
        var onePercentInPixel = 0.01 * renderedBar.offsetWidth;
        innerDiv.style.width  = percent * onePercentInPixel + 'px';
        checkForAutoRemoval(percent);
    }
    
    function renderTo(element) {
        outerDiv.appendChild(innerDiv);
        element.appendChild(outerDiv);
        animateBackground(); 
    }
    
    function animateBackground() {
    	if (!config.backgroundSpeed) {
    		return;
    	}
    	var position = 0;
        intervals['backgroundAnimation'] = window.setInterval(function() {
        	if (config.backgroundSpeed < 0) {
        		innerDiv.style.backgroundPosition = ++position + 'px'; 
        	} else {
        		innerDiv.style.backgroundPosition = --position + 'px';
        	}
        }, config.backgroundSpeed);
    }
    
    function checkForAutoRemoval(percent) {
    	if (100 !== percent || true !== config.autoRemove) {
    		return;
    	}
    	self.markedForRemoval = !config.removeTimeout ? remove() : window.setTimeout(remove, config.removeTimeout);
    }
    
    function remove(callback) {
        var renderedProgressBar = document.getElementById(config.id);
        renderedProgressBar.parentNode.removeChild(renderedProgressBar);
        delete(self);
    }
    
    return {  
        update:   update,
        renderTo: renderTo,
        remove:   remove
    };  
});