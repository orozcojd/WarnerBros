<template>
  <button
    @click="onClick"
    :style="btnSize"
    :class="{selected: selected}"
  >
    {{ name.toUpperCase() }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    name: {
      type: String,
      default: 'search'
    },
    onClick: {
      type: Function,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'sm',
      validator: function (value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    btnSize () {
      let pad = {
        x: '2em',
        y: '.5em'
      }
      switch (this.size) {
        case 'md':
          pad.x = '2.5em'
          pad.y = '1em'
          break
        case 'lg':
          pad.x = '3em'
          pad.y = '1.5em'
          break
        default:
          break
      }
      return {
        padding: `${pad.y} ${pad.x} ${pad.y} ${pad.x}`
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  button {
    background: inherit;
    outline: inherit;
    cursor: pointer;
    font-weight: bold;
  }
  button:hover {
    background: #E7F1E9;
  }
  .selected {
    background: #859D8A;
    color: white;
  }
</style>
