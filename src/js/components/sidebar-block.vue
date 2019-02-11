<template>
  <div>
    <div class="block">
      <h4>ТЕГИ</h4>
      <p>90-е Break a leg jam 2 Break a leg jam 3 Castle of no Escape Castle of no Escape 2 DOS Electric Highways Game Maker gamedev Ludum Dare NES RPG RPG Maker RPG Maker VX Ace Steam АндерГамин аудио байки из жизни бродилка Гамин Геймдев геймдизайн генерация графика Гринлайт девлог Денди джем звуколенник игра игра изнутри игрострой игры инди история итоги конкурс концепт Котострим лог Мегамен музыка На Коленке Наколенник Наколенник №02 Наколенник №03 наши в Стиме Не Паззл обзор перевод пиксель-арт подборка постмортем предложения программирование разработка релиз ретро рисунки Сега серая папка сеттинг социум старое творчество Стим тег-ради-тега текст треклист чашечка геймдева юмор</p>
    </div>

    <div v-if="version">Текущая версия {{ version }}</div>
  </div>
</template>

<style scoped>
h4 {
  text-align: right;
}

.block {
  color: #fff;
  padding: 20px;
  border-radius: 3px;
  background: #7db9e8;
  background: -moz-linear-gradient(45deg, #7db9e8 0%, #1e5799 100%);
  background: -webkit-linear-gradient(45deg, #7db9e8 0%, #1e5799 100%);
  background: linear-gradient(45deg, #7db9e8 0%, #1e5799 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7db9e8', endColorstr='#1e5799',GradientType=1 );
}
</style>

<script>
export default {
	props: {
		version: String
	}
}
</script>
