import React, { useEffect, useState } from 'react'
import { useQuery, gql } from "@apollo/client";
import {Link} from 'react-router-dom'

const query = gql`
  {
    songs {
        title
        id
    }
  }
`
const SongList = (props) => {
  const { data, loading,error,refetch } = useQuery(query)
  const [songs, setSongs] = useState([])
  useEffect(()=>{
    refetch()
  },[])
  return (
    <>
      {loading ? <h1>Loading....</h1> : <ul className="collection">
        {data.songs.map(song => <li key={song.id} className="collection-item">{song.title}</li>)}
      </ul>}
      <Link to={'/create-song'}>
        <button>Create Song</button>
      </Link>
    </>
  )
}



export default SongList