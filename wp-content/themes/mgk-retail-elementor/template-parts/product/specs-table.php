<?php
/**
 * S03 SEC5 — technical specifications table (DATA from _mgk_specs, edited in wp-admin).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$specs = $args['specs'] ?? array();
if ( ! $specs ) { return; }
?>
<section class="mgk-specs">
	<h2 class="mgk-specs__title">Technical specifications</h2>
	<table class="mgk-specs__table">
		<tbody>
			<?php foreach ( $specs as $k => $v ) : ?>
				<tr>
					<th scope="row"><?php echo esc_html( $k ); ?></th>
					<td><?php echo esc_html( $v ); ?></td>
				</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
</section>
