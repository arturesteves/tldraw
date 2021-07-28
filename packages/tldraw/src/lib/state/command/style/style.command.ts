import { ShapeStyles } from '../../../shape'
import { Data } from '../../../types'
import { TLD } from '../../tld'
import { Command } from '../command'

export function style(data: Data, changes: Partial<ShapeStyles>) {
  const ids = [...TLD.getSelectedIds(data)]

  const shapesToStyle = ids
    .flatMap((id) => TLD.getDocumentBranch(data, id))
    .map((id) => {
      const shape = data.page.shapes[id]
      return {
        id,
        prev: { ...shape.style },
        next: { ...shape.style, ...changes },
      }
    })

  return new Command({
    name: 'style_shapes',
    category: 'canvas',
    do(data) {
      const { shapes } = data.page

      for (const { id, next } of shapesToStyle) {
        const shape = shapes[id]
        TLD.getShapeUtils(shape).mutate(shape, { style: next })
      }

      TLD.updateBindings(data, ids)
      TLD.updateParents(data, ids)
    },
    undo(data) {
      const { shapes } = data.page

      for (const { id, prev } of shapesToStyle) {
        const shape = shapes[id]
        TLD.getShapeUtils(shape).mutate(shape, { style: prev })
      }

      TLD.updateBindings(data, ids)
      TLD.updateParents(data, ids)
    },
  })
}
