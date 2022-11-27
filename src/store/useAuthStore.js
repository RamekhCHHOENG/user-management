import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { generateId } from '@/utils/ramdomId'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'


export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  getters: {
    double: state => state.user,
  },
  actions: {
    async login (payload) {
      const { email, password } = payload

      await signInWithEmailAndPassword(auth, email, password)
      this.user = auth.currentUser
    },
    async register (payload) {
      const { name, email, password } = payload

      await createUserWithEmailAndPassword(auth, email, password)

      this.user = auth.currentUser

      const activeStatus = {
        id: 1,
        name: 'Active'
      }

      const normalUser = {
        id: 2,
        name: 'Normal'
      }

      await setDoc(doc(db, "users", this.user.uid), {
        id: generateId(5),
        name: name,
        email: email,
        status: activeStatus,
        role: normalUser,
        createdAt: serverTimestamp()
      });

   },
   async logout () {
    await signOut(auth)
  },
  },
})
