<template>
	<section class="order-ls__tabs tabs">
			<ul class="tabs__caption">
				<li class="active">Информация о заказе</li>
				<li>Ваши данные</li>
				<li>Торговый представитель</li>
				<li class="marked">Документы</li>
			</ul>
			<!--tabs content-->
			<div class="tabs__content order-ls__info active">
				<ul class="order-ls__info-list">
					<li class="order-ls__info-title">Название компании</li>
					<li class="order-ls__info-txt">
						<span class="order-ls__info-logo--name">{{order.net.official.name}}</span>

					</li>

					<li class="order-ls__info-title">Телефон получателя</li>
					<li class="order-ls__info-txt" v-if='order.phone'>{{order.phone}}</li>
					<li class="order-ls__info-txt" v-if='!order.phone'>неуказан</li>

					<li class="order-ls__info-title">Адрес доставки</li>
					<li class="order-ls__info-txt" v-if='order.address'>{{order.address}}</li>
					<li class="order-ls__info-txt" v-if='!order.address'>неуказан</li>

					<li class="order-ls__info-title">Имя получателя</li>
					<li class="order-ls__info-txt" v-if='order.name'>{{order.name}}</li>
					<li class="order-ls__info-txt" v-if='!order.name'>неуказан</li>

					<li class="order-ls__info-title">Эл.почта</li>
					<li class="order-ls__info-txt" v-if='order.email'>{{order.email}}</li>
					<li class="order-ls__info-txt" v-if='!order.email'>неуказан</li>

					<li class="order-ls__info-title">Пожелания по доставке</li>
					<li class="order-ls__info-txt" v-if='order.remark'>{{order.remark}}</li>
					<li class="order-ls__info-txt" v-if='!order.remark'>неуказаны</li>

					<li class="order-ls__info-title">ЕГАИС</li>
					<li class="order-ls__info-txt" v-if='order.latch_number'>{{order.latch_number}}</li>
					<li class="order-ls__info-txt" v-if='!order.latch_number'>в обработке</li>

					<li class="order-ls__info-title">ID Торговой точки</li>
					<li class="order-ls__info-txt">{{order.shop.official.alkoid}}</li>
				</ul>
			</div>

			<div class="tabs__content order-ls__info">
				<ul class="order-ls__info-list">
					<li class="order-ls__info-title">Название компании</li>
					<li class="order-ls__info-txt">
						<span class="order-ls__info-logo--name">Азбука Вкуса</span>
						<div class="order-ls__info-logo">
							<img src="pic/icon/name-logo.png" alt="logo">
						</div>
					</li>

					<li class="order-ls__info-title">Телефон получателя</li>
					<li class="order-ls__info-txt">+7 (497) 468-89-78</li>

					<li class="order-ls__info-title">Адрес доставки</li>
					<li class="order-ls__info-txt">г. Москва, ул. Силикатная, владение 55-B</li>

					<li class="order-ls__info-title">Имя получателя</li>
					<li class="order-ls__info-txt">Иванович Сергей Михайлович</li>

					<li class="order-ls__info-title">Эл.почта</li>
					<li class="order-ls__info-txt">product@azbuka.com</li>

					<li class="order-ls__info-title">Пожелания по доставке</li>
					<li class="order-ls__info-txt">Доставить на третий склад</li>

					<li class="order-ls__info-title">ЕГАИС</li>
					<li class="order-ls__info-txt">154FTE-789-86</li>

					<li class="order-ls__info-title">ID Торговой точки</li>
					<li class="order-ls__info-txt">154HFR-56-89-648</li>
				</ul>
			</div>

			<div class="tabs__content">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequatur dolorum eaque fugit repellendus. Accusamus animi
					culpa dolorem, ducimus ea eius error fugiat in minus molestiae nihil possimus quam quidem quis repellat, repellendus tempore
					vitae? Accusamus adipisci eius molestiae! Ad alias at beatae culpa incidunt ipsam, maiores maxime omnis ullam!</p>
			</div>

			<div class="tabs__content order-ls__docs">
				<div class="order-ls__docs-table">
					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<a href="" class="order-ls__docs-name">ТОРГ-12</a>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xlink:href="#ok"></use></svg>
								<span>Загружено</span>
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<a href="#" class="order-ls__docs-name">ТТН</a>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							 <span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span>Запрос</span>
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<a href="#" class="order-ls__docs-name">Cчет-фактура</a>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xlink:href="#ok"></use></svg>
								<span>Загружено</span>
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<a href="#" class="order-ls__docs-name">Справки ТТН</a>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span>Запрос</span>
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<a href="#" class="order-ls__docs-name">Сертификаты и удостоверения качества</a>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span>Запрос</span>
							</span>
						</div>
					</div>
				</div>
				<div class="order-ls__docs-btn">
					<a href="#" class="btn btn--pickup">Заказать документы</a>
				</div>
			</div>
			<!--/tabs content-->
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			order() {
				return this.$store.getters.order
			},
		},
		mounted: function() {
			tabs();
		}
	}

	function tabs() {
		if($('.tabs').length) {
			$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
				 console.log($(this));
				$(this)
					.addClass('active').siblings().removeClass('active')
					.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
			});
		}
	}

</script>