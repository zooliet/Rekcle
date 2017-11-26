import React from 'react';
import { observer } from 'mobx-react';
// import {action, observable} from 'mobx';

@observer
class SimpleInput extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { field, type, showLabel = true } = this.props

    return (
      <div className={ field.error ? 'form-group has-danger' : 'form-group'}>
        {
          showLabel && field.label &&
          <label htmlFor={field.id} className='form-control-label'>
            {field.label}
          </label>
        }
        <input {...field.bind({type: type})} className='form-control'  />
        <small className="form-control-feedback">{field.error}</small>
      </div>

    )
  }
}

export default SimpleInput
