import { IdleState, PointingState, CreatingState } from './states'
import { TLNuApp, TLNuBoxShape, TLNuShapeProps, TLNuTool } from '~nu-lib'

export abstract class TLNuBoxTool<S extends TLNuBoxShape<any>> extends TLNuTool<S> {
  constructor(app: TLNuApp<S>) {
    super(app)
    this.registerStates(IdleState, PointingState, CreatingState)
    this.transition('idle')
  }

  abstract shapeClass: {
    new (props: TLNuShapeProps & Partial<any>): S
  }

  onEnter = () => this.transition('idle')
}
