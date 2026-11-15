document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTE
       ========================================== */

    const popup = document.getElementById("eventsPopup");

    if (!popup) return;

    const modal = popup.querySelector(".events-modal");

    const openButton = document.getElementById("openEvents");
    const closeButton = document.getElementById("closeEvents");

    const eventsView = document.getElementById("eventsView");
    const packagesView = document.getElementById("packagesView");

    const backButton = document.getElementById("backToEvents");
    const selectedEventText = document.getElementById("selectedEvent");

    const eventsCards = document.querySelector(".events-cards");
    const packagesGrid = document.querySelector(".packages-grid");

    const eventsDots = document.getElementById("eventsDots");
    const packagesDots = document.getElementById("packagesDots");

    /* NUMĂR WHATSAPP */

    const photographerPhone = "40730548517";

    let currentEvent = "";
    let previousFocus = null;

    const isMobile = () =>
        window.matchMedia("(max-width: 520px)").matches;


    /* ==========================================
       DESCHIDERE POPUP
       ========================================== */

    function openPopup() {

        previousFocus = document.activeElement;

        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("events-open");

        showEvents();

        if (closeButton) {
            closeButton.focus();
        }
    }


    /* ==========================================
       ÎNCHIDERE POPUP
       ========================================== */

    function closePopup() {

        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");

        document.body.classList.remove("events-open");

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }


    openButton?.addEventListener("click", openPopup);

    closeButton?.addEventListener("click", closePopup);


    /* ÎNCHIDERE LA CLICK ÎN AFARA FERESTREI */

    popup.addEventListener("click", (event) => {

        if (event.target === popup) {
            closePopup();
        }

    });


    /* ==========================================
       TASTATURĂ
       ========================================== */

    document.addEventListener("keydown", (event) => {

        if (!popup.classList.contains("active")) return;

        if (event.key === "Escape") {

            closePopup();

            return;
        }

        if (event.key === "Tab" && modal) {

            const focusable = modal.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {
                event.preventDefault();
                last.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }

    });


    /* ==========================================
       RESET CARUSEL
       ========================================== */

    function resetCarousel(container) {

        if (!container) return;

        container.scrollTo({
            left: 0,
            behavior: "instant"
        });

    }


    /* ==========================================
       AFIȘARE EVENIMENTE
       ========================================== */

    function showEvents() {

        if (!eventsView || !packagesView) return;

        eventsView.hidden = false;
        packagesView.hidden = true;

        currentEvent = "";

        if (modal) {
            modal.scrollTop = 0;
        }

        resetCarousel(eventsCards);

        requestAnimationFrame(() => {

            updateDots(eventsCards, eventsDots);

        });

    }


    /* ==========================================
       AFIȘARE PACHETE
       ========================================== */

    function showPackages(eventName) {

        if (!eventsView || !packagesView) return;

        currentEvent = eventName;

        if (selectedEventText) {
            selectedEventText.textContent = eventName;
        }

        eventsView.hidden = true;
        packagesView.hidden = false;

        if (modal) {
            modal.scrollTop = 0;
        }

        resetCarousel(packagesGrid);

        requestAnimationFrame(() => {

            if (modal) {
                modal.scrollTop = 0;
            }

            updateDots(packagesGrid, packagesDots);

        });

    }


    /* ÎNAPOI LA EVENIMENTE */

    backButton?.addEventListener("click", showEvents);


    /* ==========================================
       SELECTARE EVENIMENT
       ========================================== */

    document.querySelectorAll("[data-event]").forEach((button) => {

        button.addEventListener("click", () => {

            const eventName = button.dataset.event;

            if (!eventName) return;

            showPackages(eventName);

        });

    });


    /* ==========================================
       WHATSAPP
       ========================================== */

    document.querySelectorAll("[data-package]").forEach((button) => {

        button.addEventListener("click", () => {

            const packageName = button.dataset.package;

            if (!currentEvent || !packageName) return;

            const message =
                `Bună ziua! Am văzut site-ul L&A Photography și sunt interesat(ă) de o ofertă pentru evenimentul: ${currentEvent}.\n\n` +
                `Pachetul dorit: ${packageName}.\n\n` +
                `Aș dori să primesc mai multe detalii despre pachet și disponibilitate. Mulțumesc!`;

            const whatsappURL =
                `https://wa.me/${photographerPhone}?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

            closePopup();

        });

    });


    /* ==========================================
       FUNCȚII CARUSELE
       ========================================== */

    function getCards(container) {

        if (!container) return [];

        return Array.from(container.children).filter((element) => {

            return (
                element.classList.contains("event-card") ||
                element.classList.contains("package-card")
            );

        });

    }


    /* IDENTIFICĂ CARDUL ACTIV */

    function getActiveIndex(container) {

        const cards = getCards(container);

        if (!cards.length) return 0;

        const containerRect = container.getBoundingClientRect();

        const center =
            containerRect.left + container.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {

            const rect = card.getBoundingClientRect();

            const cardCenter = rect.left + rect.width / 2;

            const distance = Math.abs(cardCenter - center);

            if (distance < closestDistance) {

                closestDistance = distance;
                closestIndex = index;

            }

        });

        return closestIndex;

    }


    /* ==========================================
       CREARE INDICATORI
       ========================================== */

    function createDots(container, dotsContainer) {

        if (!container || !dotsContainer) return;

        const cards = getCards(container);

        dotsContainer.innerHTML = "";

        cards.forEach((card, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Cardul ${index + 1}`
            );

            dot.addEventListener("click", () => {

                if (!isMobile()) return;

                const containerRect =
                    container.getBoundingClientRect();

                const cardRect =
                    card.getBoundingClientRect();

                const cardLeft =
                    cardRect.left -
                    containerRect.left +
                    container.scrollLeft;

                const position =
                    cardLeft -
                    (container.clientWidth - card.clientWidth) / 2;

                container.scrollTo({
                    left: position,
                    behavior: "smooth"
                });

            });

            dotsContainer.appendChild(dot);

        });

        updateDots(container, dotsContainer);

    }


    /* ==========================================
       ACTUALIZARE INDICATORI
       ========================================== */

    function updateDots(container, dotsContainer) {

        if (!container || !dotsContainer) return;

        const dots = Array.from(dotsContainer.children);

        const activeIndex = getActiveIndex(container);

        dots.forEach((dot, index) => {

            const active = index === activeIndex;

            dot.classList.toggle("active", active);

            if (active) {

                dot.setAttribute("aria-current", "true");

            } else {

                dot.removeAttribute("aria-current");

            }

        });

    }


    /* ==========================================
       INIȚIALIZARE CARUSEL
       ========================================== */

    function setupCarousel(container, dotsContainer) {

        if (!container || !dotsContainer) return;

        createDots(container, dotsContainer);

        let scrollTimeout;

        container.addEventListener("scroll", () => {

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {

                updateDots(container, dotsContainer);

            }, 50);

        }, { passive: true });

    }


    /* PORNIRE CARUSELE */

    setupCarousel(eventsCards, eventsDots);

    setupCarousel(packagesGrid, packagesDots);


    /* ==========================================
       REDIMENSIONARE FEREASTRĂ
       ========================================== */

    let resizeTimeout;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {

            createDots(eventsCards, eventsDots);

            createDots(packagesGrid, packagesDots);

        }, 150);

    });


});
