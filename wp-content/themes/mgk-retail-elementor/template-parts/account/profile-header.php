<?php
/**
 * S12 SEC1 — User information header block (avatar, name, tier badge).
 * $args['user'] = WP_User|false. $args['tier'] = string.
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$user = isset( $args['user'] ) ? $args['user'] : null;
$tier = isset( $args['tier'] ) ? $args['tier'] : 'Member';

$tier_colors = array(
	'Platinum' => '#a78bfa',
	'Gold'     => '#f59e0b',
	'Silver'   => '#94a3b8',
	'Member'   => '#10b981',
);
$tier_color = isset( $tier_colors[ $tier ] ) ? $tier_colors[ $tier ] : $tier_colors['Member'];

$avatar_url = $user ? get_avatar_url( $user->ID, array( 'size' => 80 ) ) : '';
$name       = $user ? $user->display_name  : 'Guest';
$email      = $user ? $user->user_email    : '';
?>
<div class="mgk-profile-header">
	<div class="mgk-profile-header__avatar">
		<?php if ( $avatar_url ) : ?>
			<img src="<?php echo esc_url( $avatar_url ); ?>"
				 alt="<?php echo esc_attr( $name ); ?>"
				 width="80" height="80" loading="lazy">
		<?php else : ?>
			<span class="mgk-profile-header__avatar-placeholder" aria-hidden="true">&#128100;</span>
		<?php endif; ?>
	</div>

	<div class="mgk-profile-header__info">
		<h2 class="mgk-profile-header__name"><?php echo esc_html( $name ); ?></h2>
		<?php if ( $email ) : ?>
			<p class="mgk-profile-header__email"><?php echo esc_html( $email ); ?></p>
		<?php endif; ?>
		<span class="mgk-profile-header__tier" style="--tier-color:<?php echo esc_attr( $tier_color ); ?>">
			<?php echo esc_html( $tier ); ?> Member
		</span>
	</div>

	<div class="mgk-profile-header__actions">
		<?php if ( $user ) : ?>
			<a class="mgk-btn mgk-btn--ghost mgk-btn--sm"
			   href="<?php echo esc_url( wc_get_account_endpoint_url( 'edit-account' ) ); ?>">
				Edit Profile
			</a>
		<?php endif; ?>
	</div>
</div>
