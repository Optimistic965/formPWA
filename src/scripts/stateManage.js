export default function manageState (info, userValue) {
    const retrieveData = JSON.parse(localStorage.getItem('FormPWA'))
    let userCheckoutData = {}
    if (retrieveData !== null) {
        userCheckoutData = {
            ...retrieveData,
            [info]: userValue
        }
    } else {
        userCheckoutData = {
            [info]: userValue
        }
    }
    //name, email, phoneNumber, plan, duration, addOns
    const res = localStorage.setItem('FormPWA', JSON.stringify(userCheckoutData))

    return "state connected"
}