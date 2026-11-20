
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTE
       ========================================== */

    const popup = document.getElementById("eventsPopup");
    const modal = popup.querySelector(".events-modal");

    const openButton = document.getElementById("openEvents");
    const closeButton = document.getElementById("closeEvents");

    const eventsView = document.getElementById("eventsView");
    const packagesView = document.getElementById("packagesView");

    const backButton = document.getElementById("backToEvents");

    const selectedEventElement = document.getElementById("selectedEvent");
    const packagesGrid = document.getElementById("packagesGrid");

    const eventsCards = document.querySelector(".events-cards");
    const packagesNavigation = document.getElementById("packagesNavigation");

    const eventsDots = document.getElementById("eventsDots");
    const packagesDots = document.getElementById("packagesDots");

    const eventsNavigation = document.getElementById("eventsNavigation");

    const WHATSAPP_NUMBER = "40730548517";

    let currentEvent = "";
    let currentPackage = "";

    /* ==========================================
       DATE PACHETE
       ========================================== */

    const packages = {

        "Cununie": [

            {
                name: "Basic",
                price: "2.000 lei",
                description: "Emoțiile unui început, păstrate în imagini.",
                style: "basic",

                features: [
                    "Fotografie și videografie pentru ceremonia civilă sau religioasă, fără restaurant, cu o durată de aproximativ 4 ore",
                    "Minimum 300 de fotografii editate",
                    "Montaj video complet al evenimentului",
                    "Ședință foto cu mirii",
                    "Ședință foto cu invitații",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor"
                ],

                delivery: "Predare în 15–20 de zile lucrătoare"
            },

            {
                name: "Gold",
                price: "3.000 lei",
                description: "O experiență completă pentru o zi specială.",
                style: "gold",
                popular: true,

                features: [
                    "Fotografie și videografie pe tot parcursul evenimentului – echipă completă: 1 fotograf și 1 videograf",
                    "Minimum 700 de fotografii editate",
                    "Avanpremieră de 15–20 de fotografii în primele 72 de ore",
                    "Montaj video Best Moments și filmul complet al evenimentului",
                    "Filmări cu drona, în funcție de condițiile meteo și locație",
                    "Ședință foto cu mirii",
                    "Ședință foto cu invitații",
                    "Album foto 30×60 cm, cu design personalizat, 10–16 pagini",
                    "Stick USB cu fotografii și videoclipuri",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor"
                ],

                delivery: "Predare în 7–10 zile lucrătoare"
            }

        ],

        "Nuntă": [

            {
                name: "Silver",
                price: "3.500 lei",
                description: "Eleganță și amintiri de păstrat.",
                style: "silver",

                features: [
                    "Foto și video pe tot parcursul evenimentului",
                    "Ședință foto în ziua evenimentului",
                    "Sesiune foto cu invitații",
                    "Procesarea fotografiilor și a videoclipurilor",
                    "Best Moments – maximum 2 minute",
                    "Galerie online pentru transferul fotografiilor și filmărilor"
                ],

                delivery: "Predare în maximum o lună"
            },

            {
                name: "Gold",
                price: "5.000 lei",
                description: "Mai multe detalii. Mai multe amintiri.",
                style: "gold",
                popular: true,

                features: [
                    "Foto și video pe tot parcursul evenimentului",
                    "Ședință foto în ziua evenimentului",
                    "Sesiune foto cu invitații",
                    "Procesarea fotografiilor și a videoclipurilor",
                    "Best Moments – peste 3 minute",
                    "Galerie online pentru transferul fotografiilor și filmărilor",
                    "Stick USB cu fotografii și filmări",
                    "Save the Date",
                    "Trash the Dress",
                    "Album foto 30×60 cm"
                ],

                delivery: "Predare în maximum o lună"
            },

            {
                name: "Platinum",
                price: "8.500 lei",
                description: "Experiența completă, fără compromisuri.",
                style: "platinum",

                features: [
                    "Doi fotografi și un videograf pe tot parcursul evenimentului",
                    "Ședință foto în ziua evenimentului",
                    "Sesiune foto cu invitații",
                    "Procesarea fotografiilor și a videoclipurilor",
                    "Best Moments Premium",
                    "Galerie online și stick USB pentru transferul fotografiilor și videoclipurilor",
                    "Save the Date",
                    "Trash the Dress",
                    "Filmări cu drona",
                    "Album foto 30×60 cm",
                    "Album foto pentru nași 30×60 cm",
                    "Cabină foto la local – 6 ore, cu costumații, fundal tematic și magneți pentru fotografii"
                ],

                delivery: "Predare în maximum o lună"
            }

        ],

        "Botez": [

            {
                name: "Basic",
                price: "2.000 lei",
                description: "Amintiri prețioase dintr-o zi specială.",
                style: "basic",

                features: [
                    "Fotografie și videografie pentru biserică și restaurant",
                    "Minimum 700 de fotografii editate",
                    "Montaj video complet, cu filmul evenimentului editat cronologic",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor"
                ],

                delivery: "Predare în 45–60 de zile lucrătoare"
            },

            {
                name: "Gold",
                price: "4.000 lei",
                description: "Toate momentele importante, într-o experiență completă.",
                style: "gold",
                popular: true,

                features: [
                    "Fotografie și videografie pe tot parcursul evenimentului – echipă completă: 1 fotograf și 1 videograf, în ritmul bebelușului",
                    "Minimum 1.000 de fotografii editate",
                    "Avanpremieră de 15–20 de fotografii în primele 72 de ore",
                    "Montaj video: Best Moments și filmul complet al evenimentului",
                    "Filmări cu drona, în funcție de condițiile meteo și locație",
                    "Ședință foto cu bebelușul și familia",
                    "Album foto 30×60 cm, cu design personalizat, 15–20 de pagini",
                    "Cabină foto – 4 ore, cu fundal, accesorii, magneți și maximum 2 fotografii printate pentru fiecare grup sau cuplu",
                    "Stick USB cu fotografii și videoclipuri",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor"
                ],

                delivery: "Predare în 15–30 de zile lucrătoare"
            }

        ],

        "Majorat": [

            {
                name: "Basic",
                price: "1.500 lei",
                description: "Cele mai frumoase momente ale majoratului.",
                style: "basic",

                features: [
                    "Fotografie și videografie pe tot parcursul evenimentului",
                    "Minimum 500 de fotografii editate",
                    "Montaj video complet al evenimentului",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor"
                ],

                delivery: ""
            },

            {
                name: "Gold",
                price: "3.500 lei",
                description: "O experiență completă pentru o seară de neuitat.",
                style: "gold",
                popular: true,

                features: [
                    "Fotografie și videografie pe tot parcursul evenimentului",
                    "Minimum 700 de fotografii editate",
                    "Ședință foto înainte de eveniment, la locația aleasă de client",
                    "Montaj video: Best Moments și filmul complet al evenimentului",
                    "Galerie online privată pentru transferul și descărcarea fotografiilor și videoclipurilor",
                    "Stick USB cu fotografii și videoclipuri",
                    "Arcadă de baloane"
                ],

                delivery: ""
            }

        ]

    };

    /* ==========================================
       GENERARE CARDURI
       ========================================== */

    function createPackageCard(packageData) {

        const card = document.createElement("article");

        card.className = `package-card ${packageData.style}`;

        if (packageData.popular) {
            card.classList.add("is-popular");
        }

        const popularLabel = packageData.popular
            ? `<div class="popular-label">RECOMANDAREA NOASTRĂ</div>`
            : "";

        const delivery = packageData.delivery
            ? `
                <div class="package-delivery">
                    <span class="delivery-icon">✓</span>
                    ${packageData.delivery}
                </div>
            `
            : "";

        const featuresHTML = packageData.features
            .map(feature => `<li>${feature}</li>`)
            .join("");

        card.innerHTML = `
            ${popularLabel}

            <div class="package-top">
                <span class="package-label">PACHET</span>

                <h3>${packageData.name}</h3>

                <p class="package-price">${packageData.price}</p>

                <p class="package-description">
                    ${packageData.description}
                </p>
            </div>

            <div class="package-divider"></div>

            <ul class="package-features">
                ${featuresHTML}
            </ul>

            ${delivery}

            <button
                type="button"
                class="package-button"
                data-package="${packageData.name}"
            >
                Solicită oferta <span>→</span>
            </button>
        `;

        return card;
    }

    function renderPackages(eventName) {

        const eventPackages = packages[eventName];

        packagesGrid.innerHTML = "";
         packagesGrid.classList.toggle(
    "two-packages",
    eventPackages && eventPackages.length === 2
);

        if (!eventPackages) {
            return;
        }

        eventPackages.forEach(packageData => {
            packagesGrid.appendChild(createPackageCard(packageData));
        });

        selectedEventElement.textContent = eventName;

        /* Reface indicatorii caruselului */
        createDots(
            packagesGrid,
            packagesDots,
            "packages"
        );

        updateCarouselDots(
            packagesGrid,
            packagesDots
        );

    }

    /* ==========================================
       DESCHIDERE POPUP
       ========================================== */

    function openPopup() {

        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");

        document.body.classList.add("events-open");

        eventsView.hidden = false;
        packagesView.hidden = true;

        currentEvent = "";
        currentPackage = "";

        modal.scrollTop = 0;

        eventsCards.scrollLeft = 0;

        updateCarouselDots(
            eventsCards,
            eventsDots
        );

    }

    /* ==========================================
       ÎNCHIDERE POPUP
       ========================================== */

    function closePopup() {

        popup.classList.remove("active");
        popup.setAttribute("aria-hidden", "true");

        document.body.classList.remove("events-open");

        currentEvent = "";
        currentPackage = "";

    }

    /* ==========================================
       SELECTARE EVENIMENT
       ========================================== */

    function selectEvent(eventName) {

        currentEvent = eventName;

        renderPackages(eventName);

        eventsView.hidden = true;
        packagesView.hidden = false;

        modal.scrollTop = 0;

        packagesGrid.scrollLeft = 0;

        updateCarouselDots(
            packagesGrid,
            packagesDots
        );

    }

    /* ==========================================
       ÎNAPOI LA EVENIMENTE
       ========================================== */

    function backToEvents() {

        packagesView.hidden = true;
        eventsView.hidden = false;

        modal.scrollTop = 0;

        eventsCards.scrollLeft = 0;

        updateCarouselDots(
            eventsCards,
            eventsDots
        );

    }

    /* ==========================================
       WHATSAPP
       ========================================== */

    function requestPackage(packageName) {

        currentPackage = packageName;

        const message =
            `Bună! Sunt interesat(ă) de pachetul ${packageName} pentru evenimentul ${currentEvent}, de la L&A Photography. Aș dori mai multe detalii și să discutăm disponibilitatea.`;

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }

    /* ==========================================
       CARUSEL - INDICATORI
       ========================================== */

    function createDots(container, dotsContainer, type) {

        if (!container || !dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const cards = container.querySelectorAll(
            type === "events"
                ? ".event-card"
                : ".package-card"
        );

        cards.forEach((card, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Elementul ${index + 1}`
            );

            dot.addEventListener("click", () => {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                });

            });

            dotsContainer.appendChild(dot);

        });

    }

    function updateCarouselDots(container, dotsContainer) {

        if (!container || !dotsContainer) {
            return;
        }

        const cards = container.querySelectorAll(
            container === eventsCards
                ? ".event-card"
                : ".package-card"
        );

        const dots = dotsContainer.querySelectorAll(
            ".carousel-dot"
        );

        if (!cards.length || !dots.length) {
            return;
        }

        let activeIndex = 0;

        const containerRect = container.getBoundingClientRect();

        const containerCenter =
            containerRect.left + containerRect.width / 2;

        let closestDistance = Infinity;

        cards.forEach((card, index) => {

            const rect = card.getBoundingClientRect();

            const cardCenter = rect.left + rect.width / 2;

            const distance = Math.abs(
                cardCenter - containerCenter
            );

            if (distance < closestDistance) {

                closestDistance = distance;

                activeIndex = index;

            }

        });

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    }

    /* ==========================================
       EVENT LISTENERS
       ========================================== */

    openButton.addEventListener("click", openPopup);

    closeButton.addEventListener("click", closePopup);

    backButton.addEventListener("click", backToEvents);

    /* Selectare eveniment */

    document.querySelectorAll("[data-event]").forEach(button => {

        button.addEventListener("click", () => {

            const eventName = button.dataset.event;

            selectEvent(eventName);

        });

    });

    /* Selectare pachet - delegare */

    packagesGrid.addEventListener("click", event => {

        const button = event.target.closest("[data-package]");

        if (!button) {
            return;
        }

        requestPackage(button.dataset.package);

    });

    /* Click pe fundal */

    popup.addEventListener("click", event => {

        if (event.target === popup) {
            closePopup();
        }

    });

    /* ESC */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            popup.classList.contains("active")
        ) {
            closePopup();
        }

    });

    /* ==========================================
       CARUSEL EVENIMENTE
       ========================================== */

    createDots(
        eventsCards,
        eventsDots,
        "events"
    );

    eventsCards.addEventListener("scroll", () => {

        updateCarouselDots(
            eventsCards,
            eventsDots
        );

    }, { passive: true });

    /* ==========================================
       CARUSEL PACHETE
       ========================================== */

    packagesGrid.addEventListener("scroll", () => {

        updateCarouselDots(
            packagesGrid,
            packagesDots
        );

    }, { passive: true });

    /* ==========================================
       RESIZE
       ========================================== */

    window.addEventListener("resize", () => {

        updateCarouselDots(
            eventsCards,
            eventsDots
        );

        updateCarouselDots(
            packagesGrid,
            packagesDots
        );

    });

});







/* =========================================================
   L&A PHOTOGRAPHY
   STUDIO & COLLABORATIONS POPUPS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const studioPopup = document.getElementById("studioPopup");
    const collaborationsPopup = document.getElementById("collaborationsPopup");

    const popupButtons = document.querySelectorAll(
        "[data-service-popup]"
    );

    const closeButtons = document.querySelectorAll(
        ".service-popup-close"
    );

    const whatsappStudio = document.querySelector(
        "[data-whatsapp-studio]"
    );

    const whatsappCollaborations = document.querySelector(
        "[data-whatsapp-collaborations]"
    );


    /* =====================================================
       OPEN POPUP
       ===================================================== */

    
function openServicePopup(popup) {
    if (!popup) return;

    popup.style.display = "flex";
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function closeServicePopup(popup) {
    if (!popup) return;

    popup.classList.remove("active");
    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


    /* =====================================================
       SERVICE BUTTONS
       ===================================================== */

    popupButtons.forEach(button => {

        button.addEventListener("click", () => {

            const service = button.dataset.servicePopup;

            if (service === "studio") {
                openServicePopup(studioPopup);
            }

            if (service === "collaborations") {
                openServicePopup(collaborationsPopup);
            }

        });

    });


    /* =====================================================
       CLOSE BUTTONS
       ===================================================== */

    closeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const popup = button.closest(".service-popup-overlay");

            closeServicePopup(popup);

        });

    });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
       ===================================================== */

    [studioPopup, collaborationsPopup].forEach(popup => {

        if (!popup) return;

        popup.addEventListener("click", event => {

            if (event.target === popup) {
                closeServicePopup(popup);
            }

        });

    });


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeServicePopup(studioPopup);
            closeServicePopup(collaborationsPopup);

        }

    });


    /* =====================================================
       WHATSAPP - STUDIO
       ===================================================== */

    if (whatsappStudio) {

        whatsappStudio.addEventListener("click", event => {

            event.preventDefault();

            const message =
                "Bună! Sunt interesat(ă) de o ședință foto de studio, Pachetul Standard, în valoare de 450 lei. Aș dori mai multe detalii despre disponibilitatea decorurilor și programări.";

            const phone = "40730548517";

            const url =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            window.open(url, "_blank", "noopener,noreferrer");

        });

    }


    /* =====================================================
       WHATSAPP - COLLABORATIONS
       ===================================================== */

    if (whatsappCollaborations) {

        whatsappCollaborations.addEventListener("click", event => {

            event.preventDefault();

            const message =
                "Bună! Sunt interesat(ă) de o colaborare pentru grădiniță/școală. Aș dori mai multe informații despre serviciile foto-video, serbări, ședințe foto de final de an, albume și ședințe tematice.";

            const phone = "40730548517";

            const url =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            window.open(url, "_blank", "noopener,noreferrer");

        });

    }

});
