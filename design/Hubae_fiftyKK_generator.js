// Writing a code for you to generate 50k whenever you want if

const generateFiftyK = () => {
    console.log('Start Generating K')
    for (let i = 0; i <= 50; i++) {
        let currentAmt = i + 1
        if (currentAmt <= 50) {
            console.log(`${currentAmt}k`)
        } else {
            console.log('Take jara')
            console.log(`${currentAmt}k`)
        }
    }
    console.log('Stopped Generating')
}

// to generate the K(s)
generateFiftyK()