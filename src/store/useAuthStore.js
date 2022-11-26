import { defineStore } from 'pinia'
import { auth } from '../firebase'
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
    increment() {
      this.count++
    },
    async login (payload) {
      const { email, password } = payload

      await signInWithEmailAndPassword(auth, email, password)
      this.user = auth.currentUser
    },
    async register (payload) {
      const { email, password } = payload

      await createUserWithEmailAndPassword(auth, email, password)
      this.user = auth.currentUser
   },
   async logout () {
    await signOut(auth)
  },
  },
})
