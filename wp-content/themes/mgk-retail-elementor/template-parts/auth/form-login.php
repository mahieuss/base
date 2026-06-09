<?php
/**
 * S13 — Secure Login & Registration Portal.
 * Tab-toggle (Sign In / Register) with OTP box and social CTAs.
 * Hooks into WooCommerce auth flow (field names, nonces, action hooks).
 *
 * @package mgk-retail
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$redirect   = isset( $args['redirect'] ) ? $args['redirect'] : home_url( '/my-account/' );
$active_tab = ( isset( $_GET['register'] ) ) ? 'register' : 'login'; // phpcs:ignore WordPress.Security.NonceVerification
?>
<div class="mgk-auth" data-mgk-auth>

	<!-- SEC1 — Unified Authentication tab switcher -->
	<div class="mgk-auth__tabs" role="tablist" aria-label="Authentication mode">
		<button type="button"
				class="mgk-auth__tab<?php echo 'login' === $active_tab ? ' is-active' : ''; ?>"
				role="tab"
				aria-selected="<?php echo 'login' === $active_tab ? 'true' : 'false'; ?>"
				aria-controls="mgk-auth-login"
				data-mgk-auth-tab="login">
			Sign In
		</button>
		<button type="button"
				class="mgk-auth__tab<?php echo 'register' === $active_tab ? ' is-active' : ''; ?>"
				role="tab"
				aria-selected="<?php echo 'register' === $active_tab ? 'true' : 'false'; ?>"
				aria-controls="mgk-auth-register"
				data-mgk-auth-tab="register">
			Register
		</button>
	</div>

	<!-- SEC2 — Login form panel -->
	<div class="mgk-auth__panel<?php echo 'login' === $active_tab ? ' is-active' : ''; ?>"
		 id="mgk-auth-login"
		 role="tabpanel"
		 data-mgk-auth-panel="login">
		<form class="mgk-auth__form" method="post" novalidate>
			<?php do_action( 'woocommerce_login_form_start' ); ?>

			<div class="mgk-auth__field">
				<label for="mgk-username">Email Address</label>
				<input type="email"
					   id="mgk-username"
					   name="username"
					   autocomplete="username"
					   required
					   value="<?php echo esc_attr( isset( $_POST['username'] ) ? wp_unslash( $_POST['username'] ) : '' ); // phpcs:ignore ?>">
			</div>

			<!-- SEC2 — Password with visibility toggle -->
			<div class="mgk-auth__field">
				<label for="mgk-password">Password</label>
				<div class="mgk-auth__password-wrap">
					<input type="password"
						   id="mgk-password"
						   name="password"
						   autocomplete="current-password"
						   required>
					<button type="button" class="mgk-auth__eye" data-mgk-toggle-pwd aria-label="Show password">
						&#128065;
					</button>
				</div>
			</div>

			<div class="mgk-auth__remember-row">
				<label class="mgk-auth__remember">
					<input type="checkbox" name="rememberme" value="forever">
					Keep me signed in
				</label>
				<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>" class="mgk-auth__forgot">
					Forgot password?
				</a>
			</div>

			<?php do_action( 'woocommerce_login_form' ); ?>
			<input type="hidden" name="redirect" value="<?php echo esc_attr( $redirect ); ?>">
			<?php wp_nonce_field( 'woocommerce-login', 'woocommerce-login-nonce' ); ?>

			<button type="submit" name="login" value="Sign In" class="mgk-btn mgk-btn--primary mgk-btn--full">
				Sign In
			</button>
			<?php do_action( 'woocommerce_login_form_end' ); ?>
		</form>
	</div>

	<!-- SEC2 — Register form panel -->
	<div class="mgk-auth__panel<?php echo 'register' === $active_tab ? ' is-active' : ''; ?>"
		 id="mgk-auth-register"
		 role="tabpanel"
		 data-mgk-auth-panel="register">
		<form class="mgk-auth__form" method="post" novalidate>
			<?php do_action( 'woocommerce_register_form_start' ); ?>

			<?php if ( 'no' === get_option( 'woocommerce_registration_generate_username' ) ) : ?>
				<div class="mgk-auth__field">
					<label for="reg-username">Username</label>
					<input type="text"
						   id="reg-username"
						   name="username"
						   autocomplete="username"
						   value="<?php echo esc_attr( isset( $_POST['username'] ) ? wp_unslash( $_POST['username'] ) : '' ); // phpcs:ignore ?>">
				</div>
			<?php endif; ?>

			<div class="mgk-auth__field">
				<label for="reg-email">Email Address</label>
				<input type="email"
					   id="reg-email"
					   name="email"
					   autocomplete="email"
					   required
					   value="<?php echo esc_attr( isset( $_POST['email'] ) ? wp_unslash( $_POST['email'] ) : '' ); // phpcs:ignore ?>">
			</div>

			<?php if ( 'no' === get_option( 'woocommerce_registration_generate_password' ) ) : ?>
				<div class="mgk-auth__field">
					<label for="reg-password">Password</label>
					<div class="mgk-auth__password-wrap">
						<input type="password"
							   id="reg-password"
							   name="password"
							   autocomplete="new-password"
							   required>
						<button type="button" class="mgk-auth__eye" data-mgk-toggle-pwd aria-label="Show password">
							&#128065;
						</button>
					</div>
					<div class="mgk-auth__strength" data-mgk-pwd-strength aria-live="polite"></div>
				</div>
			<?php endif; ?>

			<!-- SEC3 — Singapore Mobile OTP verification box -->
			<div class="mgk-auth__field">
				<label for="reg-phone">Singapore Mobile (+65)</label>
				<div class="mgk-auth__otp-row">
					<span class="mgk-auth__phone-prefix">+65</span>
					<input type="tel"
						   id="reg-phone"
						   name="billing_phone"
						   autocomplete="tel"
						   pattern="[89][0-9]{7}"
						   placeholder="8123 4567"
						   maxlength="8">
					<button type="button" class="mgk-btn mgk-btn--ghost mgk-btn--sm" data-mgk-send-otp>
						Send OTP
					</button>
				</div>
				<div class="mgk-auth__otp-input" data-mgk-otp-box hidden>
					<input type="text"
						   name="otp_code"
						   placeholder="Enter 6-digit OTP"
						   maxlength="6"
						   inputmode="numeric"
						   pattern="[0-9]{6}"
						   autocomplete="one-time-code">
					<span class="mgk-auth__otp-timer" data-mgk-otp-timer aria-live="polite"></span>
				</div>
			</div>

			<?php do_action( 'woocommerce_register_form' ); ?>
			<?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>

			<button type="submit" name="register" value="Register" class="mgk-btn mgk-btn--primary mgk-btn--full">
				Create Account &rarr;
			</button>
			<?php do_action( 'woocommerce_register_form_end' ); ?>
		</form>
	</div>

	<!-- SEC4 — Third-Party Social Sign-In CTAs -->
	<div class="mgk-auth__social">
		<p class="mgk-auth__social-divider"><span>or continue with</span></p>
		<div class="mgk-auth__social-btns">
			<button type="button" class="mgk-btn mgk-btn--social" data-provider="google">
				<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.64 9.2c0-.638-.057-1.252-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.036 17.64 11.728 17.64 9.2z" fill="#4285F4"/>
					<path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
					<path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
					<path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
				</svg>
				Continue with Google
			</button>
			<button type="button" class="mgk-btn mgk-btn--social" data-provider="apple">
				<svg aria-hidden="true" width="14" height="17" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d="M13.284 12.898c-.26.598-.571 1.148-.934 1.653-.492.7-.895 1.185-1.205 1.454-.481.442-.996.668-1.549.68-.396 0-.874-.113-1.43-.341-.558-.227-1.07-.34-1.538-.34-.49 0-1.016.113-1.581.34-.567.228-1.024.347-1.373.359-.531.023-1.058-.21-1.58-.699-.335-.29-.757-.792-1.265-1.506-.543-.762-.989-1.642-1.343-2.638C.13 11.02 0 10.03 0 9.07c0-1.105.239-2.059.717-2.857A4.205 4.205 0 012.274 4.66a4.05 4.05 0 012.039-.575c.4 0 .924.124 1.575.366.649.244 1.066.367 1.249.367.137 0 .601-.144 1.387-.431.744-.267 1.372-.378 1.887-.335 1.394.112 2.442.661 3.138 1.65-1.246.755-1.863 1.814-1.851 3.172.011 1.057.395 1.936 1.149 2.63a3.78 3.78 0 001.148.751c-.092.267-.19.523-.292.764zM10.215.006c0 .828-.303 1.602-.907 2.315-.73.854-1.612 1.347-2.567 1.271a2.582 2.582 0 01-.02-.315c0-.794.345-1.643.958-2.338C8.29.627 8.716.331 9.264.095 9.81-.14 10.326-.258 10.807-.258c.014.088.02.178.02.264H10.215z"/>
				</svg>
				Continue with Apple
			</button>
		</div>
	</div>

</div>
