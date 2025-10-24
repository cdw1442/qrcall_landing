// ==============================
// Navigation 
// ==============================
function initNavigation() {
	const offcanvas = document.querySelector("#mainNavbar");
	const navbarToggler = document.querySelector(".navbar-toggler");
	if (!offcanvas || !navbarToggler) return;

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
	// ✅ PC hover 처리 (pointerenter/pointerleave 안정화)
	// ----------------------------
	document.querySelectorAll("#mainNavbar > .offcanvas-body > .navbar-nav > .dropdown").forEach(parent => {
		const headerItem = parent.querySelector(":scope > ul > li.nav-item");
		const link = headerItem ? headerItem.querySelector(".nav-link") : null;
		const submenu = parent.querySelector(".dropdown-menu");
		if (!link || !submenu) return;

		parent.addEventListener("pointerenter", () => {
			if (window.innerWidth > 991) {
				closeAll();
				submenu.classList.add("is-open");
				link.classList.add("is-active");
				link.setAttribute("aria-expanded", "true");
			}
		});

		parent.addEventListener("pointerleave", () => {
			if (window.innerWidth > 991) {
				submenu.classList.remove("is-open");
				link.classList.remove("is-active");
				link.setAttribute("aria-expanded", "false");
			}
		});
	});

	// ----------------------------
	// ✅ 모바일 1depth 메뉴 클릭 (dropdown/비드롭다운 open/active)
	// ----------------------------
	document.querySelectorAll("#mainNavbar > .offcanvas-body > .navbar-nav > .dropdown > ul > li.nav-item > .nav-link")
	.forEach((link) => {
		link.addEventListener("click", (e) => {
			const parentItem = link.closest(".nav-item");
			const parentDropdown = parentItem.closest(".dropdown");
			const submenu = parentDropdown.querySelector(".dropdown-menu");

			if (window.innerWidth <= 991) {
				if (submenu) {
					e.preventDefault();
					const isOpen = submenu.classList.contains("is-open");

					// 다른 메뉴 닫기
					document.querySelectorAll("#mainNavbar .dropdown").forEach((item) => {
						const s = item.querySelector(".dropdown-menu");
						const l = item.querySelector(":scope > ul > li.nav-item > .nav-link");
						s?.classList.remove("is-open");
						l?.classList.remove("is-active");
						l?.setAttribute("aria-expanded", "false");
					});

					// 현재 메뉴 토글
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
					document.body.classList.add("no-scroll");
				} else {
					// dropdown 없는 메뉴 → 오프캔버스 닫기 + 스크롤 복원
					offcanvas.classList.remove("is-show");
					document.body.classList.remove("no-scroll");
				}
			}
		});
	});

	// ----------------------------
	// 하위 메뉴(nav-link) 클릭 → 페이지 이동 + 닫기
	// ----------------------------
	document.querySelectorAll("#mainNavbar .dropdown-menu .nav-link").forEach(subLink => {
		subLink.addEventListener("click", (e) => {
			if (window.innerWidth <= 991) {
				const href = subLink.getAttribute("href");
				if (href && href.startsWith("#/")) {
					e.preventDefault();
					window.location.hash = href;
				}
				closeAll();
				offcanvas.classList.remove("is-show");
				document.body.classList.remove("no-scroll");
			}
		});
	});

	// ----------------------------
	// ✅ Brand Logo 클릭 시 오프캔버스 닫기 + 초기화
	// ----------------------------
	const brandLogo = document.querySelector(".header__brand a[href='#/']");
	if (brandLogo) {
		brandLogo.addEventListener("click", (e) => {
			if (window.innerWidth <= 991) {
				const href = brandLogo.getAttribute("href");
				if (href && href.startsWith("#/")) {
					e.preventDefault();
					window.location.hash = href;
				}
				closeAll();
				offcanvas.classList.remove("is-show");
				document.body.classList.remove("no-scroll");
			}
		});
	}

	// ----------------------------
	// 햄버거 토글
	// ----------------------------
	navbarToggler.addEventListener("click", () => {
		const isOpen = offcanvas.classList.toggle("is-show");
		document.body.classList.toggle("no-scroll", isOpen);
	});

	// ----------------------------
	// 외부 클릭 시 드롭다운 닫기 (PC)
	// ----------------------------
	document.addEventListener("click", (e) => {
		if (window.innerWidth > 991 && !e.target.closest(".dropdown") && !e.target.closest(".navbar-toggler") && !e.target.closest("#mainNavbar")) {
			closeAll();
		}
	});

	// ----------------------------
	// 리사이즈 시 초기화
	// ----------------------------
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		const currentWidth = window.innerWidth;
		if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
			closeAll();
			offcanvas.classList.remove("is-show");
			document.body.classList.remove("no-scroll");
		}
		lastWidth = currentWidth;
	});
}

// ==============================
// Accordion (공통)
// ==============================
function initAccordion() {
	const accordions = document.querySelectorAll(".accordion");

	accordions.forEach((accordion) => {
		const items = accordion.querySelectorAll(".accordion-item");

		items.forEach((item) => {
			const button = item.querySelector(".accordion-button");
			const collapse = item.querySelector(".accordion-collapse");

			if (!button || !collapse) return;

			button.addEventListener("click", () => {
				const isOpen = !button.classList.contains("collapsed");

				// 현재 클릭한 아코디언 항목이 열려 있으면 닫기
				if (isOpen) {
					button.classList.add("collapsed");
					button.setAttribute("aria-expanded", "false");
					collapse.classList.remove("is-show");
					collapse.classList.add("collapse");
				} else {
					// 닫힌 항목이면 열기
					button.classList.remove("collapsed");
					button.setAttribute("aria-expanded", "true");
					collapse.classList.add("is-show");
					collapse.classList.remove("collapse");
				}
			});
		});
	});
}



