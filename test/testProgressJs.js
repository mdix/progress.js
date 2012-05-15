describe('Progress.bar instantiated without config object', function() {
    it('returns false', function() {
        expect(Progress.bar()).toBeFalsy();
    });
});

describe('Progress.bar instantiated with config object', function() {
    var config      = { width: "100%", height: "4px", id: "progress1" };
    var progressBar = Progress.bar(config);

    it('returns a progress bar object', function() {
        expect(typeof progressBar).toEqual('object');
    });
    
    it('which has renderTo method', function() {
        expect(typeof progressBar.renderTo).toEqual('function');
    });
    
    it('which, when called, appends the progressbar to the given element', function() {
        progressBar.renderTo(document.getElementById('testArea'));
        var testAreaChildren = testArea.children;
        expect(testAreaChildren[0].getAttribute('class')).toEqual('outerDiv');
    });
        
    it('which has update method', function() {
        expect(typeof progressBar.update).toEqual('function');
    });
    
    it('which, when called, extends the width of the inner div element', function() {
        var renderedProgressBar = document.getElementById(config.id);
        expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth).toEqual(0);
        progressBar.update(20);
        expect(renderedProgressBar.getElementsByClassName('innerDiv')[0].offsetWidth).toNotEqual(0);
    });
    
    it('which has remove method', function() {
        expect(typeof progressBar.remove).toEqual('function');
    });
    
    it('which, when called, removes the complete progress bar', function() {
        var testArea = document.getElementById('testArea');
        progressBar.remove();
        expect(testArea.hasChildNodes()).toBeFalsy();
    });
});
