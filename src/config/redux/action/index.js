import firebase, {database} from '../../firebase';

export const actionUsername =()=>(dispatch)=>{
    setTimeout(()=>{
        return dispatch({
            type: 'CHANGE_USER',
            value: 'Muhammad Padri' 
        })
    }, 2000);
}

//parameter data bernilai objek dari hal register
export const registerUserAPI = (data)=>(dispatch)=>{
    console.log("ini di action dapat data kirimin dari hal register -> ", data);
    
    return new Promise((resolve, reject)=>{
        //seblum proses pengambilan API rubah initialState value isLoading jadi true
        dispatch({type: 'CHANGE_LOADING', value: true})
            // task ini copy dari dokumentasi 
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res=>{
                console.log('suksess', res);
                dispatch({type: 'CHANGE_LOADING', value: false})
                resolve(true)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode,errorMessage)
                dispatch({type: 'CHANGE_LOADING', value: false})
                reject(false)
            })
    })
    
}

export const loginUserAPI = (data)=>(dispatch)=>{
    console.log("ini di action dapat data kirimin dari hal register -> ", data);
    //promise digunakan agar function di halamna page login bisa menggunakn async await
    return new Promise((resolve, reject)=>{
        //seblum proses pengambilan API rubah initialState value isLoading jadi true
        //dispatch ini seperti setState
    dispatch({type: 'CHANGE_LOADING', value: true})
        // task ini copy dari dokumentasi 
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res=>{
            console.log('suksess', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified,
                refreshToken: res.user.refreshToken
                
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUser})
            resolve(dataUser)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode,errorMessage)
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: false})
            reject(false)
          })
    
    })
    
}

export const addDataToAPI = (data) => (dispatch) =>{
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

export const getDataFromAPI = (userId) => (dispatch) =>{
    let urlNotes = database.ref('notes/' + userId);
    return new Promise((resolve)=>{
        urlNotes.on('value', function(snapshot) {
            console.log('get data di action ',snapshot.val());
            
            /**
             * simpan data dulu di reducer redux ->
             * dispatch({type: 'SET_NOTES', value: snapshot.val()})
             * namun jika menggunkan task trsbut data yng keluar brupa object dan kita harus merubah ke Array agar bisa di mapping ->
             * const data = Object.keys(snapshot.val())
             * namun task di atas hanya keys nya saja yang tersimpan data lainnya tidak
             * maka kita harus mapping key trsbut
             * 
             * const data = []
             * Object.keys(snapshot.val()).map(key=>{
             *      --kita push data ke array brdsarkan key nya
             *      data.push({
             *          id: key,
             *          data: snapshot.val()[key]
             *      })
             * })
             */
            const data = [];
            Object.keys(snapshot.val()).map(key=>{
                return(
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                )
                
            });
            dispatch({type: 'SET_NOTES', value: data});
            resolve(snapshot.val())
          });
    })
    
}

export const updateDataAPI = (data) => (dispatch) =>{
    let urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject)=>{
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err)=>{
            if(err){
                reject(false);
            }else{
                resolve(true)
            }
        });
    })
    
}

export const deleteDataAPI = (data) => (dispatch) =>{
    let urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject)=>{
        urlNotes.remove();
    })
    
}