<template>
  <span>{{ toThousands(tweeningValue) }}</span>
</template>

<script>
import TWEEN from 'tween.js'
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    toThousands (num) {
      var result = ''
      var counter = 0
      num = (num || 0).toString()
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result = num.charAt(i) + result
        if (!(counter % 3) && i !== 0) {
          result = ',' + result
        }
      }
      return result
    },
    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function (percent) {
          vm.tweeningValue = (percent * vm.value).toFixed(0)
        })
        .start()
      animate()
    }
  }
}
</script>
