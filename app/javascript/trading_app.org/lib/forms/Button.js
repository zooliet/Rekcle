import React from 'react';
import { observer } from 'mobx-react';
import {action, observable} from 'mobx';
import _ from 'lodash';

const checkLabel = (text, label) =>
  _.isInteger(_.parseInt(label)) || _.isNil(label) ?
    text :
    `${text} ${label}`

const Button = ({
  type='button',
  className = 'btn btn-primary mr-3',
  disabled = false,
  text,
  label,
  icon,
  content = null,
  onlyIcon = false,
  onClick}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-tip={checkLabel(text, label)}>
      {
        content ||
        <span>
          <i className={`fa fa-${icon}`} />
          {
            !onlyIcon &&
            <b> {checkLabel(text, label)}</b>
          }
        </span>
      }
    </button>
  )

}

export default Button




// // @observer
// class Button extends React.Component {
//   // @observable field = null
//
//   constructor(props) {
//     super(props)
//     // this.field = props.field
//   }
//
//   checkLabel(text, label) {
//     return (
//       _.isInteger(_.parseInt(label)) || _.isNil(label) ?
//         text :
//         `${text} ${label}`
//     )
//   }
//
//   render() {
//     const { type='button', className = 'btn btn-primary mr-3', disabled = false,
//             text, label, icon, content = null, onlyIcon = false, onClick  } = this.props
//     return (
//       <button
//         type={type}
//         className={className}
//         onClick={onClick}
//         disabled={disabled}
//         data-tip={this.checkLabel(text, label)}>
//         {
//           content ||
//           <span>
//             <i className={`fa fa-${icon}`} />
//             {
//               !onlyIcon &&
//               <b> {this.checkLabel(text, label)}</b>
//             }
//           </span>
//         }
//       </button>
//     )
//   }
// }
// export default Button
