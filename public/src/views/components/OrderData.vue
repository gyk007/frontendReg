<template>
	<section class="order-ls__tabs tabs">
			<ul class="tabs__caption">

				<li class="order_inf active"
					@click="tab('.order_inf')">Информация о заказе</li>

				<li class='compani_inf'
					@click="tab('.compani_inf')">Ваши данные</li>

				<li class='sales_inf'
					@click="tab('.sales_inf')"
					v-if='order && (order.sales_name || order.dedivver_name || order.dedivver_date)' >Доставка</li>

				<li class='docs_inf'
					@click="tab('.docs_inf')"
					v-if='documents && documents.length'>Документы</li>

			</ul>
			<!--tabs content-->
			<div class="tabs__content order-ls__info active order_inf">
				<div class="order-ls__info-divst">

					<div class='order_div_block' v-if='order.shop.net.official.name'>
						<div class="order-ls__info-title order_div_title">Название компании</div>
						<div class="order-ls__info-txt   order_div_txt">
							<span class="order-ls__info-logo--name">{{order.shop.net.official.name}}</span>
						</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.phone'>
						<div class="order-ls__info-title order_div_title">Телефон получателя</div>
						<div class="order-ls__info-txt order_div_txt">{{order.phone}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.address'>
						<div class="order-ls__info-title order_div_title">Адрес доставки</div>
						<div class="order-ls__info-txt order_div_txt">{{order.address}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.name'>
						<div class="order-ls__info-title order_div_title">Имя получателя</div>
						<div class="order-ls__info-txt order_div_txt">{{order.name}}</div>

						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.email'>
						<div class="order-ls__info-title order_div_title">Эл.почта</div>
						<div class="order-ls__info-txt order_div_txt">{{order.email}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.remark'>
						<div class="order-ls__info-title order_div_title">Пожелания по доставке</div>
						<div class="order-ls__info-txt order_div_txt">{{order.remark}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.latch_number'>
						<div class="order-ls__info-title order_div_title">ЕГАИС</div>
						<div class="order-ls__info-txt order_div_txt">{{order.latch_number}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.ttn_number'>
						<div class="order-ls__info-title order_div_title">№ ТТН</div>
						<div class="order-ls__info-txt order_div_txt">{{order.ttn_number}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.ttn_date'>
						<div class="order-ls__info-title order_div_title">Дата ТТН</div>
						<div class="order-ls__info-txt order_div_txt">{{order.ttn_date.format('L')}}</div>
						<div class="clear"></div>
					</div>

				</div>
			</div>

			<div class="tabs__content order-ls__info compani_inf">
				<div class="order-ls__info-divst">

					<div class='order_div_block' v-if='order.shop.net.official.name'>
						<div class="order-ls__info-title order_div_title">Название компании</div>
						<div class="order-ls__info-txt order_div_txt">
							<span class="order-ls__info-logo--name">{{order.shop.net.official.name}}</span>
							<!-- <div class="order-ls__info-logo">
								<img src="pic/icon/name-logo.png" alt="logo">
							</div> -->
						</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block'  v-if='order.shop.official.name'>
						<div class="order-ls__info-title order_div_title">Торговая точка</div>
						<div class="order-ls__info-txt order_div_txt">{{order.shop.official.name}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.shop.net.official.phone'>
						<div class="order-ls__info-title order_div_title">Телефон</div>
						<div class="order-ls__info-txt order_div_txt">{{order.shop.net.official.phone}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.shop.net.official.regaddress'>
						<div class="order-ls__info-title order_div_title">Юридический адрес</div>
						<div class="order-ls__info-txt order_div_txt">{{order.shop.net.official.regaddress}}</div>
						<div class="clear"></div>
					</div>

					<div class='order_div_block' v-if='order.shop.net.official.email'>
						<div class="order-ls__info-title order_div_title">Эл.почта</div>
						<div class="order-ls__info-txt order_div_txt">{{order.shop.net.official.email}}</div>
						<div class="clear"></div>
					</div>

				</div>
			</div>

			<div class="tabs__content sales_inf">
				<div class="order-ls__info-divst">

				<div class='order_div_block' v-if='order.sales_name'>
					<div class="order-ls__info-title order_div_title">Торговый представитель</div>
					<div class="order-ls__info-txt order_div_txt">{{order.sales_name}}</div>
					<div class="clear"></div>
				</div>

				<div class='order_div_block' v-if='order.sales_phone'>
					<div class="order-ls__info-title order_div_title">Телефон представителя</div>
					<div class="order-ls__info-txt order_div_txt">{{order.sales_phone}}</div>
					<div class="clear"></div>
				</div>

				<div class='order_div_block' v-if='order.deliver_name'>
					<div class="order-ls__info-title order_div_title">Имя водителя</div>
					<div class="order-ls__info-txt   order_div_txt">{{order.deliver_name}}</div>
					<div class="clear"></div>
				</div>

				<div class='order_div_block' v-if='order.deliver_phone'>
					<div class="order-ls__info-title order_div_title">Телефон водителя</div>
					<div class="order-ls__info-txt   order_div_txt">{{order.deliver_phone}}</div>
					<div class="clear"></div>
				</div>

				<div class='order_div_block' v-if='order.deliver_date'>
					<div class="order-ls__info-title order_div_title" >Дата доставки</div>
					<div class="order-ls__info-txt   order_div_txt">{{order.deliver_date.format('L')}}</div>
					<div class="clear"></div>
				</div>

				<div class='order_div_block' v-if='order.deliver_interval'>
					<div class="order-ls__info-title order_div_title">Период доставки</div>
					<div class="order-ls__info-txt   order_div_txt">{{order.deliver_interval}}</div>
					<div class="clear"></div>
				</div>

				</div>
			</div>

			<div class="tabs__content order-ls__docs docs_inf" v-if="docTorg12 && docTorg12.status == 'uploaded'">
				<div class="order-ls__docs-table">

					<div class="order-ls__docs-row js-t-row">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docTorg12 &&  docTorg12.status == 'uploaded'" class="order-ls__docs-name">
									<a style='text-decoration: underdivne' :href='fileUrl + docTorg12.file_name' target="_blank">ТОРГ-12</a>
								</p>
								<p v-else class="order-ls__docs-name">ТОРГ-12</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xdivnk:href="#ok"></use></svg>
								<span v-if='docTorg12'>
									<span v-if="docTorg12.status == 'requested'">Запрос</span>
									<span v-if="docTorg12.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docTorg12'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<!-- <span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('ТОРГ-12')" v-if="docTorg12 && docTorg12.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docTorg12 && docTorg12.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('ТОРГ-12')" v-if="!docTorg12">
							</span>		 -->
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row" v-if="docTtn && docTtn.status == 'uploaded'">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docTtn &&  docTtn.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underdivne' :href='fileUrl + docTtn.file_name' target="_blank">ТТН</a>
								</p>
								<p v-else class="order-ls__docs-name">ТТН</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							 <span class="a-order__dl">
								<svg class="a-order__dl-info"><use xdivnk:href="#info"></use></svg>
								<span v-if='docTtn'>
									<span v-if="docTtn.status == 'requested'">Запрос</span>
									<span v-if="docTtn.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docTtn'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<!-- <span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('ТТН')" v-if="docTtn && docTtn.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docTtn && docTtn.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('ТТН')" v-if="!docTtn">
							</span> -->
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row" v-if="docCount && docCount.status == 'uploaded'">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docCount &&  docCount.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underdivne' :href='fileUrl + docCount.file_name' target="_blank">Cчет-фактура</a>
								</p>
								<p v-else class="order-ls__docs-name">Cчет-фактура</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-ok"><use xdivnk:href="#ok"></use></svg>
								<span v-if='docCount'>
									<span v-if="docCount.status == 'requested'">Запрос</span>
									<span v-if="docCount.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docCount'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<!-- <span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Cчет-фактура')" v-if="docCount && docCount.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docCount && docCount.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Cчет-фактура')" v-if="!docCount">

							</span> -->
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row" v-if="docSttn && docSttn.status == 'uploaded'">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docSttn &&  docSttn.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underdivne' :href='fileUrl + docSttn.file_name' target="_blank">Приложения ТТН</a>
								</p>
								<p v-else class="order-ls__docs-name">Приложения ТТН</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xdivnk:href="#info"></use></svg>
								<span v-if='docSttn'>
									<span v-if="docSttn.status == 'requested'">Запрос</span>
									<span v-if="docSttn.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docSttn'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
						<!-- 	<span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Приложения ТТН')"      v-if="docSttn && docSttn.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docSttn && docSttn.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Приложения ТТН')"  v-if="!docSttn">
							</span> -->
						</div>
					</div>

					<div class="order-ls__docs-row js-t-row" v-if="docCer && docCer.status == 'uploaded'">
						<div class="order-ls__docs-cell">
							<div class="order-ls__docs-name--holder">
								<span class="status status--pdf">PDF</span>
								<p v-if="docCer &&  docCer.status == 'uploaded'" class="order-ls__docs-name">
									<a  style='text-decoration: underdivne' :href='fileUrl + docCer.file_name' target="_blank">Справки, сертификаты и удостоверения качества</a>
								</p>
								<p v-else class="order-ls__docs-name">Справки, сертификаты и удостоверения качества</p>
							</div>
						</div>
						<div class="order-ls__docs-cell">
							<span class="a-order__dl">
								<svg class="a-order__dl-info"><use xdivnk:href="#info"></use></svg>
								<span v-if='docCer'>
									<span v-if="docCer.status == 'requested'">Запрос</span>
									<span v-if="docCer.status == 'uploaded'">Загружен</span>
								</span>
								<span v-if='!docCer'></span>
							</span>
						</div>
						<div class="order-ls__docs-cell">
							<!-- <span class="a-order__dl">
								<input type="checkbox" class="checkbox" @click="addDocument('Справки, сертификаты и удостоверения качества')" v-if="docCer && docCer.status == 'requested'" checked>
								<input type="checkbox" class="checkbox" v-if="docCer && docCer.status == 'uploaded'" checked disabled>
								<input type="checkbox" class="checkbox" @click="addDocument('Справки, сертификаты и удостоверения качества')" v-if="!docCer">
							</span> -->
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
			documents() {
				return this.$store.getters.documents
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
					if(key.name == 'Приложения ТТН')
						docSttn = key;
				});
				return docSttn;
			},
			docCer () {
				let docCer = null;
				this.$store.getters.documents.forEach(key => {
					if(key.name == 'Справки, сертификаты и удостоверения качества')
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
