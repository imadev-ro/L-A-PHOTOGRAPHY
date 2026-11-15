document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("eventsPopup");
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

    const photographerPhone = "40730548517";

    let currentEvent = "";
    let previousFocus = null;

    const isMobile = () => window.matchMedia("(max-width: 520px)").matches;

    /* =====================================
       DESCHIDERE / INCHIDERE POPUP
    ===================================== */

    function openPopup() {
        previousFocus = document.activeElement;

        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("events-open");

        showEvents();

        closeButton.focus();
    }

    function closePopup() {
        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");

        document.body.classList.remove("events-open");

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    openButton.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!popup.classList.contains("active")) return;

        if (event.key === "Escape") {
            closePopup();
        }

        if (event.key === "Tab") {
            const focusable = modal.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    /* =====================================
       SCHIMBARE ECRANE
    ===================================== */

    function showEvents() {
        eventsView.hidden = false;
        packagesView.hidden = true;

        currentEvent = "";

        modal.scrollTop = 0;

        resetCarousel(eventsCards);
        updateDots(eventsCards, eventsDots);
    }

    function showPackages(eventName) {
        currentEvent = eventName;

        selectedEventText.textContent = eventName;

        eventsView.hidden = true;
        packagesView.hidden = false;

        modal.scrollTop = 0;

        resetCarousel(packagesGrid);

        requestAnimationFrame(() => {
            modal.scrollTop = 0;
            updateDots(packagesGrid, packagesDots);
        });
    }

    backButton.addEventListener("click", showEvents);

    /* =====================================
       SELECTARE EVENIMENT
    ===================================== */

    document.querySelectorAll(".event-link[data-event]").forEach((button) => {
        button.addEventListener("click", () => {
            const eventName = button.dataset.event;

            if (!eventName) return;

            showPackages(eventName);
        });
    });

    /* =====================================
       SOLICITARE OFERTA WHATSAPP
    ===================================== */

    document.querySelectorAll(".package-button[data-package]").forEach((button) => {
        button.addEventListener("click", () => {
            const packageName = button.dataset.package;

            if (!currentEvent || !packageName) return;

            const message =
                `Bună ziua! Am văzut site-ul L&A Photography și sunt interesat(ă) de o ofertă pentru evenimentul: ${currentEvent}.\n\n` +
                `Pachetul dorit: ${packageName}.\n\n` +
                `Aș dori să primesc mai multe detalii despre pachet și disponibilitate. Mulțumesc!`;

            const whatsappURL =
                `https://wa.me/${photographerPhone}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank", "noopener,noreferrer");

            closePopup();
        });
    });

    /* =====================================
       CARUSELE SI INDICATORI
    ===================================== */

    function getCards(container) {
        if (!container) return [];

        return Array.from(container.children).filter((element) => {
            return element.classList.contains("event-card") ||
                   element.classList.contains("package-card");
        });
    }

    function resetCarousel(container) {
        if (!container) return;

        container.scrollTo({
            left: 0,
            behavior: "instant"
        });
    }

    /* Cardul cel mai apropiat de centrul caruselului */
    function getActiveIndex(container) {
        const cards = getCards(container);

        if (!cards.length) return 0;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + container.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;

            const distance = Math.abs(cardCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function createDots(container, dotsContainer) {
        if (!container || !dotsContainer) return;

        const cards = getCards(container);

        dotsContainer.innerHTML = "";

        cards.forEach((card, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Cardul ${index + 1}`);

            if (index === 0) {
                dot.classList.add("active");
                dot.setAttribute("aria-current", "true");
            }

            dot.addEventListener("click", () => {
                if (!isMobile()) return;

                const containerRect = container.getBoundingClientRect();
                const cardRect = card.getBoundingClientRect();

                const cardLeft =
                    cardRect.left -
                    containerRect.left +
                    container.scrollLeft;

                const centeredPosition =
                    cardLeft -
                    (container.clientWidth - card.clientWidth) / 2;

                container.scrollTo({
                    left: centeredPosition,
                    behavior: "smooth"
                });
            });

            dotsContainer.appendChild(dot);
        });
    }

    function updateDots(container, dotsContainer) {
        if (!container || !dotsContainer) return;

        const dots = Array.from(dotsContainer.children);
        const activeIndex = getActiveIndex(container);

        dots.forEach((dot, index) => {
            const isActive = index === activeIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    function setupCarousel(container, dotsContainer) {
        if (!container || !dotsContainer) return;

        createDots(container, dotsContainer);

        let scrollTimeout;

        container.addEventListener("scroll", () => {
            window.clearTimeout(scrollTimeout);

            scrollTimeout = window.setTimeout(() => {
                updateDots(container, dotsContainer);
            }, 50);
        }, { passive: true });
    }

    setupCarousel(eventsCards, eventsDots);
    setupCarousel(packagesGrid, packagesDots);

    /* =====================================
       REDIMENSIONARE FEREASTRA
    ===================================== */

    window.addEventListener("resize", () => {
        createDots(eventsCards, eventsDots);
        createDots(packagesGrid, packagesDots);

        updateDots(eventsCards, eventsDots);
        updateDots(packagesGrid, packagesDots);
    });
});
