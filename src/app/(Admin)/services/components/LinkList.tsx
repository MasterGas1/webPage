import React, { useContext } from 'react'

import {Context as ServicesContext} from '@/context/serviceContext'

const LinkList = () => {

    const { state: { servicesLink}, getOneServiceLink } = useContext(ServicesContext)

  return (
    <div>
        {
            servicesLink.map(({id, name}) => (
                    <a
                        key={id}
                        target="_blank"
                        rel="noreferrer"
                        className='text-principal-color font-semibold text-lg cursor-pointer hover:underline'
                        onClick={() => {
                            getOneServiceLink(id as string)
                        }}
                    >
                        {name}/
                    </a>
            ))
        }
    </div>
  )
}

export default LinkList