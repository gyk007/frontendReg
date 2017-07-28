<template>
<section class="aa-order">
	<div id="aa-order-layer">
		<div class="aa-order__filter-cross">X</div>
	</div>
	<div class="a-catalog__hdr">
		<div class="a-catalog__hdr-title">Все заказы</div>
		<Search></Search>
		<div class="aa-order__f-btn js-filter-trigger">
			<span>Фильтр</span>
			<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter"></use></svg>
		</div>
	</div>

	<div class="aa-order__container">
		<div class="aa-order__filter">
			<form action="#" name="admin-all-orders-filter">

				<div class="aa-order__filter-item">
					<div class="aa-order__filter-hdr">Статус</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Новый</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Принят в обработку</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Подтвержден</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>В работе</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Приостановлен</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Отменен</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Собран</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Доставляется</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Доставлен</span>
						</label>
					</div>
					<div class="aa-order__filter-chb">
						<label>
							<input type="checkbox" class="checkbox">
							<span>Оплачен</span>
						</label>
					</div>
				</div>

				<div class="aa-order__filter-item">
					<div class="aa-order__filter-hdr">Клиент</div>

					<a href="#" class="aa-order__filter-client">
						<span>Азбука Вкуса</span>
						<svg>
							<use xlink:href="#remove"></use>
						</svg>
					</a>
					<a href="#" class="aa-order__filter-client">
						<span>Винодельня</span>
						<svg>
							<use xlink:href="#remove"></use>
						</svg>
					</a>
					<a href="#" class="aa-order__filter-client">
						<span>Дом Вкуса</span>
						<svg>
							<use xlink:href="#remove"></use>
						</svg>
					</a>

					<select name="select" class="select" data-placeholder="Выбрать компанию">
						<option></option>
						<option value="0">option 1</option>
						<option value="1">option 2</option>
						<option value="2">option 3</option>
						<option value="3">option 4</option>
						<option value="4">option 5</option>
					</select>
				</div>

				<div class="aa-order__filter-item">
					<div class="aa-order__filter-hdr">Дата</div>

					<div class="aa-order__filter-dp js-datepicker-init">
						<div class="datepicker-item">
							<div class="datepicker-item-txt">от</div>
							<input type="text" id="datepicker-from">
						</div>
						<div class="datepicker-item">
							<div class="datepicker-item-txt">до</div>
							<input type="text" id="datepicker-to">
						</div>
					</div>

					<div class="aa-order__filter-submit">
						<button type="submit" class="btn">Применить</button>
					</div>

				</div>

			</form>
		</div>
		<div class="aa-order__result">
			<div class="aa-order__result-inner">

				<div class="order__table">
					<div class="order__row order__row-hdr">
						<div class="order__cell order__number"><span class="order__row-hdr--title">Номер заказа</span></div>
						<div class="order__cell order__invoice">
							<span class="order__row-hdr--title js-invoice-title">Клиент</span>
						</div>


						<div class="order__cell order__e"><span class="order__row-hdr--title js-e-title">ЕГАИС</span></div>
						<div class="order__cell order__cost"><span class="order__row-hdr--title">Стоимость</span></div>
						<div class="order__cell order__status"><span class="order__row-hdr--title">Статус</span></div>
					</div>


<div class="order__row js-t-row">
	<div class="order__cell order__number">
		<div class="js-status-clone"></div>
		<sapn class="order__num">
			<a href="#">#458TFE-897-89</a>
			<div class="js-cost-clone"></div>
		</sapn>
		<span  class="order__date">14 июня, 2017</span>
		<div class="order__invoice-mob">
			<div class="order__invoice-mob--item js-e-clone">
				<div class="js-e-title-clone"></div>
			</div>
			<div class="order__invoice-mob--item js-invoice-clone">
				<div class="js-invoice-title-clone"></div>
			</div>
		</div>

	</div>
	<div class="order__cell order__invoice"><span class="order__title js-invoice"><div class='aa-order__client'><div class='aa-order__client-img'><img src='pic/icon/name-logo.png' alt='logo'></div><span>Азбука Вкуса</span></div></span></div>

	<div class="order__cell order__e"><span class="order__title js-e">AMT-467-86-210</span></div>
	<div class="order__cell order__cost"><span class="js-cost">740 000 <i class="rub">a</i></span></div>
	<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
</div>

