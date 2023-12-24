// Elements selection
// FormSection containers
const firstSection = document.getElementById('stepOne_cont')
const secondSection = document.getElementById('stepTwo_cont')
const thirdSection = document.getElementById('stepThree_cont')
const fourSection = document.getElementById('stepFour_cont')

// section controls
const allControls = document.querySelectorAll('.item_pos')

// navigator buttons
const nextBtn = document.querySelector('button#next')
const backBtn = document.querySelector('button#back')

// Default active section
let activeSection = 1

// Remove className "active" from all sidebar navigator
function removeActive () {
    for ( let control of allControls) {
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
    for (let i = 0; i < allControls.length; i++) {
        allControls[i].addEventListener('click', () => {
            // remove "active" from it's other navigator
            removeActive()
            // add "active" to classname
            allControls[i].classList.add('active')
            // update active section value
            activeSection = i + 1
            // set appropriate form section to view
            changeCurrentSection(Number(allControls[i].textContent))
        })
    }

    nextBtn.addEventListener('click', () => {
        // add 1 to active section
        if (activeSection !== 4) {
            // increase active section num
            activeSection++
            // set appropriate form section to view
            changeCurrentSection(activeSection)
            // remove "active" from it's other navigator
            removeActive()
            // add "active" to classname
            allControls[activeSection - 1].classList.add('active')
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
            removeActive()
            // add "active" to classname
            allControls[activeSection - 1].classList.add('active')
        }
    })


    return "Navigator connected"
}