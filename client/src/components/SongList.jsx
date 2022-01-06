import React, { useEffect, useState } from 'react'
import { useQuery, gql,useMutation } from "@apollo/client";
import {Link} from 'react-router-dom'

const query = gql`
  {
    songs {
        title
        id
    }
  }
`

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong(id:$id){
            id
            title
        }
    }
`
const SongList = (props) => {
  const { data, loading,error,refetch } = useQuery(query)
  const [deleteSong, options] = useMutation(mutation)
  const [songs, setSongs] = useState([])
  useEffect(()=>{
    refetch()
  },[])
  const deleteSongHandler = (id)=>{
      deleteSong({variables:{id}}).then(res=>{
        refetch()
      })
  }
  return (
    <>
      {loading ? <h1>Loading....</h1> : <ul className="collection">
        {data.songs.map(song => <li key={song.id} style={{display: 'flex',justifyContent: 'space-between'}} className="collection-item">{song.title} <button onClick={()=>deleteSongHandler(song.id)}>Delete</button></li>)}
      </ul>}
      <Link to={'/create-song'}>
        <button>Create Song</button>
      </Link>
    </>
  )
}





export default SongList