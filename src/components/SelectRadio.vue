<template>
  <base-select
    :disabled="disabled"
  >
    <template v-slot:drop-down>
      <li
        v-for="d in data"
        :key="d.id"
      >
        <input
          :disabled="disabled"
          type="radio"
          :value="d.id"
          v-model="selectedData"
          v-on="inputListeners"
        > {{ d.name || d.value }}
      </li>
    </template>
    <template v-slot:btn-name>
      <slot />
    </template>
  </base-select>
</template>

<script>
import SelectMixin from '@/mixins/SelectMixin'
export default {
  name: 'CheckBox',
  mixins: [SelectMixin],

  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  data () {
    return {
      selectedData: null
    }
  },
  methods: {
    reset () {
      this.selectedData = null
    }
  }
}
</script>
<style scoped>
  .select__dropdown {
    position: absolute;
    border: 1px solid #E7F1E9;
    width: 200px;
    height: 200px;
    overflow: scroll;
    z-index: 10;
    background: rgba(255,255,255, 0.9);
    font-weight: bold;
  }
</style>
