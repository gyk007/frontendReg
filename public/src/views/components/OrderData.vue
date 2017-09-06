<template>
	<section class="order-ls__tabs tabs">
			<ul class="tabs__caption">
				<li class="order_inf active" @click="tab('.order_inf')">Информация о заказе</li>
				<li class='compani_inf'      @click="tab('.compani_inf')">Ваши данные</li>
				<li class='sales_inf'        @click="tab('.sales_inf')">Доставка</li>
				<li class='docs_inf'         @click="tab('.docs_inf')">Документы</li>
			</ul>
			<!--tabs content-->
			<div class="tabs__content order-ls__info active order_inf">
				<ul class="order-ls__info-list">
					<li class="order-ls__info-title">Название компании</li>
					<li class="order-ls__info-txt">
						<span class="order-ls__info-logo--name">{{order.shop.net.official.name}}</span>

					</li>

					<li class="order-ls__info-title">Телефон получателя</li>
					<li class="order-ls__info-txt" v-if='order.phone'>{{order.phone}}</li>
					<li class="order-ls__info-txt" v-if='!order.phone'>неуказан</li>

					<li class="order-ls__info-title">Адрес доставки</li>
					<li class="order-ls__info-txt" v-if='order.address'>{{order.address}}</li>
					<li class="order-ls__info-txt" v-if='!order.address'>неуказан</li>

					<li class="order-ls__info-title">Имя получателя</li>
					<li class="order-ls__info-txt" v-if='order.name'>{{order.name}}</li>
					<li class="order-ls__info-txt" v-if='!order.name'>не указан</li>

					<li class="order-ls__info-title">Эл.почта</li>
					<li class="order-ls__info-txt" v-if='order.email'>{{order.email}}</li>
					<li class="order-ls__info-txt" v-if='!order.email'>неуказан</li>

					<li class="order-ls__info-title">Пожелания по доставке</li>
					<li class="order-ls__info-txt" v-if='order.remark'>{{order.remark}}</li>
					<li class="order-ls__info-txt" v-if='!order.remark'>не указаны</li>

					<li class="order-ls__info-title">ЕГАИС</li>
					<li class="order-ls__info-txt" v-if='order.latch_number'>{{order.latch_number}}</li>
					<li class="order-ls__info-txt" v-if='!order.latch_number'>в обработке</li>

					<li class="order-ls__info-title">№ ТТН</li>
					<li class="order-ls__info-txt" v-if='order.ttn_number'>{{order.ttn_number}}</li>
					<li class="order-ls__info-txt" v-if='!order.ttn_number'>в обработке</li>

					<li class="order-ls__info-title">Дата ТТН</li>
					<li class="order-ls__info-txt" v-if='order.ttn_date'>{{order.ttn_date.toLocaleDateString("ru-RU")}}</li>
					<li class="order-ls__info-txt" v-if='!order.ttn_date'>в обработке</li>
				</ul>
			</div>

			<div class="tabs__content order-ls__info compani_inf">
				<ul class="order-ls__info-list">
					<li class="order-ls__info-title">Название компании</li>
					<li class="order-ls__info-txt">
						<span class="order-ls__info-logo--name">{{order.shop.net.official.name}}</span>
						<!-- <div class="order-ls__info-logo">
							<img src="pic/icon/name-logo.png" alt="logo">
						</div> -->
					</li>

					<li class="order-ls__info-title">Торговая точка</li>
					<li class="order-ls__info-txt">{{order.shop.official.name}}</li>

					<li class="order-ls__info-title">Телефон</li>
					<li class="order-ls__info-txt" v-if='order.shop.official.phone'>{{order.shop.net.official.phone}}</li>
					<li class="order-ls__info-txt" v-if='!order.shop.official.phone'>неуказан</li>

					<li class="order-ls__info-title">Юредический адрес</li>
					<li class="order-ls__info-txt" v-if='order.shop.official.regaddress'>{{order.shop.net.official.regaddress}}</li>
					<li class="order-ls__info-txt" v-if='!order.shop.official.regaddress'>неуказан</li>

					<li class="order-ls__info-title">Эл.почта</li>
					<li class="order-ls__info-txt" v-if='order.shop.official.email'>{{order.shop.net.official.email}}</li>
					<li class="order-ls__info-txt" v-if='!order.shop.official.email'>не указан</li>

				</ul>
			</div>

			<div class="tabs__content sales_inf">
				<ul class="order-ls__info-list">
					<li class="order-ls__info-title">Торговый представитель</li>
					<li class="order-ls__info-txt" v-if='order.sales_name'>{{order.sales_name}}</li>
					<li class="order-ls__info-txt" v-if='!order.sales_name'>в обработке</li>

					<li class="order-ls__info-title">Телефон представителя</li>
					<li class="order-ls__info-txt" v-if='order.sales_phone'>{{order.sales_name}}</li>
					<li class="order-ls__info-txt" v-if='!order.sales_phone'>в обработке</li>

					<li class="order-ls__info-title">Имя водителя</li>
					<li class="order-ls__info-txt" v-if='order.deliver_name'>{{order.deliver_name}}</li>
					<li class="order-ls__info-txt" v-if='!order.deliver_name'>в обработке</li>

					<li class="order-ls__info-title">Телефон водителя</li>
					<li class="order-ls__info-txt" v-if='order.deliver_phone'>{{order.deliver_phone}}</li>
					<li class="order-ls__info-txt" v-if='!order.deliver_phone'>в обработке</li>

					<li class="order-ls__info-title">Дата доставки</li>
					<li class="order-ls__info-txt" v-if='order.deliver_date'>{{order.deliver_date.toLocaleDateString("ru-RU")}}</li>
					<li class="order-ls__info-txt" v-if='!order.deliver_date'>в обработке</li>

					<li class="order-ls__info-title">Период доставки</li>
					<li class="order-ls__info-txt" v-if='order.deliver_interval'>{{order.deliver_interval}}</li>
					<li class="order-ls__info-txt" v-if='!order.deliver_interval'>в обработке</li>

				</ul>
			</div>

			<div class="tabs__content order-ls__docs docs_inf">
				<div class="order-ls__docs-table">
					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docTorg12 &&  docTorg12.status == 'uploaded'" class="order-ls__docs-name">
									<a style='text-decoration: underline' :href='fileUrl + docTorg12.file_name' target="_blank">ТОРГ-12</a>
								</p>
								<p v-else class="order-ls__docs-name">ТОРГ-12</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xlink:href="#ok"></use></svg>
								<span v-if='docTorg12'>
									<span v-if="docTorg12.status == 'requested'">Запрос</span>
									<span v-if="docTorg12.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docTorg12'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('ТОРГ-12')" v-if="docTorg12 && docTorg12.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docTorg12 && docTorg12.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('ТОРГ-12')" v-if="!docTorg12">
							</span>
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docTtn &&  docTtn.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underline' :href='fileUrl + docTtn.file_name' target="_blank">ТТН</a>
								</p>
								<p v-else class="order-ls__docs-name">ТТН</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							 <span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span v-if='docTtn'>
									<span v-if="docTtn.status == 'requested'">Запрос</span>
									<span v-if="docTtn.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docTtn'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('ТТН')" v-if="docTtn && docTtn.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docTtn && docTtn.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('ТТН')" v-if="!docTtn">
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docCount &&  docCount.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underline' :href='fileUrl + docCount.file_name' target="_blank">Cчет-фактура</a>
								</p>
								<p v-else class="order-ls__docs-name">Cчет-фактура</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xlink:href="#ok"></use></svg>
								<span v-if='docCount'>
									<span v-if="docCount.status == 'requested'">Запрос</span>
									<span v-if="docCount.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docCount'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Cчет-фактура')" v-if="docCount && docCount.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docCount && docCount.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Cчет-фактура')" v-if="!docCount">

							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docSttn &&  docSttn.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underline' :href='fileUrl + docSttn.file_name' target="_blank">Справки ТТН</a>
								</p>
								<p v-else class="order-ls__docs-name">Справки ТТН</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span v-if='docSttn'>
									<span v-if="docSttn.status == 'requested'">Запрос</span>
									<span v-if="docSttn.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docSttn'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Справки ТТН')"      v-if="docSttn && docSttn.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docSttn && docSttn.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Справки ТТН')"  v-if="!docSttn">
							</span>
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docCer &&  docCer.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underline' :href='fileUrl + docCer.file_name' target="_blank">Сертификаты и удостоверения качества</a>
								</p>
								<p v-else class="order-ls__docs-name">Сертификаты и удостоверения качества</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xlink:href="#info"></use></svg>
								<span v-if='docCer'>
									<span v-if="docCer.status == 'requested'">Запрос</span>
									<span v-if="docCer.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docCer'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Сертификаты и удостоверения качества')" v-if="docCer && docCer.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docCer && docCer.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Сертификаты и удостоверения качества')" v-if="!docCer">
							</span>
						</div>
					</div>
				</div>
			</div>
			<!--/tabs content-->
	</section>
