<template>
  <div class="editor-menu">
    <div class="columns">
      <div class="column col-auto editor-menu-column">
        <small class="text-gray button-group-caption">Текст</small>
        <br />

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.bold }"
          data-tooltip="Жирный"
          @click="call('bold')"
        >
          <span class="icon-bold"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.italic }"
          data-tooltip="Наклонный"
          @click="call('italic')"
        >
          <span class="icon-italic"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.strike }"
          data-tooltip="Зачеркнутый"
          @click="call('strike')"
        >
          <span class="icon-strikethrough"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.underline }"
          data-tooltip="Подчеркнутый"
          @click="call('underline')"
        >
          <span class="icon-underline"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.mono }"
          data-tooltip="Моноширный"
          @click="call('mono')"
        >
          <span class="icon-embed"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.link }"
          data-tooltip="Ссылка"
          @click="call('link')"
        >
          <span class="icon-editor-link"></span>
        </button>

        <select class="form-select heading-select" v-model="heading" @change="headingSelect">
          <option value="0">Обычный</option>
          <option value="1">Заголовок 1</option>
          <option value="2">Заголовок 2</option>
          <option value="3">Заголовок 3</option>
          <option value="4">Заголовок 4</option>
          <option value="5">Заголовок 5</option>
          <option value="6">Заголовок 6</option>
        </select>
        <span class="span"></span>
      </div>

      <div class="column col-auto editor-menu-column">
        <small class="text-gray button-group-caption">Блоки</small>
        <br />

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.paragraph }"
          data-tooltip="Параграф"
          @click="call('paragraph')"
        >
          <span class="icon-pilcrow"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.quote }"
          data-tooltip="Цитата"
          @click="call('quote')"
        >
          <span class="icon-quotes-right"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.codeblock }"
          data-tooltip="Блок кода"
          @click="call('codeblock')"
        >
          <span class="icon-embed2"></span>
        </button>

        <span class="span"></span>
      </div>
      <div class="column col-auto editor-menu-column">
        <small class="text-gray button-group-caption">Списки</small>
        <br />
        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.bulletlist }"
          data-tooltip="Список"
          @click="call('bulletlist')"
        >
          <span class="icon-list2"></span>
        </button>

        <button
          class="editor-button tooltip"
          :class="{ 'active': activeButtons.orderedlist }"
          data-tooltip="Нумерованный список"
          @click="call('orderedlist')"
        >
          <span class="icon-list-numbered"></span>
        </button>
        <span class="span"></span>
      </div>

      <div class="column col-auto editor-menu-column">
        <small class="text-gray button-group-caption">Медиа</small>
        <br />

        <div class="dropdown">
          <button class="btn btn-link dropdown-toggle text-dark" tabindex="0">
            Добавить
            <i class="icon icon-caret"></i>
          </button>

          <ul class="menu">
            <li class="menu-item">
              <a
                href="#"
                :class="{ 'active': activeButtons.image }"
                @click="call('image')"
              >Изображение</a>
            </li>

            <li class="menu-item">
              <a href="#" :class="{ 'active': activeButtons.embed }" @click="call('embed')">Embed</a>
            </li>

            <li class="menu-item">
              <a href="#" :class="{ 'active': activeButtons.table }" @click="call('table')">Таблица</a>
            </li>

            <li class="menu-item">
              <a href="#" :class="{ 'active': activeButtons.cut }" @click="call('cut')">Кат</a>
            </li>

            <li class="menu-item">
              <a
                href="#"
                :class="{ 'active': activeButtons.spoiler }"
                @click="call('spoiler')"
              >Спойлер</a>
            </li>
          </ul>
        </div>

        <span class="span"></span>
      </div>

      <div class="column col-auto editor-menu-column">
        <small class="text-gray button-group-caption"></small>
        <br />

        <button class="editor-button tooltip" data-tooltip="Помощь" @click="call('help')">?</button>
      </div>
    </div>

    <div class="columns">
      <div class="column col-auto editor-menu-column" v-if="activeButtons.table">
        <small class="text-gray button-group-caption">Таблица</small>
        <br />
        <button
          class="editor-button tooltip"
          data-tooltip="Удалить таблицу"
          @click="call('removeTable')"
        >
          <span class="icon-blocked"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Добавить колонку перед"
          @click="call('insertColumnBefore')"
        >
          <span class="icon-arrow-left2"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Добавить колонку после"
          @click="call('insertColumnAfter')"
        >
          <span class="icon-arrow-right2"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Удалить колонку"
          @click="call('removeColumn')"
        >
          <span class="icon-circle-right"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Добавить строку перед"
          @click="call('insertRowBefore')"
        >
          <span class="icon-arrow-up2"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Добавить строку после"
          @click="call('insertRowAfter')"
        >
          <span class="icon-arrow-down2"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Удалить строку"
          @click="call('removeRow')"
        >
          <span class="icon-circle-up"></span>
        </button>
        <button
          class="editor-button tooltip"
          data-tooltip="Объединить ячейки"
          @click="call('mergeCells')"
        >
          <span class="icon-insert-template"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeButtons: Object,
    activeHeading: Function
  },
  data () {
    return {
      heading: 0
    }
  },
  beforeUpdate () {
    this.checkActiveHeading()
  },
  methods: {
    call (name, value) {
      this.$emit(name, value)
    },
    headingSelect () {
      this.call("heading", { level: this.heading })
    },
    checkActiveHeading () {
      for (const level in [0, 1, 2, 3, 4, 5, 6]) {
        const isActive = this.activeHeading({ level })

        if (isActive) {
          this.heading = level
          return
        }
      }

      this.heading = 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/mixins/_shadow.scss";
@import "./node_modules/spectre.css/src/_variables.scss";
@import "./node_modules/spectre.css/src/_forms.scss";

.editor-menu {
  margin-bottom: $control-padding-y;
}

.editor-menu-column {
  padding-right: 0;
}

.editor-menu-column:not(:first-child) {
  padding-left: 0;
}

.button-group-caption {
  margin-left: $control-padding-x-sm;
}

.editor-button {
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: $control-padding-y $control-padding-x;
  margin: 0 $control-padding-x-sm / 2;
  border-radius: $border-radius * 2;

  &:hover,
  &:focus {
    background-color: $gray-color-light;
  }

  &:disabled,
  &:disabled span {
    color: $gray-color;
  }

  span {
    color: $gray-color-dark;
  }

  &.active {
    background-color: lighten($primary-color, 15%);
    color: $secondary-color-light;
  }

  &.active span {
    color: inherit;
  }
}

.span {
  padding-right: $control-padding-x-sm;
  margin-left: $control-padding-x-sm;
  border-left: 1px solid darken($gray-color-light, 5%);
}

.heading-select {
  width: auto;
  margin-top: -4px;
}
</style>
