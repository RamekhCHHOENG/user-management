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
    user: {}
  }),
  actions: {
    auth () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.getUserData(user.uid)
          router.push('/users')
        } else {
          this.user = {}
          router.push('/auth')
        }
      })
    },
    async getUserData (uid) {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      const user = docSnap.data()

      this.user.id = user.id
      this.user.email = user.email
      this.user.name = user.name
      this.user.role = user.role
    },
    async checkUserStatus (uid) {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()

        if (data.status.id == StatusEnum.IN_ACTIVE) {
          router.push('/user-inactive')
          this.user = {}
        } else {
          router.push('/')
        }
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
          throw(error)
        })
    },
    async register (payload) {
      const { email, password } = payload

      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          await this.storeUser(payload)                                     
        })
        .catch((error) => {
          throw(error)
        })
   },
   async storeUser (payload) {
    const { name, email } = payload
    const uid = auth.currentUser.uid
    const activeStatus = {
      id: 1,
      name: 'Active'
    }
    const normalUser = {
      id: 2,
      name: 'Normal'
    }

    await setDoc(doc(db, "users", uid), {
      id: generateId(5),
      uid: uid,
      name: name,
      email: email,
      status: activeStatus,
      role: normalUser,
      phoneNumber: '',
      createdAt: serverTimestamp()
    })
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      throw(error)
    })  
   },
   async logout () {
    await signOut(auth)
  },
  },
})
