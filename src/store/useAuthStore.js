import { defineStore } from 'pinia'
import router from '../router'
import { auth, db } from '../firebase'
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { generateId } from '@/utils/ramdomId'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { StatusEnum } from '@/constants/enums/StatusEnum'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: {
      id: '',
      email: ''
    } 
  }),
  actions: {
    auth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          // router.push('/users')
          // this.checkUserStatus(user.uid)
          
        } else {
          this.user = {}
          // router.push('/auth')
        }
      })
    },
    async checkUserStatus (uid) {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()

        if (data.status.id == StatusEnum.IN_ACTIVE) {
          router.push('/user-inactive')
        } else {
          router.push('/')
        }
        if (data.status.id == StatusEnum.IN_ACTIVE) return true
      } else {
        router.push('/user-inactive')
      }
      
      return false
    },
    async login (payload) {
      const { email, password } = payload

      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser

        this.checkUserStatus(user.uid)
      })
      .catch((error) => {
        alert(error.message)
      })
    },
    async register (payload) {
      const { name, email, password } = payload

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push('/')
        })
        .catch((error) => {
          alert(error.message)
          // ..
        })

      const user = auth.currentUser

      const activeStatus = {
        id: 1,
        name: 'Active'
      }

      const normalUser = {
        id: 2,
        name: 'Normal'
      }

      await setDoc(doc(db, "users", user.uid), {
        id: generateId(5),
        uid: this.user.uid,
        name: name,
        email: email,
        status: activeStatus,
        role: normalUser,
        phoneNumber: '',
        createdAt: serverTimestamp()
      })
   },
   async logout () {
    await signOut(auth)
  },
  },
})
