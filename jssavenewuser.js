const vusername = document.getElementById('user-name')
const vpassword = document.getElementById('password')
const vmobile = document.getElementById('mobile-number')
const vemail = document.getElementById('email')
const vsave = document.getElementById('save-user')
const vlogin = document.getElementById('login')

const users = JSON.parse(localStorage.getItem('users')) || []

vsave.addEventListener('click', () =>{
    const username = vusername.value
    const password = vpassword.value
    const mobile = vmobile.value
    const email = vemail.value
    
    if(!username || !password){
        alert('Please fill user and password')
        return
    }

    const exists = users.some(u => u.username === username)
        if(exists){
            alert('user already exists')
            return
        }
        
        users.push({username, password,mobile,email})
        localStorage.setItem('users', JSON.stringify(users))
        vusername.value = ''
        vpassword.value = ''
        vmobile.value = ''
        vemail.value = ''

    
})

vlogin.addEventListener('click', () =>{
    window.location.href = 'savenewuser.html'
})
