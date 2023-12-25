import manageState from "./stateManage";
import { removeActive } from "./navigate";
// Element selection
const name = document.querySelector('input#name')
const email = document.querySelector('input#email')
const phNum = document.querySelector('input#number')
const planCont = document.querySelector('.plan_cont')
const plans = document.querySelectorAll('.plan_cont .plan')
const addOns = document.querySelectorAll('.addOn_cont .addOn')
const yearlyControl = document.querySelector('.duration_control #yearly')
const monthlyControl = document.querySelector('.duration_control #monthly')
const duration = document.querySelector('.duration_control input[type=checkbox]')


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const retrieveData = JSON.parse(localStorage.getItem('FormPWA'))

let selectedDuration = 'monthly'
let selectedPlan = {}
let selectedAddOn = []

const planDurationprice = {
    'monthly': {
        'Arcade': 9,
        'Advance': 12,
        'Pro': 15,
        'Online service': 1,
        'Larger storage': 2,
        'Customizable Profile': 2
    },
    'yearly': {
        'Arcade': 90,
        'Advance': 120,
        'Pro': 150,
        'Online service': 10,
        'Larger storage': 20,
        'Customizable Profile': 20
    }
}

const changePrices = (duration) => {
    plans.forEach(plan => {
        const planName = plan.querySelector('.plan_name').textContent
        const planPrice = plan.querySelector('.plan_price')
        const promo = plan.querySelector('.promo')

        if (duration === 'yearly') {
            planPrice.textContent = `$${planDurationprice[duration][planName]}/yr`
            promo.style.display = 'block'    
        } else {
            planPrice.textContent = `$${planDurationprice[duration][planName]}/mo`
            promo.style.display = 'none'
        }
    })

    addOns.forEach(addOn => {
        const addOnPrice = addOn.querySelector('.addon_price p')
        const addOnName = addOn.querySelector('.addOn_info h2').textContent
        if (duration === 'yearly') {
            addOnPrice.textContent = `$${planDurationprice[duration][addOnName]}/yr` 
        } else {
            addOnPrice.textContent = `$${planDurationprice[duration][addOnName]}/mo`
        }

    })
}

function displayErrMsg (currentEle) {
    const errEle = currentEle.previousElementSibling.querySelector('p.error_msg')
    errEle.style.display = 'block'
    // make error message disappear
    setTimeout(() => {
        errEle.style.display = 'none'
    }, 2000)
}

export function valiate (activeSection) {
    // Validate all input field before moving on to the next
    // console.log(activeSection)
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
        case 2:
            if (Object.keys(selectedPlan).length > 1) {
                return true
            } else {
                planCont.style.border = '1px solid red'
                planCont.style.borderRadius = '8px'
                setTimeout(() => {
                    planCont.style.border = 'none'
                }, 2000)
                return false
            }
        case 3:
            if (Object.keys(selectedPlan).length > 1) {
                return true
            } else {
                return false
            }
        case 4:
            if (retrieveData !== null && Object.keys(retrieveData).length >= 5) {
                return true
            } else {
                return false
            }
        default:
            return true
    }

    return "ABCDEF"
}

export function clearAllField () {
    name.value = ''
    email.value = ''
    phNum.value = ''
    selectedDuration = 'monthly'
    selectedPlan = {}
    selectedAddOn = []
    removeActive(plans)
    addOns.forEach(addOn => addOn.classList.remove('addOn_checked'))
}

//Setting value if available
if (retrieveData !== null) {
    name.value = retrieveData?.['Name']
    email.value = retrieveData?.['Email']
    phNum.value = retrieveData?.['Phone-number']
    if (retrieveData.plan) {
        selectedPlan = retrieveData.plan
        plans.forEach(plan => {
            const planName = plan.querySelector('.plan_name').textContent
            if (planName === retrieveData.plan.planName) {
                removeActive(plans)
                plan.classList.add('active')
            }
        })
    }
    if (retrieveData.duration) {
        selectedDuration = retrieveData.duration
        changePrices(retrieveData.duration)
        retrieveData.duration === 'yearly' ? duration.checked = true : duration.checked = false
        // summaryPlanPrice.textContent = `$${planDurationprice[duration][addOnName]}/yr`
    }
    if (retrieveData.addOn) {
        selectedAddOn = retrieveData.addOn
        addOns.forEach(addOn => {
            const addOnName = addOn.querySelector('.addOn_info h2').textContent
            const checkbox = addOn.querySelector('input[type=checkbox]')

            for (let i = 0; i < retrieveData.addOn.length; i++) {
                if (retrieveData.addOn[i].addOnName === addOnName) {
                    checkbox.checked = true
                    addOn.classList.add('addOn_checked')
                }
            }
        })
    }
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

duration.addEventListener('change', (e) => {
    if (e.target.checked) {
        selectedDuration = 'yearly'
        yearlyControl.classList.add('active')
        monthlyControl.classList.remove('active')
        changePrices('yearly')
        manageState('duration', 'yearly')
    } else {
        selectedDuration = 'monthly'
        yearlyControl.classList.remove('active')
        monthlyControl.classList.add('active')
        changePrices('monthly')
        manageState('duration', 'monthly')
    }
    selectedAddOn = []
    manageState('addOn', [])
    addOns.forEach(addOn => {
        addOn.classList.remove('addOn_checked')
        addOn.querySelector('input[type=checkbox]').checked = false
    })
    removeActive(plans)
})

for (let plan of plans) {
    plan.addEventListener('click', () => {
        removeActive(plans)
        plan.classList.add('active')
        const clickedPlan = plan.querySelector('.plan_name').textContent
        selectedPlan = {
            'planName': clickedPlan,
            'planAmount': planDurationprice[selectedDuration][clickedPlan],
        }
        manageState('plan', selectedPlan)
    })
}

for (let addOn of addOns) {
    const checkbox = addOn.querySelector('input[type=checkbox]')
    const addOnName = addOn.querySelector('.addOn_info h2').textContent
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked){
            addOn.classList.add('addOn_checked')
            selectedAddOn.push({
                addOnName,
                'addOnPrice': planDurationprice[selectedDuration][addOnName]
            })
        } else {
            addOn.classList.remove('addOn_checked')
            const newArry = selectedAddOn.filter((add) => add.addOnName !== addOnName)
            selectedAddOn = newArry
        }

        manageState('addOn', selectedAddOn)
    })
}