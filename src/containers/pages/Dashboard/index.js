import React, {Component, Fragment} from 'react';
import "./Dashboard.scss";
import { connect } from 'react-redux';
import {addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI} from '../../../config/redux/action'

class Dashboard extends Component{

    state={
        title: '',
        content: '',
        date: '',
        textButton:'SIMPAN',
        noteId: ''
    }

    // testing apakah get data yg dibuat di action berjalan atau tidak
   componentDidMount(){
    /**
     * namun pemanggilan data trsbt membutukan userId
     * kerna kita suda menyimpa data di localStorage maka kita bisa panggil userId trsbt
     */
    const userData = JSON.parse(localStorage.getItem('userData'))
     this.props.getNotes(userData.uid);
   }

   // testing apakah localStorage berjalan atau tidak
    // componentDidMount(){
    //     /**
    //      * const localData = localStorage.getItem('userData') ->
    //      * cara memanggil data yg da di localStorge yg telah di set
    //      * console.log('dashboard -> mngambil data ', localData)
    //      * namun bentuk data yg disimpan berupa string
    //      * merubah data string di localStorage menjadi Object Json ->
    //      * console.log('dashboard -> mngambil data ', JSON.parse(localData))
    //      * 
    //      */
    //    const localData = localStorage.getItem('userData')  
    //    console.log('dashboard -> mngambil data ', JSON.parse(localData))
    // }

    handleSaveNotes = () =>{
        const {title, content,textButton} = this.state;
        /**
         * dari reducer
         * awalnya userId: this.props.userData
         * stelah mengambil data dari localStorage
         * userId: userData.uid
         */
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data ={
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SIMPAN'){
            // console.log(data);
            this.props.saveNotes(data);
        }else{
            data.noteId = this.state.noteId
            this.props.updateDataAPI(data);
        }
        
    }

    onInputChange=(e, type)=>{
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes =(note)=>{
        console.log(note); // cek data yg di dapat ketika di klik

        //jika sudah dapat data yg di klik rubah state di atas dengan data hasil klik
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE', // merubah text buttun menjadi update
            noteId: note.id // id di dapat dari klik 
        })
    }

    cancelUpdate=()=>{
        this.setState({
            title: "",
            content: "",
            textButton: 'SIMPAN' 
        })
    }

    deleteNote=(e, note)=>{
       e.stopPropagation() // karena button delete berada dilam looping, fungsi ini agar ketika di klik card nya tidak ikut ke klik jdi yg di klik hanya elemen child nya saja
    //    alert('delete')
    const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        this.props.deleteDataAPI(data) //data -> dari variabel object di atas
    }

    render(){
        
        let {title,content,textButton} = this.state;
        
        console.log('cek data state dari reducer di dashboard', this.props.notes)

        const {updateNotes,cancelUpdate,deleteNote} = this; // agar penulisan di onClick hanya {updateNotes} 

        return(
            <div className="container">
                <div className="input-form">
                    <input type="text" placeholder="title" className="input-title" value={title} onChange={(e)=>this.onInputChange(e, 'title')} />
                    <textarea name="content" cols="30" rows="10" className="input-content" value={content}  onChange={(e)=>this.onInputChange(e, 'content')}>

                    </textarea>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE' ? (
                                
                                <button className="save-btn cancel" onClick={cancelUpdate} >Cancel</button>
                            ) : (
                                <div/>
                            )
                        }
                        <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr/>
                {
                    this.props.notes.length > 0 ? (
                        // fragment agar bisa memsukan javascript di dlmannya
                        <Fragment>
                            {
                                this.props.notes.map(note =>{
                                    return(
                                        <div className="card-content" key={note.id} onClick={()=> updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e)=>deleteNote(e, note)} >X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                        
                    ) : (
                        null
                    )
                }
                
            </div>
        )
    }
}

// ini tempat data-data dari state reducer
const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

//ini tmpat action-action yang ingin digunkan 
const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getNotes : (data) => dispatch(getDataFromAPI(data)),
    updateDataAPI: (data) => dispatch(updateDataAPI(data)),
    deleteDataAPI: (data) => dispatch(deleteDataAPI(data))
})
export default connect(reduxState, reduxDispatch)(Dashboard);