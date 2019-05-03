setDisplayProperty() {
    let arrToggleElements =['revName', 'curInitials', 'revInitials', 'chkDeactivate', 'chkAdmin' ]
    let elem = '';
    let displaySetting = '';

    for (let i=0; i<arrToggleElements.length; i++) {
        elem = document.getElementById(arrToggleElements[i]);
        displaySetting = window.getComputedStyle(elem).display;
        if (displaySetting === 'none') {
            elem.style.display = 'block';
        } else {
            console.log("in else statement");
            elem.style.display = 'none';
        }
  }
}