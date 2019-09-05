import $ from 'jquery';
import Card from "card";

export default function setCard() {
    //renderização do cartão - pagamento-2
    if ($('div').hasClass('pagamento-2')) {
        var card = new Card({
            // a selector or DOM element for the form where users will
            // be entering their information
            form: 'form', // *required*
            // a selector or DOM element for the container
            // where you want the card to appear
            container: '.card-wrapper', // *required*

            formSelectors: {
                numberInput: 'input[name="card_num"]', // optional — default input[name="number"]
                expiryInput: 'input[name="card_val"]', // optional — default input[name="expiry"]
                cvcInput: 'input[name="card_cvc"]', // optional — default input[name="cvc"]
                nameInput: 'input[name="card_name"]' // optional - defaults input[name="name"]
            },

            width: 350, // optional — default 350px
            formatting: true, // optional - default true

            // Strings for translation - optional
            messages: {
                validDate: 'expira em', // optional - default 'valid\nthru'
                monthYear: 'mm/yy', // optional - default 'month/year'
            },

            // Default placeholders for rendered fields - optional
            placeholders: {
                number: '•••• •••• •••• ••••',
                name: 'Nome no Cartão',
                expiry: '••/••',
                cvc: '•••'
            },

            masks: {
                cardNumber: false // optional - mask card number
            },

            // if true, will log helpful messages for setting up Card
            debug: false // optional - default false
        });
    }
}