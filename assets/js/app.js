// ==============================
// Navigation 
// ==============================
function initNavigation() {
	const dropdownParents = document.querySelectorAll("#mainNavbar > .offcanvas-body > .navbar-nav > .dropdown");
	const navbarToggler = document.querySelector(".navbar-toggler");
	const offcanvas = document.querySelector("#mainNavbar");
	if (!navbarToggler || !offcanvas) return;

	// ----------------------------
	// 공통: 닫기 헬퍼
	// ----------------------------
	const closeAll = () => {
		document.querySelectorAll("#mainNavbar .dropdown-menu").forEach(s => s.classList.remove("is-open"));
		document.querySelectorAll("#mainNavbar .nav-link").forEach(l => {
			l.classList.remove("is-active");
			l.setAttribute("aria-expanded", "false");
		});
		document.querySelectorAll("#mainNavbar .btn_toggle").forEach(b => {
			b.classList.remove("is-active");
			b.setAttribute("aria-expanded", "false");
		});
	};

	// ----------------------------
	// PC hover 처리
	// ----------------------------
	dropdownParents.forEach(parent => {
		const headerItem = parent.querySelector(":scope > ul > li.nav-item");
		const link = headerItem ? headerItem.querySelector(".nav-link") : null;
		const submenu = parent.querySelector(".dropdown-menu");
		if (!link || !submenu) return;

		parent.addEventListener("mouseenter", () => {
			if (window.innerWidth > 768) {
				closeAll();
				submenu.classList.add("is-open");
				link.classList.add("is-active");
				link.setAttribute("aria-expanded", "true");
			}
		});

		parent.addEventListener("mouseleave", () => {
			if (window.innerWidth > 768) {
				submenu.classList.remove("is-open");
				link.classList.remove("is-active");
				link.setAttribute("aria-expanded", "false");
			}
		});
	});

	// ----------------------------
	// 모바일: btn_toggle 클릭으로 하위 메뉴 토글
	// ----------------------------
	document.querySelectorAll("#mainNavbar .btn_toggle").forEach(btn => {
		btn.addEventListener("click", (e) => {
			if (window.innerWidth > 768) return;
			e.preventDefault();
			e.stopPropagation();

			const headerItem = btn.closest(".nav-item");
			const parentDropdown = headerItem?.closest(".dropdown");
			const submenu = parentDropdown?.querySelector(".dropdown-menu");
			const headerLink = headerItem?.querySelector(".nav-link");
			if (!submenu) return;

			const isOpen = submenu.classList.contains("is-open");
			closeAll();

			if (!isOpen) {
				submenu.classList.add("is-open");
				headerLink?.classList.add("is-active");
				headerLink?.setAttribute("aria-expanded", "true");
				btn.classList.add("is-active");
				btn.setAttribute("aria-expanded", "true");
			}
		});
	});

	// ----------------------------
	// 모바일: 1depth 링크 클릭 → 페이지 이동 + 오프캔버스 닫기
	// ----------------------------
	document.querySelectorAll("#mainNavbar > .offcanvas-body > .navbar-nav > .dropdown > ul > li.nav-item > .nav-link")
		.forEach(headerLink => {
			headerLink.addEventListener("click", (e) => {
				if (window.innerWidth <= 768) {
					const href = headerLink.getAttribute("href");
					if (href && href.startsWith("#/")) {
						e.preventDefault();
						window.location.hash = href;
						closeAll();
						offcanvas.classList.remove("is-show");
						document.body.style.overflow = "";
					}
				}
			});
		});

	// ----------------------------
	// 하위 메뉴(nav-link) 클릭 → 페이지 이동 + 닫기
	// ----------------------------
	document.querySelectorAll("#mainNavbar .dropdown-menu .nav-link").forEach(subLink => {
		subLink.addEventListener("click", (e) => {
			if (window.innerWidth <= 768) {
				const href = subLink.getAttribute("href");
				if (href && href.startsWith("#/")) {
					e.preventDefault();
					window.location.hash = href;
				}
				closeAll();
				offcanvas.classList.remove("is-show");
				document.body.style.overflow = "";
			}
		});
	});

	// ----------------------------
	// ✅ Brand Logo 클릭 시 오프캔버스 닫기 + 초기화
	// ----------------------------
	const brandLogo = document.querySelector(".header__brand a[href='#/']");
	if (brandLogo) {
		brandLogo.addEventListener("click", (e) => {
			if (window.innerWidth <= 768) {
				const href = brandLogo.getAttribute("href");
				if (href && href.startsWith("#/")) {
					e.preventDefault();
					window.location.hash = href;
				}
				closeAll();
				offcanvas.classList.remove("is-show");
				document.body.style.overflow = "";
			}
		});
	}

	// ----------------------------
	// 햄버거 토글
	// ----------------------------
	navbarToggler.addEventListener("click", () => {
		offcanvas.classList.toggle("is-show");
		document.body.style.overflow = offcanvas.classList.contains("is-show") ? "hidden" : "";
	});

	// ----------------------------
	// 외부 클릭 시 드롭다운 닫기 (PC)
	// ----------------------------
	document.addEventListener("click", (e) => {
		if (window.innerWidth > 768 && !e.target.closest(".dropdown") && !e.target.closest(".navbar-toggler") && !e.target.closest("#mainNavbar")) {
			closeAll();
		}
	});

	// ----------------------------
	// 리사이즈 시 초기화
	// ----------------------------
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		const currentWidth = window.innerWidth;
		if ((lastWidth > 768 && currentWidth <= 768) || (lastWidth <= 768 && currentWidth > 768)) {
			closeAll();
			offcanvas.classList.remove("is-show");
			document.body.style.overflow = "";
		}
		lastWidth = currentWidth;
	});
}




// ==============================
// Swiper 초기화
// ==============================
function initSwiper() {
	if (document.querySelector(".mainSwiper")) {
		new Swiper(".mainSwiper", {
			cssMode: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			mousewheel: true,
			keyboard: true,
		});
	}
}

// ==============================
// 라우팅 테이블
// ==============================
const routes = {
	'/': 'tpl-home',
	'/services/qr-url': 'tpl-services-qrUrl',
	'/services/custom-page': 'tpl-services-customPage',
	'/services/contact-options': 'tpl-services-contactOptions',
	'/services/data-manager': 'tpl-services-dataManager',
	'/solutions/cs': 'tpl-business-cs',
	'/solutions/mycar': 'tpl-business-mycar',
	'/solutions/o4o': 'tpl-business-o4o',
	'/solutions/operation': 'tpl-business-operation',
	'/pricing': 'tpl-pricing',
	'/contact': 'tpl-contact',
	'/privacy-policy': 'tpl-privacy',
	'/terms-of-service': 'tpl-terms',
};

// ==============================
// 라우터 실행
// ==============================
function router() {
	const path = window.location.hash.replace('#', '') || '/';
	const tplId = routes[path] || routes['/'];
	const tpl = document.getElementById(tplId);

	if (tpl) {
		document.getElementById('app').innerHTML = tpl.innerHTML;
		initSwiper();

		// ✅ 라우팅 완료 후 스크롤 맨 위로 이동
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}


// ==============================
// 초기화
// ==============================
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
	// header, footer 주입
	document.getElementById('header').innerHTML = document.getElementById('tpl-header').innerHTML;
	document.getElementById('footer').innerHTML = document.getElementById('tpl-footer').innerHTML;

	// 라우터 실행
	router();

	// ✅ header / nav DOM이 주입된 뒤 Navigation 초기화
	setTimeout(() => {
		initNavigation();
	}, 0);
});

