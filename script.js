document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("eventsPopup");
    const openButton = document.getElementById("openEvents");
    const closeButton = document.getElementById("closeEvents");
    const eventsView = document.getElementById("eventsView");
    const packagesView = document.getElementById("packagesView");
    const backButton = document.getElementById("backToEvents");
    const selectedEvent = document.getElementById("selectedEvent");
    const modal = popup?.querySelector(".events-modal");

    if (!popup || !openButton || !closeButton || !eventsView ||
        !packagesView || !backButton || !selectedEvent || !modal) {
        return;
    }

    const photographerPhone = "40730548517";

    let currentEvent = "";
    let previousFocus = null;

    // Creează navigarea cu buline și sincronizeaz-o cu poziția cardului.
    function setupCarousel(container, cardSelector, dotsId) {
        if (!container) return null;

        const dotsContainer = document.getElementById(dotsId);
        const cards = Array.from(container.querySelectorAll(cardSelector));

        if (!dotsContainer || !cards.length) return null;

        dotsContainer.innerHTML = "";

        const dots = cards.map((card, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Afișează cardul ${index + 1}`);

            dot.addEventListener("click", () => {
                const targetLeft =
                    card.offsetLeft -
                    (container.clientWidth - card.clientWidth) / 2;

                container.scrollTo({
                    left: targetLeft,
                    behavior: "smooth"
                });
            });

            dotsContainer.appendChild(dot);
            return dot;
        });

        let scrollFrame = null;

        function updateDots() {
            if (scrollFrame) cancelAnimationFrame(scrollFrame);

            scrollFrame = requestAnimationFrame(() => {
                const containerRect = container.getBoundingClientRect();
                const center = containerRect.left + containerRect.width / 2;

                let activeIndex = 0;
                let closestDistance = Infinity;

                cards.forEach((card, index) => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(center - cardCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        activeIndex = index;
                    }
                });

                dots.forEach((dot, index) => {
                    const active = index === activeIndex;
                    dot.classList.toggle("active", active);
                    dot.setAttribute("aria-current", active ? "true" : "false");
                });
            });
        }

        container.addEventListener("scroll", updateDots, { passive: true });
        window.addEventListener("resize", updateDots);

        function reset() {
            container.scrollTo({ left: 0, behavior: "instant" });
            updateDots();
        }

        updateDots();

        return { reset, update: updateDots };
    }

    const eventsCarousel = setupCarousel(
        document.querySelector(".events-cards"),
        ".event-card",
        "eventsDots"
    );

    const packagesCarousel = setupCarousel(
        document.querySelector(".packages-grid"),
        ".package-card",
        "packagesDots"
    );

    function showEvents() {
        eventsView.hidden = false;
        packagesView.hidden = true;

        eventsView.classList.add("active");
        packagesView.classList.remove("active");

        modal.scrollTop = 0;

        requestAnimationFrame(() => eventsCarousel?.reset());
    }

    function showPackages(eventName) {
        currentEvent = eventName;
        selectedEvent.textContent = eventName;

        eventsView.hidden = true;
        packagesView.hidden = false;

        eventsView.classList.remove("active");
        packagesView.classList.add("active");

        modal.scrollTop = 0;

        requestAnimationFrame(() => packagesCarousel?.reset());

        backButton.focus();
    }

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

    function closePopup() {
        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");
        document.body.classList.remove("events-open");

        showEvents();

        if (previousFocus && previousFocus.isConnected) {
            previousFocus.focus();
        }
    }

    openButton.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    popup.addEventListener("click", (event) => {
        if (event.target === popup) closePopup();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup.classList.contains("active")) {
            closePopup();
        }
    });

    eventsView.querySelectorAll(".event-link[data-event]").forEach((button) => {
        button.addEventListener("click", () => {
            const eventName = button.dataset.event;
            if (eventName) showPackages(eventName);
        });
    });

    backButton.addEventListener("click", () => {
        showEvents();

        const firstEventButton = eventsView.querySelector(".event-link");
        firstEventButton?.focus();
    });

    document.querySelectorAll(".package-button[data-package]").forEach((button) => {
        button.addEventListener("click", () => {
            const packageName = button.dataset.package;
            if (!currentEvent || !packageName) return;

            const message =
                `Bună ziua! Am vizitat site-ul L&A Photography ` +
                `și sunt interesat(ă) de o ofertă pentru evenimentul: ` +
                `${currentEvent}, pachetul ${packageName}.\n\n` +
                `Aș dori să primesc mai multe detalii despre serviciile ` +
                `incluse și prețul acestui pachet.\n\n` +
                `Mulțumesc!`;

            const whatsappURL =
                `https://wa.me/${photographerPhone}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    });

    // Menține focusul în fereastra popup cât timp aceasta este deschisă.
    popup.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;

        const activeView = packagesView.hidden ? eventsView : packagesView;

        const focusableElements = [
            closeButton,
            ...activeView.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            )
        ].filter((element) => {
            return !element.hidden && element.getClientRects().length > 0;
        });

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });

});
