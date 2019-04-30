function clearInputFields(divElement) {
    var ele = document.getElementById(divElement);

    //From the following website:
    //https://www.encodedna.com/javascript/clear-all-input-field-values-inside-a-div-using-javascript-and-jquery.htm


    // IT WILL READ ALL THE ELEMENTS. <p>, <div>, <input> ETC.
    for (i = 0; i < ele.childNodes.length; i++) {

        // SINCE THE <input> FIELDS ARE INSIDE A <p> TAG, 
        // I'LL USE THE "firstChild" PROPERTY TO GET THE <input> TAG.
        var child = ele.childNodes[i].firstChild;
        //console.log(child);

        // CHECK IF CHILD NOT NULL.
        // THIS IS IMPORTANT AS IT WILL RETURN A TEXT FOR EVERY "Whitespace".
        // 'Whitespace' IS A TEXT OR NODE BETWEEN <div> AND <p> AND AFTER <p>.
        if (child) {
            switch (child.type) {
                case 'button':
                case 'text':
                case 'submit':
                case 'password':
                case 'file':
                case 'email':
                case 'date':
                case 'number':
                    child.value = '';
                case 'checkbox':
                case 'radio':
                    child.checked = false;
            }
        }
    }
}

export default clearInputFields;