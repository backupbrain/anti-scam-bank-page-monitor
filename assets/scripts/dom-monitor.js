const monitoringTimeoutMilliseconds = 5000 // check for changes every 10 seconds
let monitorTimeoutId = null
let baseAccountInformationHash = null
let baseTransactionHistoryHash = null

const createHashFromElement = async (elementId) => {
    // create hashes of the sensitive HTML elements
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    // grab the HTML from the element
    const html = document.getElementById(elementId).outerHTML
    // prepare for digest by encoding into byptes
    const encodedHtml = encoder.encode(html)
    // create a unique identifier for that HTML
    const digest = await crypto.subtle.digest('SHA-1', encodedHtml)
    // decode into text for comparison
    const hash = decoder.decode(digest)
    return hash
}

const setInitialState = async () => {
    console.log('setting up....')
    // create a hash of the sensitive page data
    baseAccountInformationHash = await createHashFromElement('account-information')
    baseTransactionHistoryHash = await createHashFromElement('transaction-history')
    console.log(baseAccountInformationHash)
}

const didStateChange = async () => {
    let didChange = false
    // create a hash of the sensitive page data
    const currentAccountInformationHash = await createHashFromElement('account-information')
    const currentTransactionHistoryHash = await createHashFromElement('transaction-history')
    console.log(currentAccountInformationHash)
    // check if the hashes have changed
    if (currentAccountInformationHash != baseAccountInformationHash ||
        currentTransactionHistoryHash != baseTransactionHistoryHash
    ) {
        didChange = true
    }
    return didChange
}

const displayContentChangedWarningBanner = () => {
    // check for an existing warning banner
    const banner = `
        <div class="alert alert-danger sticky-top" role="alert" id="content-change-alert">
            <div class="uppercase"><strong>Danger!</strong></div>
            The content of this page has been altered.
            Someone may be attempting to decieve you regarding your account information.
            Please reload this page to get the latest information about your account.
        </div>
    `
    const existingAlert = document.getElementById('content-change-alert')
    if (existingAlert === null) {
        const body = document.body
        body.insertAdjacentHTML('afterBegin', banner)
    }
}

const startMonitoring = async () => {
    await setInitialState()
    monitorTimeoutId = setInterval(() => {
        didStateChange().then(wasChangeDetected => {
            if (wasChangeDetected) {
                displayContentChangedWarningBanner()
            }
        })
    }, monitoringTimeoutMilliseconds)
}

// this function must be called after the page loads
startMonitoring()
