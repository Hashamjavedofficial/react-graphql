import React,{useEffect, useState} from 'react'
import {useQuery,gql} from "@apollo/client";

const query = gql`
  {
    songs {
        title
        id
    }
  }
`
const SongList = (props)=>{
    const {data , loading} = useQuery(query)
    const [songs,setSongs] = useState([])
    return (
      <>
      {loading ? <h1>Loading....</h1> : <ul className="collection">
      {  data.songs.map(song=><li key={song.id} className="collection-item">{song.title}</li>)}
    </ul>}
      </>
    )
}



export default SongList