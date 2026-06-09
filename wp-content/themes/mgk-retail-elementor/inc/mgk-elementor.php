<?php
/**
 * MGK Elementor widget engine — ONE config-driven widget class for every section.
 * Behaviour is derived from config (inc/mgk-sections.php). HTML always comes from
 * a template-part via shortcode → mgk_render_part(). Elementor only controls the
 * shell + per-element Style. (See TEMPLATE-BUILD-PLAYBOOK-ELEMENTOR §2-3.)
 *
 * @package mgk-retail
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* -------------------------------------------------------------------------
 *  Category
 * ---------------------------------------------------------------------- */
add_action( 'elementor/elements/categories_registered', function ( $mgr ) {
	$mgr->add_category( 'mgk-retail', array(
		'title' => __( 'MGK Retail', 'mgk-retail' ),
		'icon'  => 'eicon-products',
	) );
} );

/* -------------------------------------------------------------------------
 *  Config lookup (rehydration-safe). Real config lives in mgk_elementor_sections().
 * ---------------------------------------------------------------------- */
function mgk_elementor_section_config( $tag ) {
	static $map = null;
	if ( null === $map ) {
		$map = array();
		if ( function_exists( 'mgk_elementor_sections' ) ) {
			foreach ( mgk_elementor_sections() as $cfg ) {
				if ( ! empty( $cfg['tag'] ) ) { $map[ $cfg['tag'] ] = $cfg; }
			}
		}
	}
	return isset( $map[ $tag ] ) ? $map[ $tag ] : null;
}

/* -------------------------------------------------------------------------
 *  LAZY class definition — must NOT be at file scope (required before Elementor
 *  loads Widget_Base would fatal). Define inside a function, call on elementor/loaded.
 * ---------------------------------------------------------------------- */
