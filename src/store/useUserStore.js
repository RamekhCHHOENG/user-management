import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { generateId } from '@/utils/ramdomId'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth'
import { 
  doc,
  getDocs,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query, 
  // where
} from "firebase/firestore"


export const useUserStore = defineStore('users', {
  state: () => ({ 
    users: [],
    loading: false,

    table: {
      currentPage: 1,
      pageSize: 10,
      sort: {
        prop: '',
        order: null
      },
      totalElements: 0
    },
    filters: {}
  }),
  actions: {
    async getUserList () {
      // const {
      //     q
      //   } = state

      this.users = []
      this.loading = true

      const queryRef = query(collection(db, "users"))
      const querySnapshot = await getDocs(queryRef)

      querySnapshot.forEach((doc) => {
        this.users.push(doc.data()) 
      })

      console.log(this.users, 'here user to query')
      this.loading = false
    },
    async createUser (payload) {
      const {
        name,
        email,
        password,
        role,
        status,
        phoneNumber
      } = payload

      await createUserWithEmailAndPassword(auth, email, password)

      const uid = auth.currentUser.uid

      await setDoc(doc(db, "users", uid), {
        uid: uid,
        id: generateId(5),
        name: name,
        email: email,
        role: role,
        status: status,
        phoneNumber: phoneNumber || '',
        createdAt: serverTimestamp()
      })
    },
    async editUser (payload) {
      const {
        uid,
        name,
        email,
        role,
        status,
        phoneNumber
      } = payload

      const userRef = doc(db, "users", uid);

      await updateDoc(userRef, {
        name: name,
        email: email,
        role: role,
        status: status,
        phoneNumber: phoneNumber
      })
    },
    async deleteUser (payload) {
      const { uid } = payload
      await deleteDoc(doc(db, "users", uid));
    },
    async resetPassword (payload) {
      const { email } = payload

      await sendPasswordResetEmail(auth, email)
    },
    async changePassword (payload) {
      const { newPassword } = payload
      const user = auth.currentUser;

      await updatePassword(user, newPassword)
        .then(() => {
          // Success change password
        }).catch((error) => {
          alert(error.message)
        });
    },
  },
})
