/** @jsx h */
import { Node } from 'tiptap'
import { wrappingInputRule } from 'tiptap-commands'
import * as _ from 'lodash'

function hFlatten(obj) {
  const out = _.merge(obj, obj.attrs)
  delete out.attrs
  return out
}

export default class Spoiler extends Node {
  get name () {
    return 'spoiler'
  }

  get schema () {
    return {
      attrs: {
        title: {
          default: 'Спойлер'
        }
      },
      group: 'block',
      content: 'block+',
      selectable: true,
      editable: true,
      draggable: false,
      toDOM: node => {
        const accordionNumber = 'accordion-' + Date.now()
        return (
          <div class="accordion card">
            <input type="checkbox" id={accordionNumber} name="accordion-radio" hidden />
            <label class="accordion-header" for={accordionNumber}>
              <div class="columns">
                <div class="column col-lg-auto">
                  {node.attrs.title}
                </div>
                <div class="column col-1 text-right">
                  <i class="icon icon-arrow-right mr-1"></i>
                </div>
              </div>
            </label>
            <div class="accordion-body">
              <div class="px-2">
                {0}
              </div>
            </div>
          </div>
        )
      },
      parseDOM: [{
        tag: 'div[class="accordion"]'
      }],
    }
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*\|\|\s$/, type),
    ]
  }

  $createElement (name, attrs, children) {
    return [
      name,
      hFlatten(attrs)
    ].concat(children).filter(x => !_.isNil(x))
  }
}