function mgk_elementor_define_widget_class() {
	if ( class_exists( 'MGK_Elementor_Section_Widget' ) || ! class_exists( '\Elementor\Widget_Base' ) ) {
		return;
	}

	class MGK_Elementor_Section_Widget extends \Elementor\Widget_Base {

		private $mgk_cfg = array();

		public function __construct( $data = array(), $args = null ) {
			// Resolve config BEFORE parent ctor — Elementor 4.x widget-base __construct()
			// calls get_name() during construction, which must not touch get_data() (data
			// is not assigned yet). Both register + rehydration paths are handled here.
			if ( is_array( $args ) && ! empty( $args['mgk_config'] ) ) {
				$this->mgk_cfg = $args['mgk_config'];
			} elseif ( is_array( $data ) && ! empty( $data['widgetType'] ) ) {
				$c = mgk_elementor_section_config( $data['widgetType'] );
				if ( $c ) { $this->mgk_cfg = $c; }
			}
			parent::__construct( $data, $args );
		}

		/** Rehydration helper: fall back to widgetType only AFTER construction (data set). */
		private function cfg() {
			if ( ! empty( $this->mgk_cfg ) ) { return $this->mgk_cfg; }
			$tag = $this->get_data( 'widgetType' );
			$c   = $tag ? mgk_elementor_section_config( $tag ) : null;
			if ( $c ) { $this->mgk_cfg = $c; }
			return $this->mgk_cfg;
		}

		public function get_name() {
			if ( ! empty( $this->mgk_cfg['tag'] ) ) { return $this->mgk_cfg['tag']; }
			return 'mgk_section';
		}

		public function get_title() {
			$c = $this->cfg();
			return ! empty( $c['title'] ) ? $c['title'] : 'MGK Section';
		}

		public function get_icon() {
			$c = $this->cfg();
			return ! empty( $c['icon'] ) ? $c['icon'] : 'eicon-products';
		}

		public function get_categories() { return array( 'mgk-retail' ); }

		public function get_keywords() { return array( 'mgk', 'retail', 'section' ); }

		/* ---- Controls ---- */
		protected function register_controls() {
			$c = $this->cfg();

			/* CONTENT tab: shell text controls + show/hide switchers. */
			$this->start_controls_section( 'mgk_content', array(
				'label' => __( 'Content', 'mgk-retail' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			) );
			if ( ! empty( $c['controls'] ) ) {
				foreach ( $c['controls'] as $key => $ctl ) {
					$this->mgk_add_control( $key, $ctl );
				}
			}
			$this->end_controls_section();

			/* Optional repeater (CONTENT marketing items only). */
			if ( ! empty( $c['repeater'] ) ) {
				$this->mgk_add_repeater( $c['repeater'] );
			}

			/* STYLE tab: per-element style targets, all scoped to {{WRAPPER}}. */
			if ( ! empty( $c['style_targets'] ) ) {
				foreach ( $c['style_targets'] as $skey => $target ) {
					$this->mgk_register_style_section( $skey, $target );
				}
			}
		}

		private function mgk_add_control( $key, $ctl ) {
			$type    = isset( $ctl['type'] ) ? $ctl['type'] : 'text';
			$default = isset( $ctl['default'] ) ? $ctl['default'] : '';
			$args    = array(
				'label'   => isset( $ctl['label'] ) ? $ctl['label'] : ucfirst( $key ),
				'default' => $default,
			);
			switch ( $type ) {
				case 'textarea':
					$args['type'] = \Elementor\Controls_Manager::TEXTAREA;
					$args['rows'] = 3;
					break;
				case 'wysiwyg':
					$args['type'] = \Elementor\Controls_Manager::WYSIWYG;
					break;
				case 'switcher':
					$args['type']         = \Elementor\Controls_Manager::SWITCHER;
					$args['label_on']     = __( 'Show', 'mgk-retail' );
					$args['label_off']    = __( 'Hide', 'mgk-retail' );
					$args['return_value'] = 'yes';
					$args['default']      = '' === $default ? 'yes' : $default;
					break;
				case 'select':
					$args['type']    = \Elementor\Controls_Manager::SELECT;
					$args['options'] = isset( $ctl['options'] ) ? $ctl['options'] : array();
					break;
				case 'number':
					$args['type'] = \Elementor\Controls_Manager::NUMBER;
					if ( isset( $ctl['min'] ) ) { $args['min'] = $ctl['min']; }
					if ( isset( $ctl['max'] ) ) { $args['max'] = $ctl['max']; }
					break;
				case 'url':
					$args['type']         = \Elementor\Controls_Manager::URL;
					$args['default']      = is_array( $default ) ? $default : array( 'url' => $default );
					$args['placeholder']  = 'https://';
					break;
				case 'media':
					$args['type'] = \Elementor\Controls_Manager::MEDIA;
					break;
				case 'text':
				default:
					$args['type'] = \Elementor\Controls_Manager::TEXT;
					$args['label_block'] = ! empty( $ctl['block'] );
					break;
			}
			if ( ! empty( $ctl['description'] ) ) { $args['description'] = $ctl['description']; }
			$this->add_control( $key, $args );
		}

		private function mgk_add_repeater( $rep ) {
			$this->start_controls_section( 'mgk_repeater', array(
				'label' => isset( $rep['label'] ) ? $rep['label'] : __( 'Items', 'mgk-retail' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			) );
			$repeater = new \Elementor\Repeater();
			foreach ( $rep['fields'] as $fkey => $f ) {
				$repeater->add_control( $fkey, array(
					'label'       => isset( $f['label'] ) ? $f['label'] : ucfirst( $fkey ),
					'type'        => 'textarea' === ( $f['type'] ?? 'text' )
						? \Elementor\Controls_Manager::TEXTAREA
						: \Elementor\Controls_Manager::TEXT,
					'default'     => isset( $f['default'] ) ? $f['default'] : '',
					'label_block' => true,
				) );
			}
			$this->add_control( $rep['control'], array(
				'label'       => isset( $rep['label'] ) ? $rep['label'] : __( 'Items', 'mgk-retail' ),
				'type'        => \Elementor\Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => isset( $rep['defaults'] ) ? $rep['defaults'] : array(),
				'title_field' => isset( $rep['title_field'] ) ? $rep['title_field'] : '',
			) );
			$this->end_controls_section();
		}

		/* ---- Style section builder (features → controls), scoped via {{WRAPPER}}. ---- */
		private function mgk_register_style_section( $skey, $target ) {
			$sel      = isset( $target['selector'] ) ? $target['selector'] : '';
			$features = isset( $target['features'] ) ? $target['features'] : array();
			$wsel     = '{{WRAPPER}} ' . $sel;

			$this->start_controls_section( 'mgk_style_' . $skey, array(
				'label' => isset( $target['label'] ) ? $target['label'] : ucfirst( $skey ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			) );

			if ( in_array( 'typography', $features, true ) ) {
				$this->add_group_control( \Elementor\Group_Control_Typography::get_type(), array(
					'name'     => $skey . '_typo',
					'selector' => $wsel,
				) );
			}
			if ( in_array( 'color', $features, true ) ) {
				$this->add_control( $skey . '_color', array(
					'label'     => __( 'Text color', 'mgk-retail' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'selectors' => array( $wsel => 'color: {{VALUE}};' ),
				) );
			}
			if ( in_array( 'background', $features, true ) ) {
				$this->add_control( $skey . '_bg', array(
					'label'     => __( 'Background', 'mgk-retail' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'selectors' => array( $wsel => 'background-color: {{VALUE}};' ),
				) );
			}
			if ( in_array( 'align', $features, true ) ) {
				$this->add_control( $skey . '_align', array(
					'label'     => __( 'Alignment', 'mgk-retail' ),
					'type'      => \Elementor\Controls_Manager::CHOOSE,
					'options'   => array(
						'left'   => array( 'title' => __( 'Left', 'mgk-retail' ), 'icon' => 'eicon-text-align-left' ),
						'center' => array( 'title' => __( 'Center', 'mgk-retail' ), 'icon' => 'eicon-text-align-center' ),
						'right'  => array( 'title' => __( 'Right', 'mgk-retail' ), 'icon' => 'eicon-text-align-right' ),
					),
					'selectors' => array( $wsel => 'text-align: {{VALUE}};' ),
				) );
			}
			if ( in_array( 'padding', $features, true ) ) {
				$this->add_responsive_control( $skey . '_padding', array(
					'label'      => __( 'Padding', 'mgk-retail' ),
					'type'       => \Elementor\Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', 'em', '%' ),
					'selectors'  => array( $wsel => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
				) );
			}
			if ( in_array( 'margin', $features, true ) ) {
				$this->add_responsive_control( $skey . '_margin', array(
					'label'      => __( 'Margin', 'mgk-retail' ),
					'type'       => \Elementor\Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', 'em', '%' ),
					'selectors'  => array( $wsel => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
				) );
			}
			if ( in_array( 'border', $features, true ) ) {
				$this->add_group_control( \Elementor\Group_Control_Border::get_type(), array(
					'name'     => $skey . '_border',
					'selector' => $wsel,
				) );
				$this->add_responsive_control( $skey . '_radius', array(
					'label'      => __( 'Border radius', 'mgk-retail' ),
					'type'       => \Elementor\Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', '%' ),
					'selectors'  => array( $wsel => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ),
				) );
			}
			if ( in_array( 'shadow', $features, true ) ) {
				$this->add_group_control( \Elementor\Group_Control_Box_Shadow::get_type(), array(
					'name'     => $skey . '_shadow',
					'selector' => $wsel,
				) );
			}
			if ( in_array( 'width', $features, true ) ) {
				$this->add_responsive_control( $skey . '_width', array(
					'label'      => __( 'Max width', 'mgk-retail' ),
					'type'       => \Elementor\Controls_Manager::SLIDER,
					'size_units' => array( 'px', '%' ),
					'range'      => array( 'px' => array( 'min' => 60, 'max' => 1400 ) ),
					'selectors'  => array( $wsel => 'max-width: {{SIZE}}{{UNIT}}; width: 100%;' ),
				) );
			}
			if ( in_array( 'hover', $features, true ) ) {
				$this->add_control( $skey . '_hover_color', array(
					'label'     => __( 'Hover text color', 'mgk-retail' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'selectors' => array( $wsel . ':hover' => 'color: {{VALUE}};' ),
				) );
				$this->add_control( $skey . '_hover_bg', array(
					'label'     => __( 'Hover background', 'mgk-retail' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'selectors' => array( $wsel . ':hover' => 'background-color: {{VALUE}};' ),
				) );
			}

			$this->end_controls_section();
		}

		/* ---- Render: always ONE partial via shortcode. ---- */
		protected function render() {
			$c = $this->cfg();
			if ( empty( $c['tag'] ) ) { return; }
			$settings = $this->get_settings_for_display();

			// Repeater path: render partial directly with items (avoids huge shortcode atts).
			if ( ! empty( $c['repeater'] ) && ! empty( $settings[ $c['repeater']['control'] ] ) ) {
				$items = mgk_elementor_repeater_items( $c['repeater'], $settings[ $c['repeater']['control'] ] );
				if ( $items ) {
					$args = $this->mgk_collect_atts( $c, $settings );
					$args['items'] = $items;
					mgk_render_part( $c['repeater']['partial'], $args, true );
					return;
				}
			}

			echo do_shortcode( $this->mgk_build_shortcode( $c['tag'], $this->mgk_collect_atts( $c, $settings ) ) );
		}

		/** Collect shell text + switcher atts (NEVER data). Empty → omitted → shortcode falls back. */
		private function mgk_collect_atts( $c, $settings ) {
			$atts = array();
			if ( ! empty( $c['controls'] ) ) {
				foreach ( $c['controls'] as $key => $ctl ) {
					if ( ! isset( $settings[ $key ] ) ) { continue; }
					$val = $settings[ $key ];
					if ( is_array( $val ) && isset( $val['url'] ) ) { $val = $val['url']; }
					if ( '' === $val || null === $val ) { continue; }
					$atts[ $key ] = $val;
				}
			}
			return $atts;
		}

		private function mgk_build_shortcode( $tag, $atts ) {
			$sc = '[' . $tag;
			foreach ( $atts as $k => $v ) {
				if ( is_array( $v ) ) { continue; }
				$sc .= ' ' . $k . '="' . esc_attr( $v ) . '"';
			}
			$sc .= ']';
			return $sc;
		}

		/** Server-side render in editor preview too. */
		protected function content_template() {}
	}
}

/** Map repeater rows → partial item shape. */
function mgk_elementor_repeater_items( $rep, $rows ) {
	$out = array();
	$map = isset( $rep['map'] ) ? $rep['map'] : 'assoc';
	foreach ( (array) $rows as $row ) {
		if ( 'pairs' === $map ) {
			$pair = array();
			foreach ( array_keys( $rep['fields'] ) as $fk ) { $pair[] = isset( $row[ $fk ] ) ? $row[ $fk ] : ''; }
			if ( '' === trim( implode( '', $pair ) ) ) { continue; }
			$out[] = $pair;
		} else {
			$assoc = array();
			$empty = true;
			foreach ( array_keys( $rep['fields'] ) as $fk ) {
				$assoc[ $fk ] = isset( $row[ $fk ] ) ? $row[ $fk ] : '';
				if ( '' !== trim( (string) $assoc[ $fk ] ) ) { $empty = false; }
			}
			if ( $empty ) { continue; }
			$out[] = $assoc;
		}
	}
	return $out;
}

/* -------------------------------------------------------------------------
 *  Boot: define class lazily, register all configured widgets.
 * ---------------------------------------------------------------------- */
add_action( 'elementor/loaded', 'mgk_elementor_define_widget_class' );

add_action( 'elementor/widgets/register', function ( $widgets_manager ) {
	mgk_elementor_define_widget_class();
	if ( ! class_exists( 'MGK_Elementor_Section_Widget' ) || ! function_exists( 'mgk_elementor_sections' ) ) {
		return;
	}
	foreach ( mgk_elementor_sections() as $cfg ) {
		if ( empty( $cfg['tag'] ) ) { continue; }
		$widgets_manager->register( new MGK_Elementor_Section_Widget( array(), array( 'mgk_config' => $cfg ) ) );
	}
} );

/* -------------------------------------------------------------------------
 *  Style-target helpers (keep section configs terse).
 * ---------------------------------------------------------------------- */
function mgk_style_text( $label, $selector, $features = array( 'typography', 'color', 'align' ) ) {
	return array( 'label' => $label, 'selector' => $selector, 'features' => $features );
}
function mgk_style_box( $label, $selector ) {
	return array( 'label' => $label, 'selector' => $selector, 'features' => array( 'background', 'padding', 'margin', 'border', 'shadow' ) );
}
function mgk_style_button( $label, $selector ) {
	return array( 'label' => $label, 'selector' => $selector, 'features' => array( 'typography', 'color', 'background', 'padding', 'border', 'width', 'hover' ) );
}
