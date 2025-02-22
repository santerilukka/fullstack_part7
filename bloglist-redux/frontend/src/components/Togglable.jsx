import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const buttonStyle = {
    margin: '0px 0 10px 0',
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='primary'
          onClick={toggleVisibility}
          style={buttonStyle}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='secondary'
          onClick={toggleVisibility}
          style={buttonStyle}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
