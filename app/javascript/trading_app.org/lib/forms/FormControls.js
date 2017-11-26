import React from 'react';
import { observer } from 'mobx-react';
import {action, observable} from 'mobx';

import Button from './Button'

@observer
class FormControls extends React.Component {
  @observable form = null

  constructor(props) {
    super(props)
    this.form = props.form
  }

  render() {
    const { controls = null, className = 'btn btn-primary mr-3' } = this.props
    return (
      <div>
        {
          (!controls || controls.onSubmit) &&
          <Button
            type='submit'
            className={className}
            onClick={this.form.onSubmit}
            disabled={this.form.submitting}
            content={(this.form.submitting || this.form.validating)
              ? <b><i className="fa fa-spinner fa-spin" /></b>
              : <b><i className="fa fa-dot-circle-o" /> Submit</b>}
          />
        }

        {
          (!controls || controls.onClear) &&
          <Button
            className={className}
            onClick={this.form.onClear}
            text='Clear'
            icon='eraser'
          />
        }

        {
          (!controls || controls.onReset) &&
          <Button
            className={className}
            onClick={this.form.onReset}
            text='Reset'
            icon='refresh'
          />
        }

        {
          (!controls || controls.onCancel) &&
          <Button
            className={className}
            onClick={this.form.onCancel}
            text='Cancel'
            icon='refresh'
          />
        }
      </div>
    )
  }
}
export default FormControls
