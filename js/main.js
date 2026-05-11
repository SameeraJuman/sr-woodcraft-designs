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
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("product").value;
    const details = document.getElementById("details").value.trim();
    if (!fname || !email || !product || !details) {
        alert("Please fill in all required fields (marked with *).");
        return;
    }
    document.getElementById("formSuccess").style.display = "block";
    document.querySelector("#orderForm .submit-btn").disabled = true;
    document.querySelector("#orderForm .submit-btn").style.opacity = "0.5";
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

    document.querySelectorAll(".gallery-placeholder").forEach(function (el) {
        const style = el.getAttribute("style") || "";
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match) {
            el.addEventListener("click", function () { openLightbox(match[1]); });
        }
    });
});
