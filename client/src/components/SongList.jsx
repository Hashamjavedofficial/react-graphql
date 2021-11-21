import React from 'react'
import gql from "graphql-tag";

const SongList = (props)=>{
    return (<div>SongList</div>)
}

const query = gql`
  {
    songs {
        title
    }
  }
`

export default SongList