<div class="order__row js-t-row">
	<div class="order__cell order__number">
		<div class="js-status-clone"></div>
		<sapn class="order__num">
			<a href="#">#468SFO-462-63</a>
			<div class="js-cost-clone"></div>
		</sapn>
		<span  class="order__date">14 июня, 2017</span>
		<div class="order__invoice-mob">
			<div class="order__invoice-mob--item js-e-clone">
				<div class="js-e-title-clone"></div>
			</div>
			<div class="order__invoice-mob--item js-invoice-clone">
				<div class="js-invoice-title-clone"></div>
			</div>
		</div>

	</div>
	<div class="order__cell order__invoice"><span class="order__title js-invoice"><div class='aa-order__client'><div class='aa-order__client-img'><img src='pic/icon/name-logo.png' alt='logo'></div><span>Калибр</span></div></span></div>

	<div class="order__cell order__e"><span class="order__title js-e">AMT-467-86-210</span></div>
	<div class="order__cell order__cost"><span class="js-cost">120 740 000 <i class="rub">a</i></span></div>
	<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
</div>

<div class="order__row js-t-row">
	<div class="order__cell order__number">
		<div class="js-status-clone"></div>
		<sapn class="order__num">
			<a href="#">#597ASW-530-05</a>
			<div class="js-cost-clone"></div>
		</sapn>
		<span  class="order__date">14 июня, 2017</span>
		<div class="order__invoice-mob">
			<div class="order__invoice-mob--item js-e-clone">
				<div class="js-e-title-clone"></div>
			</div>
			<div class="order__invoice-mob--item js-invoice-clone">
				<div class="js-invoice-title-clone"></div>
			</div>
		</div>

	</div>
	<div class="order__cell order__invoice"><span class="order__title js-invoice"><div class='aa-order__client'><div class='aa-order__client-img'><img src='pic/icon/name-logo.png' alt='logo'></div><span>Довелия</span></div></span></div>

	<div class="order__cell order__e"><span class="order__title js-e">-</span></div>
	<div class="order__cell order__cost"><span class="js-cost">1 540 000 <i class="rub">a</i></span></div>
	<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
</div>

<div class="order__row js-t-row">
	<div class="order__cell order__number">
		<div class="js-status-clone"></div>
		<sapn class="order__num">
			<a href="#">#468SFO-462-63</a>
			<div class="js-cost-clone"></div>
		</sapn>
		<span  class="order__date">14 июня, 2017</span>
		<div class="order__invoice-mob">
			<div class="order__invoice-mob--item js-e-clone">
				<div class="js-e-title-clone"></div>
			</div>
			<div class="order__invoice-mob--item js-invoice-clone">
				<div class="js-invoice-title-clone"></div>
			</div>
		</div>

	</div>
	<div class="order__cell order__invoice"><span class="order__title js-invoice"><div class='aa-order__client'><div class='aa-order__client-img'><img src='pic/icon/name-logo.png' alt='logo'></div><span>Азбука Вкуса</span></div></span></div>

	<div class="order__cell order__e"><span class="order__title js-e">AMT-467-86-210</span></div>
	<div class="order__cell order__cost"><span class="js-cost">7 740 000 <i class="rub">a</i></span></div>
	<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
</div>

<div class="order__row js-t-row">
	<div class="order__cell order__number">
		<div class="js-status-clone"></div>
		<sapn class="order__num">
			<a href="#">#458TFE-897-89</a>
			<div class="js-cost-clone"></div>
		</sapn>
		<span  class="order__date">14 июня, 2017</span>
		<div class="order__invoice-mob">
			<div class="order__invoice-mob--item js-e-clone">
				<div class="js-e-title-clone"></div>
			</div>
			<div class="order__invoice-mob--item js-invoice-clone">
				<div class="js-invoice-title-clone"></div>
			</div>
		</div>

	</div>
	<div class="order__cell order__invoice"><span class="order__title js-invoice"><div class='aa-order__client'><div class='aa-order__client-img'><img src='pic/icon/name-logo.png' alt='logo'></div><span>Азбука Вкуса</span></div></span></div>

	<div class="order__cell order__e"><span class="order__title js-e">AMT-467-86-210</span></div>
	<div class="order__cell order__cost"><span class="js-cost">320 000 <i class="rub">a</i></span></div>
	<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
</div>

				</div>

			</div>
		</div>
	</div>
</section>
</template>


<script>

import Search        from './components/Search.vue'
import store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'users',
	components: {Search},
	store: store,
	computed: {
		client() {
			return this.$store.getters.client
		},
	},
	methods: {
		unselectClient(){
			this.$store.dispatch('selectClient', null)
		}
	},
	created: function() {
		this.$store.dispatch('selectClient', null)
	}
}

</script>