import React from 'react'
import {useQuery,gql} from "@apollo/client";

const query = gql`
  {
    songs {
        title
    }
  }
`
const SongList = (props)=>{
    const {data , loading} = useQuery(query)
    console.log(data,loading)
    return (<div>SongList</div>)
}



export default SongList