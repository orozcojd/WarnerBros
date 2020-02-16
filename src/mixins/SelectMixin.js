import BaseSelect from '@/components/BaseSelect'

export default {
  components: {
    BaseSelect
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }

}
