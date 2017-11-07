import React from 'react';
import { observer } from 'mobx-react';
// import {action, observable} from 'mobx';

@observer
class SimpleCheckbox extends React.Component {
  // @observable field = null

  constructor(props) {
    super(props)
    // this.field = props.field
  }

  render() {
    const { field, label, style } = this.props

    return (
      <div className={ field.error ? 'form-check has-danger' : 'form-check'} style={style}>
        <label htmlFor={field.id} className='form-check-label'>
          <input
            {...field.bind({type: 'checkbox'})}
            className='form-check-input'
            checked={field.value }/> {label ? label : field.label}
        </label>
        <small className="form-control-feedback d-flex">{field.error}</small>
      </div>

    )
  }
}

export default SimpleCheckbox
