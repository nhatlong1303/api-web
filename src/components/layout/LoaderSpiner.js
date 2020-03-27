import React, { Component } from 'react'
import {Spinner} from 'reactstrap'

class CenterLoading extends Component {
    render() {
        return (
            <div style={{ 
                'backgroundColor': 'grey', 
                'position': 'absolute',
                 'width': '100%',
                 'margin':'0 auto',
                  'height': '100%', 
                  'opacity': '50%',
                  'display': 'flex',
                  'alignItems': 'center',
                  'justifyContent': 'center',
              }}>
                <Spinner type="grow" color="warning" style={{ 'width': '5rem', 'height': '5rem', }} />
            </div>
        )
    }
}

export default CenterLoading