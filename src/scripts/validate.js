// Element selection
const name = document.querySelector('input#name')
const email = document.querySelector('input#email')
const phNum = document.querySelector('input#number')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

function displayErrMsg (currentEle) {
    const errEle = currentEle.previousElementSibling.querySelector('p.error_msg')
    errEle.style.display = 'block'
}

function removeErrMsg(currentEle) {
    const errEle = currentEle.previousElementSibling.querySelector('p.error_msg')
    errEle.style.display = 'none'
}

function valiate (activeSection) {
    // Validate all input field before moving on to the next
    switch(activeSection) {
        case 1:
            // check for name first
            if (name.value.length > 3) {
                removeErrMsg(name)
                // then check for email
                if (emailRegex.test(email.value)) {
                    removeErrMsg(email)
                    // then check for number
                    if (phoneNumberRegex.test(phNum.value)) {
                        removeErrMsg(phNum)
                        return true
                    } else {
                        displayErrMsg(phNum)
                        return false
                    }
                } else {
                    displayErrMsg(email)
                    return false
                }
            } else {
                displayErrMsg(name)
                return false
            }
    }

    return "ABCDEF"
}

export default valiate