// ==============================
// Swiper 초기화
// - 768px 이하 loop 활성화, 3번째 슬라이드부터 시작
// ==============================
function initSwiper() {
	const el = document.querySelector(".swiper-pricing");
	if (!el) return;

	// 768px 이하 → 모바일
	const isMobile = window.innerWidth <= 768;

	// 기존 Swiper 인스턴스 제거 (중복 초기화 방지)
	if (el.swiper) {
		el.swiper.destroy(true, true);
	}

	const swiper = new Swiper(".swiper-pricing", {
		slidesPerView: 1,
		loop: isMobile, // 모바일일 때 loop 활성화
		cssMode: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			991: { slidesPerView: 4 },
		},
		mousewheel: true,
		keyboard: true,

		on: {
			init(swiper) {
				// 모바일에서만 3번째 슬라이드(인덱스 2)부터 시작
				if (isMobile) {
					swiper.slideToLoop(2, 0); 
				}
			},
		},
	});
}


// ==============================
// Popover 초기화
// - data-popover -> lib
// - data-popover-target(#id) -> lib
// - next sibling .popover-content(.pop-comp-content) <- data-popover에서 채움
// - 라이브러리 API 차이(init vs constructor) 자동 대응
// ==============================
function initPopover() {
	if (typeof PopoverComponent === "undefined" || !PopoverComponent.init) return;

	document.querySelectorAll(".popover-ele").forEach((btn) => {
		if (btn.dataset.popoverInitialized) return;

		const data = btn.dataset.popover?.trim();
		let content = btn.nextElementSibling;

		if (data && content?.classList.contains("popover-content")) {
			const inner = content.querySelector(".pop-comp-content");
			if (inner) inner.innerHTML = data;
			content.style.display = "none";
		}

		if (!btn.dataset.popoverTarget && content) {
			if (!content.id) content.id = "popover-" + Math.random().toString(36).slice(2, 9);
			btn.dataset.popoverTarget = "#" + content.id;
		}

		btn.dataset.popoverInitialized = "true";
	});

	PopoverComponent.init({ 
		ele: ".popover-ele",
		position: 'top left', // top, bottom, left, right 가능
		hideArrowIcon: true,
	});
}


// ==============================
// PC / Mobile 감지 기능
// ==============================
function handleFeatureVisibility() {
	const pcFeatures = document.querySelectorAll(".features-pc");
	const mobileFeatures = document.querySelectorAll(".features-mobile");

	const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
	const isMobile = isMobileDevice;

	if (isMobile) {
		pcFeatures.forEach(el => el.classList.add("hidden"));
		mobileFeatures.forEach(el => el.classList.remove("hidden"));
	} else {
		pcFeatures.forEach(el => el.classList.remove("hidden"));
		mobileFeatures.forEach(el => el.classList.add("hidden"));
	}
}



// ==============================
// 라우팅 테이블
// ==============================
const routes = {
	"/": "tpl-home",
	"/services/qr-url": "tpl-services-qrUrl",
	"/services/custom-page": "tpl-services-customPage",
	"/services/contact-options": "tpl-services-contactOptions",
	"/services/data-manager": "tpl-services-dataManager",
	"/solutions/cs": "tpl-business-cs",
	"/solutions/operation": "tpl-business-operation",
	"/solutions/o4o": "tpl-business-o4o",
	"/solutions/mycar": "tpl-business-mycar",
	"/pricing": "tpl-pricing",
	"/privacy-policy": "tpl-privacy",
	"/terms-of-service": "tpl-terms-service",
	"/terms-of-location": "tpl-terms-location"
};





// ==============================
// 라우터 실행
// ==============================
function router() {
	const path = window.location.hash.replace("#", "") || "/";
	const tplId = routes[path] || routes["/"];
	const tpl = document.getElementById(tplId);

	if (!tpl) return;

	document.getElementById("app").innerHTML = tpl.innerHTML;
	// 페이지 공통 초기화
	initSwiper(); 
	initAccordion();
	handleFeatureVisibility();
	initPopover();
	// 라우터 후 페이지 상단 이동
	window.scrollTo({ top: 0, behavior: "smooth" });
}





// ==============================
// 초기화
// ==============================
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
	const headerTpl = document.getElementById("tpl-header");
	const footerTpl = document.getElementById("tpl-footer");

	if (headerTpl && footerTpl) {
		document.getElementById("header").innerHTML = headerTpl.innerHTML;
		document.getElementById("footer").innerHTML = footerTpl.innerHTML;
	}

	router();

	// 헤더 주입 후 initNavigation 실행
	requestAnimationFrame(() => {
		initNavigation();
		initPopover(); // 팝오버 최초 초기화
	});

	// 라우팅 완료 시 팝오버 다시 초기화
	window.addEventListener("hashchange", () => {
		setTimeout(initPopover, 100);
	});

	// 리사이징 시 모바일/PC 감지 재실행
	let lastMode = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "pc";
	window.addEventListener("resize", () => {
		const currentMode = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "pc";
		if (currentMode !== lastMode) {
			handleFeatureVisibility();
			lastMode = currentMode;
		}
	});
});

