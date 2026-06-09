<?php
/**
 * S12 SEC2 — Order status indicators grid (4 cells: pending, pickup, delivery, to_rate).
 * $args['counts'] = array with keys pending|pickup|delivery|to_rate.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$counts = isset( $args['counts'] ) ? $args['counts'] : array( 'pending' => 0, 'pickup' => 0, 'delivery' => 0, 'to_rate' => 0 );

$orders_base = function_exists( 'wc_get_account_endpoint_url' ) ? wc_get_account_endpoint_url( 'orders' ) : home_url( '/my-account/orders/' );

$cells = array(
	array(
		'key'   => 'pending',
		'icon'  => '&#9203;',
		'label' => 'Pending Payment',
		'url'   => add_query_arg( 'status', 'pending', $orders_base ),
	),
	array(
		'key'   => 'pickup',
		'icon'  => '&#127978;',
		'label' => 'To Pick Up',
		'url'   => add_query_arg( 'status', 'ready-for-pickup', $orders_base ),
	),
	array(
		'key'   => 'delivery',
		'icon'  => '&#128666;',
		'label' => 'In Delivery',
		'url'   => add_query_arg( 'status', 'processing', $orders_base ),
	),
	array(
		'key'   => 'to_rate',
		'icon'  => '&#9733;',
		'label' => 'To Rate',
		'url'   => home_url( '/rate/' ),
	),
);
?>
<section class="mgk-order-status-grid" aria-label="Order status summary">
	<h2 class="mgk-section-heading">My Orders</h2>
	<div class="mgk-order-status-grid__row">
		<?php foreach ( $cells as $cell ) :
			$count = (int) ( isset( $counts[ $cell['key'] ] ) ? $counts[ $cell['key'] ] : 0 );
		?>
			<a class="mgk-order-status-grid__cell" href="<?php echo esc_url( $cell['url'] ); ?>">
				<span class="mgk-order-status-grid__icon" aria-hidden="true"><?php echo $cell['icon']; ?></span>
				<?php if ( $count > 0 ) : ?>
					<span class="mgk-order-status-grid__badge" aria-label="<?php echo esc_attr( $count ); ?> orders"><?php echo esc_html( $count ); ?></span>
				<?php endif; ?>
				<span class="mgk-order-status-grid__label"><?php echo esc_html( $cell['label'] ); ?></span>
			</a>
		<?php endforeach; ?>
	</div>
</section>
