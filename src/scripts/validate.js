import manageState from "./stateManage";
// Element selection
const name = document.querySelector('input#name')
const email = document.querySelector('input#email')
const phNum = document.querySelector('input#number')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const retrieveData = JSON.parse(localStorage.getItem('FormPWA'))


function displayErrMsg (currentEle) {
    const errEle = currentEle.previousElementSibling.querySelector('p.error_msg')
    errEle.style.display = 'block'
    // make error message disappear
    setTimeout(() => {
        errEle.style.display = 'none'
    }, 2000)
}

function valiate (activeSection) {
    // Validate all input field before moving on to the next
    switch(activeSection) {
        case 1:
            // check for name first
            if (name.value.length > 3) {
                // then check for email
                if (emailRegex.test(email.value)) {
                    // then check for number
                    if (phoneNumberRegex.test(phNum.value)) {
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

//Setting value if available
if (retrieveData !== null) {
    name.value = retrieveData?.['Name']
    email.value = retrieveData?.['Email']
    phNum.value = retrieveData?.['Phone-number']
}

// Storing provided value
name.addEventListener('change', () => {
    manageState('Name', name.value)
})

email.addEventListener('change', () => {
    manageState('Email', email.value)
})

phNum.addEventListener('change', () => {
    manageState('Phone-number', phNum.value)
})

export default valiate