import Vue from 'vue'

Vue.directive("validate", function(el, binding) {  
  const errors = []
  let isValid = true

  const items = Object.entries(binding.value)

  for (let i = 0; i < items.length; i++) {
    let prop = items[i][1]

    if (typeof prop !== 'function')
      continue

    if (!prop(binding.value)) {
      isValid = false
      errors.push(items[i][0])
    }
  }
  
  if (binding.oldValue && binding.oldValue.success === isValid)
    return

  Vue.set(binding.value, 'success', isValid)
  Vue.set(binding.value, 'errors', errors)  
})