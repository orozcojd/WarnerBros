<template>
  <div class="select">
    <button
      @click="showChecks = !showChecks"
      :disabled="disabled"
    >
      <span><slot/></span>
      <img
        src="@/assets/expand_more-24px.svg"
        alt="">
    </button>
    <div
      v-show="showChecks"
      class="select__dropdown"
    >
      <div class="select__dropdown__arrow"/>
      <ul>
        <li
          v-for="d in data"
          :key="d.id"
        >
          <input
            :disabled="disabled"
            type="checkbox"
            :value="d.id"
            v-on="inputListeners"
            v-model="checkedData"
          > {{ d.name || d.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    data: {
      type: Array,
      required: true
    },
    checkedData: { // prop is required for clear button to work in Home page
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            if (event.target.checked) vm.checkedData.push(event.target.value)
            else {
              vm.checkedData.splice(vm.checkedData.indexOf(event.target.value), 1)
            }
            vm.$emit('input', vm.checkedData)
          }
        }
      )
    }
  },
  data () {
    return {
      showChecks: false
      // checkedData: []
    }
  }

}
</script>

<style scoped>
  button {
    border: inherit;
    background: inherit;
    outline: inherit;
    cursor: pointer;
    padding: 1em;
    font-weight: bold;
  }
  button:hover {
    background: #E7F1E9;
  }
  button span,
  button img {
    vertical-align: middle;
  }
  .select {
    position: relative;
  }
  .select ul {
    padding-left: .5em;
  }
  .select li {
    list-style-type: none;
  }
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
