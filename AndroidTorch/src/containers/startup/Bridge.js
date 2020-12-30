import React from 'react'
import {I18nextProvider} from 'react-i18next'
import i18n from '../../config/I18n'
import TorchComponent from '../torch/TorchComponent'



const Bridge = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <TorchComponent/>
        </I18nextProvider>
        
    )
}

export default Bridge