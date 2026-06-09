/* MGK Retail — front-end behaviours: quick-view modal, add-to-cart toast, countdown. */
(function () {
	'use strict';

	/* ----- Toast ----- */
	function toast(msg) {
		var el = document.querySelector('.mgk-toast');
		if (!el) {
			el = document.createElement('div');
			el.className = 'mgk-toast';
			document.body.appendChild(el);
		}
		el.textContent = msg;
		el.classList.add('is-show');
		clearTimeout(el._t);
		el._t = setTimeout(function () { el.classList.remove('is-show'); }, 2200);
	}

	/* ----- Ajax add-to-cart feedback (Woo emits its own event) ----- */
	document.body.addEventListener('click', function (e) {
		var btn = e.target.closest('.mgk-pcard__add, .add_to_cart_button');
		if (btn && btn.classList.contains('ajax_add_to_cart')) {
			toast('Item added to cart');
		}
	});
	if (window.jQuery) {
		window.jQuery(document.body).on('added_to_cart', function (ev, fragments) {
			// Sync our custom top-bar count if Woo fragment is present.
			var c = document.querySelector('[data-mgk-cart-count]');
			var src = document.querySelector('.cart-contents-count, .mgk-topbar__cart-count');
			if (c && src && src !== c) { c.textContent = src.textContent.replace(/\D/g, ''); }
		});
	}

	/* ----- Quick view modal ----- */
	function ensureModal() {
		var m = document.querySelector('#mgk-quickview');
		if (m) { return m; }
		m = document.createElement('div');
		m.id = 'mgk-quickview';
		m.className = 'mgk-modal';
		m.innerHTML = '<div class="mgk-modal__bg" data-close></div><div class="mgk-modal__panel"><button class="mgk-modal__close" data-close aria-label="Close">&times;</button><div class="mgk-modal__content"></div></div>';
		document.body.appendChild(m);
		m.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) { close(m); } });
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(m); } });
		return m;
	}
	function open(m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
	function close(m) { m.classList.remove('is-open'); document.body.style.overflow = ''; }

	document.body.addEventListener('click', function (e) {
		var q = e.target.closest('[data-mgk-quickview]');
		if (!q) { return; }
		e.preventDefault();
		var id = q.getAttribute('data-mgk-quickview');
		var m = ensureModal();
		var content = m.querySelector('.mgk-modal__content');
		content.innerHTML = '<p style="padding:40px;text-align:center;color:#64748b">Loading…</p>';
		open(m);
		var url = (window.MGK_RETAIL && MGK_RETAIL.ajaxUrl) || '/wp-admin/admin-ajax.php';
		fetch(url + '?action=mgk_quickview&id=' + encodeURIComponent(id), { credentials: 'same-origin' })
			.then(function (r) { return r.text(); })
			.then(function (html) { content.innerHTML = html; })
			.catch(function () { content.innerHTML = '<p style="padding:40px;text-align:center">Unable to load preview.</p>'; });
	});

	/* ----- Wishlist heart (presentation toggle) ----- */
	document.body.addEventListener('click', function (e) {
		var fav = e.target.closest('[data-mgk-fav]');
		if (!fav) { return; }
		e.preventDefault();
		var on = fav.classList.toggle('is-on');
		fav.innerHTML = on ? '♥' : '♡';
		toast(on ? 'Added to wishlist' : 'Removed from wishlist');
	});

	/* ----- Edition swatches (presentation toggle) ----- */
	document.body.addEventListener('click', function (e) {
		var opt = e.target.closest('[data-mgk-swatch]');
		if (!opt) { return; }
		var group = opt.closest('.mgk-swatch');
		if (!group) { return; }
		group.querySelectorAll('[data-mgk-swatch]').forEach(function (o) {
			o.classList.toggle('is-active', o === opt);
			o.setAttribute('aria-checked', o === opt ? 'true' : 'false');
		});
		var name = group.querySelector('[data-mgk-swatch-name]');
		if (name) { name.textContent = opt.getAttribute('data-mgk-swatch'); }
	});

	/* ----- Countdown timers ([data-mgk-countdown="<unix-seconds>"]) ----- */
	function pad(n) { return (n < 10 ? '0' : '') + n; }
	function tickAll() {
		var nodes = document.querySelectorAll('[data-mgk-countdown]');
		if (!nodes.length) { return; }
		var now = Math.floor(Date.now() / 1000);
		nodes.forEach(function (n) {
			var target = parseInt(n.getAttribute('data-mgk-countdown'), 10);
			var diff = target - now;
			if (isNaN(target)) { return; }
			if (diff <= 0) {
				n.textContent = n.getAttribute('data-expired') || 'Cutoff reached';
				n.classList.add('is-expired');
				return;
			}
			var h = Math.floor(diff / 3600), mm = Math.floor((diff % 3600) / 60), s = diff % 60;
			n.textContent = pad(h) + ':' + pad(mm) + ':' + pad(s);
			if (diff < 3600) { n.classList.add('is-urgent'); }
		});
	}
	if (document.querySelector('[data-mgk-countdown]')) {
		tickAll();
		setInterval(tickAll, 1000);
	}
})();
