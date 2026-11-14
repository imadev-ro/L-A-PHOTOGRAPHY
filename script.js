
document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("eventsPopup");
    const openButton = document.getElementById("openEvents");
    const closeButton = document.getElementById("closeEvents");

    const cardsContainer = document.getElementById("eventsCards");
    const dotsContainer = document.getElementById("eventsDots");

    if (
        !popup ||
        !openButton ||
        !closeButton ||
        !cardsContainer ||
        !dotsContainer
    ) {
        return;
    }

    const cards = [...cardsContainer.querySelectorAll(".event-card")];
    const dots = [...dotsContainer.querySelectorAll("button")];

    let previousFocus = null;
    let scrollTimeout = null;


    // ======================================
    // DESCHIDERE POPUP
    // ======================================

    function openPopup() {

        previousFocus = document.activeElement;

        popup.classList.add("active");

        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("events-open");

        closeButton.focus();

        updateDots();

    }


    // ======================================
    // INCHIDERE POPUP
    // ======================================

    function closePopup() {

        popup.classList.remove("active");

        popup.setAttribute("aria-hidden", "true");

        document.body.classList.remove("events-open");

        if (previousFocus) {
            previousFocus.focus();
        }

    }


    // ======================================
    // BUTOANE DESCHIDERE / INCHIDERE
    // ======================================

    openButton.addEventListener("click", openPopup);

    closeButton.addEventListener("click", closePopup);


    // ======================================
    // CLICK IN AFARA FERESTREI
    // ======================================

    popup.addEventListener("click", (event) => {

        if (event.target === popup) {
            closePopup();
        }

    });


    // ======================================
    // INCHIDERE CU ESCAPE
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
    // ACTUALIZARE INDICATORI
    // ======================================

    function updateDots() {

        if (window.innerWidth > 520) {
            return;
        }

        const containerRect =
            cardsContainer.getBoundingClientRect();

        const containerCenter =
            containerRect.left + containerRect.width / 2;

        let activeIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach((card, index) => {

            const cardRect = card.getBoundingClientRect();

            const cardCenter =
                cardRect.left + cardRect.width / 2;

            const distance =
                Math.abs(containerCenter - cardCenter);

            if (distance < smallestDistance) {

                smallestDistance = distance;

                activeIndex = index;

            }

        });


        dots.forEach((dot, index) => {

            const isActive = index === activeIndex;

            dot.classList.toggle("active", isActive);

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

    }


    // ======================================
    // SWIPE / SCROLL ORIZONTAL
    // ======================================

    cardsContainer.addEventListener("scroll", () => {

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {

            updateDots();

        }, 50);

    }, { passive: true });


    // ======================================
    // CLICK PE INDICATORI
    // ======================================

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (window.innerWidth > 520) {
                return;
            }

            cards[index].scrollIntoView({

                behavior: "smooth",

                block: "nearest",

                inline: "center"

            });

        });

    });


    // ======================================
    // LINKURI CATRE CONTACT
    // ======================================

    const eventLinks =
        popup.querySelectorAll(".event-link");

    eventLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closePopup();

        });

    });


    // ======================================
    // REDIMENSIONARE FEREASTRA
    // ======================================

    window.addEventListener("resize", () => {

        updateDots();

    });


    // ======================================
    // PROTECTIE FOCUS IN POPUP
    // ======================================

    popup.addEventListener("keydown", (event) => {

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = [
            ...popup.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            )
        ];

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
