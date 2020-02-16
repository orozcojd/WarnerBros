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
          type="checkbox"
          :value="d.id"
          v-on="inputListeners"
          v-model="selectedData"
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
            if (event.target.checked) vm.selectedData.push(event.target.value)
            else {
              vm.selectedData.splice(vm.selectedData.indexOf(event.target.value), 1)
            }
            vm.$emit('input', vm.selectedData)
          }
        }
      )
    }
  },
  data () {
    return {
      selectedData: []
    }
  },
  methods: {
    reset () {
      this.selectedData = []
    }
  }
}
</script>
