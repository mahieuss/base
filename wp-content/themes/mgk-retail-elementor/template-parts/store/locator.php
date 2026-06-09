<?php
/**
 * S10 — Store Locator & Collection Points.
 * Shell: $args['a']. DATA: $args['stores'] = array of store data arrays.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$a      = isset( $args['a'] )      ? $args['a']      : array();
$stores = isset( $args['stores'] ) ? $args['stores'] : array();

$regions = array_values( array_unique( array_column( $stores, 'region' ) ) );
sort( $regions );

// Fixed pseudo-coords for Singapore's 4 zones (for the SVG pin map).
$zone_coords = array(
	'Central' => array( 200, 120 ),
	'East'    => array( 315, 132 ),
	'West'    => array( 95,  140 ),
	'North'   => array( 195, 55  ),
);
?>
<div class="mgk-container mgk-locator">
	<header class="mgk-page-header">
		<h1><?php echo esc_html( isset( $a['heading'] ) ? $a['heading'] : '' ); ?></h1>
		<p><?php echo esc_html( isset( $a['sub'] ) ? $a['sub'] : '' ); ?></p>
	</header>

	<!-- SEC1 — Proximity / Region filter bar -->
	<div class="mgk-locator__filters" data-mgk-locator-filters>
		<div class="mgk-locator__filter-group">
			<label for="mgk-filter-region">Region</label>
			<select id="mgk-filter-region" name="region" data-mgk-filter="region">
				<option value="">All Regions</option>
				<?php foreach ( $regions as $r ) : ?>
					<option value="<?php echo esc_attr( $r ); ?>"><?php echo esc_html( $r ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class="mgk-locator__filter-group">
			<label for="mgk-filter-dist">Distance</label>
			<select id="mgk-filter-dist" name="distance" data-mgk-filter="distance">
				<option value="">Any Distance</option>
				<option value="2">Within 2 km</option>
				<option value="5">Within 5 km</option>
				<option value="10">Within 10 km</option>
			</select>
		</div>
		<div class="mgk-locator__filter-group">
			<label for="mgk-filter-status">Status</label>
			<select id="mgk-filter-status" name="status" data-mgk-filter="status">
				<option value="">All Stores</option>
				<option value="open">Open Now</option>
			</select>
		</div>
	</div>

	<div class="mgk-locator__body">

		<!-- SEC2 — Store list column -->
		<div class="mgk-locator__list" data-mgk-store-list aria-label="Store list">
			<?php if ( empty( $stores ) ) : ?>
				<p class="mgk-locator__empty">No stores match your criteria. Try adjusting your filters.</p>
			<?php else : ?>
				<?php foreach ( $stores as $i => $store ) : ?>
					<article class="mgk-locator__store<?php echo $store['open'] ? '' : ' is-closed'; ?>"
							 data-region="<?php echo esc_attr( $store['region'] ); ?>"
							 data-open="<?php echo $store['open'] ? '1' : '0'; ?>"
							 data-store-index="<?php echo esc_attr( $i ); ?>">
						<div class="mgk-locator__store-header">
							<h3 class="mgk-locator__store-name"><?php echo esc_html( $store['name'] ); ?></h3>
							<span class="mgk-locator__store-badge mgk-locator__store-badge--<?php echo $store['open'] ? 'open' : 'closed'; ?>">
								<?php echo $store['open'] ? 'Open' : 'Closed'; ?>
							</span>
						</div>
						<p class="mgk-locator__store-mall">
							<?php echo esc_html( $store['mall'] ); ?> &middot; <?php echo esc_html( $store['floor'] ); ?>
						</p>
						<p class="mgk-locator__store-hours">
							<span aria-hidden="true">&#128336;</span> <?php echo esc_html( $store['hours'] ); ?>
						</p>
						<p class="mgk-locator__store-phone">
							<span aria-hidden="true">&#128222;</span>
							<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $store['phone'] ) ); ?>">
								<?php echo esc_html( $store['phone'] ); ?>
							</a>
						</p>
						<button type="button"
								class="mgk-btn mgk-btn--ghost mgk-btn--sm"
								data-mgk-map-focus="<?php echo esc_attr( $i ); ?>">
							View on Map
						</button>
					</article>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>

		<!-- SEC3 — Interactive map canvas (SVG placeholder; swap in Google Maps / Leaflet as needed) -->
		<div class="mgk-locator__map" data-mgk-store-map>
			<svg class="mgk-locator__map-svg" viewBox="0 0 400 260"
				 xmlns="http://www.w3.org/2000/svg"
				 role="img" aria-label="Singapore store locations map">
				<rect width="400" height="260" fill="#e8f4f8" rx="8"/>
				<!-- Zone labels -->
				<text x="200" y="18" text-anchor="middle" fill="#64748b" font-size="9" font-family="sans-serif">NORTH</text>
				<text x="200" y="252" text-anchor="middle" fill="#64748b" font-size="9" font-family="sans-serif">SOUTH</text>
				<text x="8" y="135" text-anchor="start" fill="#64748b" font-size="9" font-family="sans-serif">WEST</text>
				<text x="392" y="135" text-anchor="end" fill="#64748b" font-size="9" font-family="sans-serif">EAST</text>
				<!-- Island rough outline -->
				<ellipse cx="200" cy="140" rx="165" ry="90" fill="#d4eaf7" stroke="#94a3b8" stroke-width="1"/>
				<!-- Store pin markers -->
				<?php
				$region_count = array();
				foreach ( $stores as $i => $store ) :
					$region = $store['region'];
					$base   = isset( $zone_coords[ $region ] ) ? $zone_coords[ $region ] : array( 200, 130 );
					$offset = isset( $region_count[ $region ] ) ? $region_count[ $region ] : 0;
					$region_count[ $region ] = $offset + 1;
					$cx = $base[0] + ( $offset % 3 ) * 18 - 18;
					$cy = $base[1] + (int) floor( $offset / 3 ) * 18;
				?>
					<g class="mgk-locator__pin<?php echo $store['open'] ? '' : ' is-closed'; ?>"
					   data-store-index="<?php echo esc_attr( $i ); ?>"
					   role="button" tabindex="0"
					   aria-label="<?php echo esc_attr( $store['name'] ); ?>">
						<circle cx="<?php echo esc_attr( $cx ); ?>" cy="<?php echo esc_attr( $cy ); ?>" r="10"
								fill="<?php echo $store['open'] ? '#16a34a' : '#94a3b8'; ?>"
								stroke="#fff" stroke-width="2"/>
						<text x="<?php echo esc_attr( $cx ); ?>" y="<?php echo esc_attr( $cy + 4 ); ?>"
							  text-anchor="middle" fill="#fff" font-size="10"
							  font-family="sans-serif" pointer-events="none">&#x2605;</text>
					</g>
				<?php endforeach; ?>
			</svg>
			<p class="mgk-locator__map-hint">Click a pin to highlight the store details.</p>
		</div>

	</div>
</div>
