import { valiate, clearAllField } from "./validate"
// Elements selection
// FormSection containers
const firstSection = document.getElementById('stepOne_cont')
const secondSection = document.getElementById('stepTwo_cont')
const thirdSection = document.getElementById('stepThree_cont')
const fourSection = document.getElementById('stepFour_cont')
const summaryPlanName = document.querySelector('.main_checkout .plan_name')
const summaryDuration = document.getElementById('summary_duration')
const summaryPlanPrice = document.querySelector('.main_checkout .selected_price')
const summaryCont = document.querySelector('.summary_cont')
const totalAmount = document.querySelector('.checkout_info .total_price')
const successPage = document.querySelector('.appreciation')
const formContent = document.querySelector('.form_field')

// section controls
const allControls = document.querySelectorAll('.item_pos')

// navigator buttons
const nextBtn = document.querySelector('button#next')
const backBtn = document.querySelector('button#back')

// Default active section
let activeSection = 1

function setSummaryData () {
    const retrieveData = JSON.parse(localStorage.getItem('FormPWA'))
    let total = 0
    if (retrieveData !== null) {
        total += retrieveData.plan.planAmount
        // remove all existing addOn on summary page
        summaryCont.querySelectorAll('.addon_service').forEach(addon => addon.remove())
        retrieveData.addOn && retrieveData.addOn.forEach((addOn) => {
            const child = document.createElement('div')
            child.classList.add('addon_service')
            const item = `
                <h3 class="plan_name">${addOn.addOnName}</h3>
                <p class="selected_price">+$${addOn.addOnPrice}/${retrieveData.duration === 'monthly' ? 'mo' : 'yr'}</p>
            `
            child.innerHTML = item
            total += addOn.addOnPrice
            summaryCont.insertAdjacentElement('beforeend', child)
        })
        if (retrieveData.duration === 'monthly') {
            summaryPlanPrice.textContent = `$${retrieveData.plan.planAmount}/mo`
            summaryPlanName.textContent = `${retrieveData.plan.planName} (Monthly)`
            summaryDuration.textContent = 'month'
            totalAmount.textContent = `$${total}/mo`
        } else {
            summaryPlanPrice.textContent = `$${retrieveData.plan.planAmount}/yr`
            summaryPlanName.textContent = `${retrieveData.plan.planName} (Yearly)`
            summaryDuration.textContent = 'year'
            totalAmount.textContent = `$${total}/yr`
        }
    }
}

// Remove className "active" from all sidebar navigator
export function removeActive (arr) {
    for ( let control of arr) {
        control.classList.remove('active')
    }
}

// Changes the current form section as well as active sidebar navigator and nav button content
function changeCurrentSection (section) {
    switch (section) {
        case 1:
            firstSection.classList.remove('hide')
            secondSection.classList.add('hide')
            thirdSection.classList.add('hide')
            fourSection.classList.add('hide')
            backBtn.classList.add('hide')
            backBtn.parentElement.classList.add('hide')
            nextBtn.textContent = "Next step"
            break;
        case 2:
            firstSection.classList.add('hide')
            secondSection.classList.remove('hide')
            thirdSection.classList.add('hide')
            fourSection.classList.add('hide')
            backBtn.classList.remove('hide')
            backBtn.parentElement.classList.remove('hide')
            nextBtn.textContent = "Next step"
            break;
        case 3:
            firstSection.classList.add('hide')
            secondSection.classList.add('hide')
            thirdSection.classList.remove('hide')
            fourSection.classList.add('hide')
            backBtn.classList.remove('hide')
            backBtn.parentElement.classList.remove('hide')
            nextBtn.textContent = "Next step"
            break;
        case 4:
            firstSection.classList.add('hide')
            secondSection.classList.add('hide')
            thirdSection.classList.add('hide')
            fourSection.classList.remove('hide')
            backBtn.classList.remove('hide')
            backBtn.parentElement.classList.remove('hide')
            nextBtn.textContent = "Confirm"
            break;
        default:
            firstSection.classList.add('hide')
            secondSection.classList.add('hide')
            thirdSection.classList.add('hide')
            fourSection.classList.add('hide')
            backBtn.parentElement.classList.remove('hide')
            nextBtn.textContent = "Next step"
            break;
    }
}

export default function navigate () {
    const getData = localStorage.getItem('FormPWA')
    for (let i = 0; i < allControls.length; i++) {
        allControls[i].addEventListener('click', () => {
            formContent.classList.remove('hide')
            successPage.classList.add('hide')
            if (getData === null) {
                changeCurrentSection(1)
            }
            const validateRes = valiate(i)
            if (validateRes) {
                // remove "active" from it's other navigator
                removeActive(allControls)
                // add "active" to classname
                allControls[i].classList.add('active')
                // update active section value
                activeSection = i + 1
                // set appropriate form section to view
                changeCurrentSection(Number(allControls[i].textContent))
                if (i === 3) {
                    setSummaryData()
                }
            }
        })
    }

    nextBtn.addEventListener('click', () => {
        const validateRes = valiate(activeSection)
        // add 1 to active section
        if (validateRes && activeSection !== 5) {
            // formContent.classList.remove('hide')
            // successPage.classList.add('hide')
            // increase active section num
            activeSection++
            // set appropriate form section to view
            console.log(activeSection)
            changeCurrentSection(activeSection)
            // remove "active" from it's other navigator
            removeActive(allControls)
            // add "active" to classname
            allControls[activeSection - 1]?.classList.add('active')
            if (activeSection === 4) {
                setSummaryData()
            }
            if (activeSection === 5) {
                formContent.classList.add('hide')
                successPage.classList.remove('hide')
                localStorage.removeItem('FormPWA')
                clearAllField()
                console.log('shown entering successPage')
            }
        }
    })

    backBtn.addEventListener('click', () => {
        // remove 1 from active section
        if (activeSection !== 1) {
            // decrease active section num
            activeSection--
            // set appropriate form section to view
            changeCurrentSection(activeSection)
            // remove "active" from it's other navigator
            removeActive(allControls)
            // add "active" to classname
            allControls[activeSection - 1].classList.add('active')
        }
    })


    return "Navigator connected"
}