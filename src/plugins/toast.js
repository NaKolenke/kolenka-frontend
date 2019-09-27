import Vue from 'vue'
import ToastView from '@/components/ToastView.vue'

const ToastClass = Vue.extend(ToastView)

const Toast = {
  install (Vue, options = {
    timeout: 3000
  }) {
    const root = new Vue({
      render: createElement => createElement('div')
    })
    root.$mount(document.body.appendChild(document.createElement('div')))

    Vue.prototype.$toast = {
      toasts: [],

      show (msg, opts = {}) {
        if (!msg) {
          // workaround
          return
        }
        let y = this.toasts.map(i => {
          return i.$el.offsetHeight
        }).reduce((a, b) => a + b, 0)

        let instance = new ToastClass({
          propsData: {
            y: y,
            isError: opts.isError || false
          }
        })

        instance.$slots.default = [msg]
        instance.$root = root
        instance.$mount()

        root.$el.appendChild(instance.$el)
        this.toasts.push(instance)

        setTimeout(() => {
          instance.close()
        }, options.timeout)
      },
      error (msg) {
        this.show(msg, { isError: true })
      },
      hide (toast) {
        toast.$destroy()
        this.destroy(toast)
      },
      destroy (toast) {
        let index = this.toasts.indexOf(toast)
        let height = toast.$el.offsetHeight

        if (index === -1)
          return

        root.$el.removeChild(toast.$el)
        this.toasts.splice(index, 1)

        for (let i = this.toasts.length - 1; i >= index; i--) {
          this.toasts[i].y -= height
        }
      }
    }
  }
}

export default Toast
