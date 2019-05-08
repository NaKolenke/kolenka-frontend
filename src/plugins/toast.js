import Vue from 'vue'
import ToastView from '@/components/ToastView.vue'

let ToastClass = Vue.extend(ToastView)

const Toast = {
  install(Vue, options) {    
    const root = new Vue({
      render: createElement => createElement('div')
    })
    root.$mount(document.body.appendChild(document.createElement('div')))
    
    Vue.prototype.$toast = {
      toasts: [],
      
      show(msg) {
        let y = this.toasts.map(i => {
          return i.$el.offsetHeight + 8 // todo remove this hardcoded margin height
        }).reduce((a, b) => a + b, 0)
  
        let instance = new ToastClass({
          propsData: {
            y: y
          }
        })
  
        instance.$slots.default = [ msg ]
        instance.$root = root
        instance.$mount()
  
        root.$el.appendChild(instance.$el)
        this.toasts.push(instance)
  
        setTimeout(() => {
          this.hide(instance)
        }, 3000)
      },
      hide(toast) {
        let index = 0
        let height = 0
  
        for (let i = 0; i < this.toasts.length; i++) {
          if (this.toasts[i] === toast) {
            index = i
            height = toast.$el.offsetHeight
            root.$el.removeChild(toast.$el)
            this.toasts.splice(i, 1)
            break
          }
        }
  
        for (let i = index; i < this.toasts.length; i++) {
          this.toasts[i].y -= height
        }
      }
    }
  }
}

export default Toast