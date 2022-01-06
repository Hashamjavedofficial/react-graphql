import React,{useState} from 'react';
import {useMutation,gql,useQuery} from '@apollo/client'
import {useParams} from 'react-router-dom'

const query = gql`
    query getSong($id:ID!){
        song(id:$id){
            id
            title
            lyrics {
                id
                likes
            }
        }
    }
`

const mutation = gql`
    mutation AddLyrics($content:String,$songId:ID){
        addLyricToSong(content:$content,songId:$songId){
            id
        }
    }
`

const SongDetails = props=>{
    const [value,setValue] = useState()

    const {id} = useParams()
    const {data, loading,error,refetch} = useQuery(query,{variables:{id}})
    const [addLyricToSong,options] = useMutation(mutation)

    const submitHandler = (e)=>{
        e.preventDefault()
        addLyricToSong({variables:{content:value,songId:id}})
        setValue('')
    }

    return <div>
        <h3>Song Details</h3>
        {loading ? <p>Loading...</p> : <div>
                <h4>Title: {data.song.title}</h4>
            </div>}
        <form onSubmit={submitHandler}>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Add Lyrics" />
        </form>
    </div>
}

export default SongDetails