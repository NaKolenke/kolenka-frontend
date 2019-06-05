import Vue from 'vue'

Vue.directive("validate", function(el, binding) {  
  const value = binding.value
  const keys = Object.keys(binding.value)
  const errors = []
  let isValid = true

  for (let i = 0; i < keys.length; i++) {    
    let prop = value[keys[i]]

    if (typeof prop !== 'function')
      continue

    if (!prop(binding.value)) {
      isValid = false
      errors.push(keys[i])
    }
  }
  
  if (binding.oldValue && binding.oldValue.success === isValid)
    return

  Vue.set(binding.value, 'success', isValid)
  Vue.set(binding.value, 'errors', errors)  
})