/** @jsx h */
import { Node } from 'tiptap'
import { textblockTypeInputRule } from 'tiptap-commands'
import * as _ from 'lodash'

function hFlatten(obj) {
  const out = _.merge(obj, (obj || {}).attrs)
  delete out.attrs
  return out
}

export default class Cut extends Node {
  get name () {
    return 'cut'
  }

  get schema () {
    return {
      content: 'text*',
      group: 'block',
      selectable: true,
      editable: false,
      draggable: true,
      toDOM: () => (
        <cut/>
      ),
      parseDOM: [{
        tag: 'cut'
      }],
    }
  }

  // ------
  inputRules({ type }) {
    return [
      textblockTypeInputRule(/^\s*------\s$/, type),
    ]
  }

  $createElement (name, attrs, children) {
    return [
      name,
      hFlatten(attrs)
    ].concat(children).filter(x => !_.isNil(x))
  }
}
