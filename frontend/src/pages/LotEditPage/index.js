import React from 'react'
import { LotEdit } from './components'
import './index.scss';

const LotEditPage = () => {
    return (
        <section className = "page">
            <div className = "lot-edit-container">
                <LotEdit />
            </div>
        </section>
    )
}

export default LotEditPage;