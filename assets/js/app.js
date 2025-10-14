// ==============================
// Navigation 초기화
// ==============================
function initNavigation() {
	const navItems = document.querySelectorAll(".nav-item.dropdown");
	const navbarToggler = document.querySelector(".navbar-toggler");
	const offcanvas = document.querySelector("#mainNavbar");

	if (!navbarToggler || !offcanvas) return;

	// ----------------------------
	// 1depth 메뉴 hover (PC)
	// ----------------------------
	navItems.forEach((item) => {
		const link = item.querySelector(".nav-link");
		const submenu = item.querySelector(".dropdown-menu");
		if (!submenu) return;

		item.addEventListener("mouseenter", () => {
			if (window.innerWidth > 991) {
				submenu.classList.add("is-open");
				link.classList.add("is-active");
				link.setAttribute("aria-expanded", "true");
			}
		});

		item.addEventListener("mouseleave", () => {
			if (window.innerWidth > 991) {
				submenu.classList.remove("is-open");
				link.classList.remove("is-active");
				link.setAttribute("aria-expanded", "false");
			}
		});
	});

	// ----------------------------
	// 모바일 1depth 메뉴 클릭 (dropdown/비드롭다운)
	// ----------------------------
	document.querySelectorAll("#mainNavbar .nav-item > .nav-link").forEach((link) => {
		link.addEventListener("click", (e) => {
			const parentItem = link.closest(".nav-item");
			const submenu = parentItem.querySelector(".dropdown-menu");

			if (window.innerWidth <= 991) {
				if (submenu) {
					// dropdown 있는 메뉴 → 토글
					e.preventDefault();
					const isOpen = submenu.classList.contains("is-open");

					navItems.forEach((item) => {
						if (item !== parentItem) {
							const s = item.querySelector(".dropdown-menu");
							const l = item.querySelector(".nav-link");
							s?.classList.remove("is-open");
							l?.classList.remove("is-active");
							l?.setAttribute("aria-expanded", "false");
						}
					});

					if (isOpen) {
						submenu.classList.remove("is-open");
						link.classList.remove("is-active");
						link.setAttribute("aria-expanded", "false");
					} else {
						submenu.classList.add("is-open");
						link.classList.add("is-active");
						link.setAttribute("aria-expanded", "true");
					}

					// 오프캔버스 유지 + 스크롤 막기
					offcanvas.classList.add("is-show");
					document.body.style.overflow = "hidden";

				} else {
					// dropdown 없는 메뉴 → 오프캔버스 닫기 + 스크롤 복원
					offcanvas.classList.remove("is-show");
					document.body.style.overflow = "";
				}
			}
		});
	});

	// ----------------------------
	// 하위 메뉴 클릭 → 오프캔버스 닫기
	// ----------------------------
	document.querySelectorAll("#mainNavbar .dropdown-menu .nav-link").forEach((subLink) => {
		subLink.addEventListener("click", () => {
			if (window.innerWidth <= 991) {
				offcanvas.classList.remove("is-show");
				document.body.style.overflow = "";
			}
		});
	});

	// ----------------------------
	// 로고 클릭 → 오프캔버스 닫기
	// ----------------------------
	const logoLink = document.querySelector(".header__brand a[href='#/']");
	if (logoLink) {
		logoLink.addEventListener("click", () => {
			if (window.innerWidth <= 991) {
				offcanvas.classList.remove("is-show");
				document.body.style.overflow = "";
			}
		});
	}

	// ----------------------------
	// 외부 클릭 → 드롭다운 닫기
	// ----------------------------
	document.addEventListener("click", (e) => {
		if (
			!e.target.closest(".nav-item.dropdown") &&
			!e.target.closest(".navbar-toggler") &&
			!e.target.closest("#mainNavbar")
		) {
			navItems.forEach((item) => {
				const submenu = item.querySelector(".dropdown-menu");
				const link = item.querySelector(".nav-link");
				submenu?.classList.remove("is-open");
				link?.classList.remove("is-active");
				link?.setAttribute("aria-expanded", "false");
			});
		}
	});

	// ----------------------------
	// 모바일 햄버거 토글
	// ----------------------------
	navbarToggler.addEventListener("click", () => {
		offcanvas.classList.toggle("is-show");
		document.body.style.overflow = offcanvas.classList.contains("is-show") ? "hidden" : "";
	});

	// ----------------------------
	// 리사이즈 시 초기화
	// ----------------------------
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		const currentWidth = window.innerWidth;
		if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
			navItems.forEach((item) => {
				const submenu = item.querySelector(".dropdown-menu");
				const link = item.querySelector(".nav-link");
				submenu?.classList.remove("is-open");
				link?.classList.remove("is-active");
				link?.setAttribute("aria-expanded", "false");
			});
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
	'/terms-of-service': 'tpl-terms'
,
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

	// 라우터 및 네비게이션 활성화
	router();
	initNavigation();
});
