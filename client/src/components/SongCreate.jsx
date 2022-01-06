import React,{useState} from 'react'
import {gql,useMutation} from "@apollo/client";
import {Link,useHistory} from 'react-router-dom'

const SongCreate = props => {
    const history = useHistory()
    const [title,setTitle] = useState('')
    const [addSong,{loading,data,error}] = useMutation(mutation)

    const titleHandler = (e)=>{
        setTitle(e.target.value)
    }
    const submitHandler = e =>{
        addSong({variables:{title:title}}).then(res=>{
            history.push('/')
        })
        e.preventDefault()
    }
    return (
        <div>
            <Link to={'/'}>
            <button>Go Back</button></Link>
            <h3>Create a Song</h3>
            {loading && <h2>Loading...</h2>}
            <form onSubmit={submitHandler}>
                <label>Song title :</label>
                <input type="text" onChange={titleHandler} value={title}/>
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title:$title){
            id
            title
        }
    }
`

export default SongCreate
