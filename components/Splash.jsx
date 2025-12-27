import React from 'react'
import css from "../app/app.module.sass";
import PandaLoader from './PandaLoader';

const Splash = () => {
    return (
        <div className={css.splash}>
            <PandaLoader message="Entering the forest..." />
        </div>
    )
}

export default Splash