</template>

<script>
	import store  from '../../store/catalog.js'
	import $      from 'jquery'
	import conf   from '../../conf/conf.js'

	export default {
		data() {
			return {
				fileUrl : conf.url.file,
			}
		},
		computed: {
			order() {
				return this.$store.getters.order
			},
			docTtn () {
				let docTtn = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'ТТН')
						docTtn = key;
				});
				return docTtn;
			},
			docTorg12 () {
				let docTorg12 = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'ТОРГ-12')
						docTorg12 = key;
				});
				return docTorg12;
			},
			docCount () {
				let docCount = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'Cчет-фактура')
						docCount = key;
				});
				return docCount;
			},
			docSttn () {
				let docSttn = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'Справки ТТН')
						docSttn = key;
				});
				return docSttn;
			},
			docCer () {
				let docCer = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'Сертификаты и удостоверения качества')
						docCer = key;
				});
				return docCer;
			}

		},
		methods: {
			tab(name) {
				['.order_inf', '.compani_inf', '.sales_inf', '.docs_inf'].forEach(key => {
					$(key).removeClass('active');
				})

				$(name).addClass('active');
			},
			addDocument(name) {
				if ($(event.target).is(':checked'))
					this.$store.dispatch('addDocument', name)
				else
					this.$store.dispatch('deleteDocument', name)
			},

		},
	}

</script>
