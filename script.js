'use strict'

var switcher = (() => {

    var init = ( containerClass, slideClass, buttonClass ) => {
        let debug;

        if ( !containerClass || typeof(containerClass) === 'undefined' ) {
            debug = 1;
            console.log(debug + " containerClass is undefined or doesnt exist");
            return false;
        }
        let container = document.querySelector(containerClass);

        //validate button
        if ( !buttonClass || typeof(buttonClass) === 'undefined' ) {
            debug = 2;
            console.log(debug + " buttonClass is undefined or doesnt exist");
            return false
        }
        let buttons = document.querySelectorAll(buttonClass);

        //validate slides
        if ( !slideClass || typeof(slideClass) === 'undefined' ) {
            debug = 3;
            console.log(debug + " slideClass is undefined or doesnt exist");
            return false
        }
        let slides = document.querySelectorAll(slideClass);

        applyActive(buttons, findActive(slides));

        //single click event to use bubbling.
        container.addEventListener('click', (e) => {
            //if target contains dot
            let oldId = findActive(buttons);

            //if element is inactive
            if ( doesElementContainActive(e)) {

                removeActive(buttons, oldId);
                removeActive(slides, oldId);
                e.target.classList.add('active');
                let newId = findActive(buttons);
                applyActive( slides, newId );

            }
        });
    };

    //return id of node that contains active class
    var findActive = ( nodeList ) => {
        for ( let i = nodeList.length - 1; i >= 0; i-- ) {
            if ( nodeList[i].classList.contains('active') ) {
                return i
            }
        }
    }
    //apply active class
    var applyActive = ( el , id ) => {
        el[id].classList.add( 'active' );
    }
    //remove active class
    var removeActive = ( el , id ) => {
        el[id].classList.remove( 'active' );
    }

    //event if target doesn't contain dot
    var doesElementContainActive = (e) => {

        if (( e.target.classList.contains( 'dot' ) === false )) {
            return false
        }
        if (( e.target.classList.contains( 'active' ) )) {
            return false
        }

        return true
    }

	return {
		init: init
	}

})();

// Example of passing data into a private method
// the private method will then `console.log()` 'Hello!'

switcher.init( ".container", ".slide", ".dot" );