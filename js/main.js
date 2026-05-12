function showPage(id) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    const page = document.getElementById("page-" + id);
    if (page) page.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("nav-active"));
    document.querySelectorAll(`.nav-links a[data-page="${id}"]`).forEach((a) => a.classList.add("nav-active"));
}

function goToContact() {
    showPage("about");
    setTimeout(() => {
        const el = document.getElementById("contact-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("nav-active"));
        document.querySelectorAll('.nav-links a[data-page="contact"]').forEach((a) => a.classList.add("nav-active"));
    }, 50);
}

function toggleMenu() {
    const links = document.getElementById("navLinks");
    if (links) links.classList.toggle("open");
}

function closeMenu() {
    const links = document.getElementById("navLinks");
    if (links) links.classList.remove("open");
}

function filterGallery(cat, btn) {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.style.display = cat === "all" || item.dataset.cat === cat ? "" : "none";
    });
}

function toggleFaq(item) {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
}

function submitForm() {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const occasion = document.getElementById("occasion").value;
    const details = document.getElementById("details").value.trim();
    const deadline = document.getElementById("deadline").value.trim();
    const materials = [];
    if (document.getElementById("mat1").checked) materials.push("Natural wood");
    if (document.getElementById("mat2").checked) materials.push("Acrylic / Perspex");
    if (document.getElementById("mat3").checked) materials.push("No preference");

    if (!fname || !email || !product || !details) {
        alert("Please fill in all required fields (marked with *).");
        return;
    }

    const lines = [
        "Hi SR Woodcraft & Designs! I'd like to place a custom order.",
        "",
        "*Name:* " + fname + (lname ? " " + lname : ""),
        "*Email:* " + email,
        phone ? "*Phone:* " + phone : null,
        "*Type of Piece:* " + product,
        occasion ? "*Occasion:* " + occasion : null,
        materials.length ? "*Materials:* " + materials.join(", ") : null,
        deadline ? "*Deadline:* " + deadline : null,
        "",
        "*Details:*",
        details,
    ].filter((l) => l !== null);

    const message = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/5926154413?text=" + message, "_blank");
}

function submitContact() {
    const name = document.getElementById("cname").value.trim();
    const email = document.getElementById("cemail").value.trim();
    const msg = document.getElementById("cmsg").value.trim();
    if (!name || !email || !msg) {
        alert("Please fill in all fields.");
        return;
    }
    document.getElementById("contactSuccess").style.display = "block";
    document.querySelector(".contact-right .submit-btn").disabled = true;
    document.querySelector(".contact-right .submit-btn").style.opacity = "0.5";
}

function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.getElementById("lightbox-img").src = "";
    document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
});

window.addEventListener("scroll", function () {
    const btn = document.getElementById("scrollTop");
    if (btn) btn.classList.toggle("visible", window.scrollY > 300);
});

document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const bg = el.dataset.bg;
                if (bg) el.style.backgroundImage = "url('" + bg + "')";
                obs.unobserve(el);
            }
        });
    }, { rootMargin: "200px" });

    document.querySelectorAll(".gallery-placeholder").forEach(function (el) {
        const style = el.getAttribute("style") || "";
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match) {
            el.dataset.bg = match[1];
            el.style.backgroundImage = "none";
            el.addEventListener("click", function () { openLightbox(match[1]); });
            observer.observe(el);
        }
    });
});
