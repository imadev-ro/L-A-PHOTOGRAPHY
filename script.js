
document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // ELEMENTE
    // ======================================

    const popup = document.getElementById("eventsPopup");

    const openButton = document.getElementById("openEvents");
    const closeButton = document.getElementById("closeEvents");

    const eventsView = document.getElementById("eventsView");
    const packagesView = document.getElementById("packagesView");

    const backButton = document.getElementById("backToEvents");

    const selectedEvent = document.getElementById("selectedEvent");

    const modal = popup?.querySelector(".events-modal");

    if (
        !popup ||
        !openButton ||
        !closeButton ||
        !eventsView ||
        !packagesView ||
        !backButton ||
        !selectedEvent ||
        !modal
    ) {
        return;
    }


    // ======================================
    // CONFIGURARE WHATSAPP
    // ======================================

    const photographerPhone = "40730548517";


    // ======================================
    // VARIABILE
    // ======================================

    let currentEvent = "";

    let previousFocus = null;


    // ======================================
    // DESCHIDERE POPUP
    // ======================================

    function openPopup() {

        previousFocus = document.activeElement;

        currentEvent = "";

        showEvents();

        popup.classList.add("active");

        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("events-open");

        closeButton.focus();

        modal.scrollTop = 0;

    }


    // ======================================
    // ÎNCHIDERE POPUP
    // ======================================

    function closePopup() {

        popup.classList.remove("active");

        popup.setAttribute("aria-hidden", "true");

        document.body.classList.remove("events-open");

        showEvents();

        if (previousFocus && previousFocus.isConnected) {
            previousFocus.focus();
        }

    }


    // ======================================
    // AFIȘARE EVENIMENTE
    // ======================================

    function showEvents() {

        eventsView.hidden = false;
        packagesView.hidden = true;

        eventsView.classList.add("active");
        packagesView.classList.remove("active");

        modal.scrollTop = 0;

    }


    // ======================================
    // AFIȘARE PACHETE
    // ======================================

    function showPackages(eventName) {

        currentEvent = eventName;

        selectedEvent.textContent = eventName;

        eventsView.hidden = true;
        packagesView.hidden = false;

        eventsView.classList.remove("active");
        packagesView.classList.add("active");

        modal.scrollTop = 0;

        // Mutăm focusul pe butonul de întoarcere.

        backButton.focus();

    }


    // ======================================
    // BUTON DESCHIDERE
    // ======================================

    openButton.addEventListener("click", openPopup);


    // ======================================
    // BUTON ÎNCHIDERE
    // ======================================

    closeButton.addEventListener("click", closePopup);


    // ======================================
    // CLICK ÎN AFARA POPUP-ULUI
    // ======================================

    popup.addEventListener("click", (event) => {

        if (event.target === popup) {
            closePopup();
        }

    });


    // ======================================
    // ÎNCHIDERE CU ESCAPE
    // ======================================

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            popup.classList.contains("active")
        ) {

            closePopup();

        }

    });


    // ======================================
    // SELECTARE EVENIMENT
    // ======================================

    const eventButtons = document.querySelectorAll(
        ".event-link[data-event]"
    );

    eventButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const eventName = button.dataset.event;

            if (!eventName) {
                return;
            }

            showPackages(eventName);

        });

    });


    // ======================================
    // ÎNAPOI LA EVENIMENTE
    // ======================================

    backButton.addEventListener("click", () => {

        showEvents();

        const firstEventButton = eventsView.querySelector(
            ".event-link"
        );

        if (firstEventButton) {
            firstEventButton.focus();
        }

    });


    // ======================================
    // SOLICITARE OFERTĂ WHATSAPP
    // ======================================

    const packageButtons = document.querySelectorAll(
        ".package-button[data-package]"
    );

    packageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const packageName = button.dataset.package;

            if (!currentEvent || !packageName) {
                return;
            }

            const message =
                `Bună ziua! Am vizitat site-ul L&A Photography ` +
                `și sunt interesat(ă) de o ofertă pentru evenimentul: ` +
                `${currentEvent}, pachetul ${packageName}.\n\n` +

                `Aș dori să primesc mai multe detalii despre serviciile ` +
                `incluse și prețul acestui pachet.\n\n` +

                `Mulțumesc!`;

            const whatsappURL =
                `https://wa.me/${photographerPhone}?text=` +
                encodeURIComponent(message);


            // Deschidem WhatsApp într-o filă nouă.

            const whatsappWindow = window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            // Închidem popup-ul după solicitare.

            if (whatsappWindow) {
                closePopup();
            }

        });

    });


    // ======================================
    // PROTECȚIE FOCUS ÎN POPUP
    // ======================================

    popup.addEventListener("keydown", (event) => {

        if (event.key !== "Tab") {
            return;
        }

        const activeView = packagesView.hidden
            ? eventsView
            : packagesView;

        const focusableElements = [
            closeButton,
            ...activeView.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            )
        ].filter((element) => {

            return !element.hidden &&
                element.getClientRects().length > 0;

        });

        if (focusableElements.length === 0) {
            return;
        }

        const firstElement = focusableElements[0];

        const lastElement =
            focusableElements[focusableElements.length - 1];


        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {

            event.preventDefault();

            lastElement.focus();

        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {

            event.preventDefault();

            firstElement.focus();

        }

    });

});
